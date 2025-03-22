require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const next = require('next');
const fs = require('fs');
const path = require('path');
const util = require('util');

const dev = process.env.NODE_ENV !== 'production';
const port = 4001;
const apiKey = process.env.SHM_APP_GOOGLE_API_KEY;

const app = next({ dev, dir: path.join(__dirname, "./src") });
const server = express();
const handle = app.getRequestHandler();

// Logging
const filePath = path.join(__dirname, 'reviews.json');
const logFile = fs.createWriteStream('server.log', { flags: 'a' });
const logStdout = process.stdout;
console.log = function (...args) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${util.format(...args)}`;
  logFile.write(logMessage + '\n');
  logStdout.write(logMessage + '\n');
};


server.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.includes("stonehandsmoving.com")) {
      return callback(null, true);
    }
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  }
}));

server.use(express.json()); 

// Endpoints
server.get('/api/read-reviews', async (req, res) => {
  console.log("Reading reviews file...");
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    if (fileContent.trim() === '') {
      return res.status(204).send('File has no data');
    }

    const reviews = JSON.parse(fileContent);
    const dateOnFile = new Date(reviews.Date);
    const expiredDate = new Date(dateOnFile.getTime() + (7 * 24 * 60 * 60 * 1000));

    if (expiredDate <= Date.now()) {
      return res.status(204).send('Data needs updating');
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error reading reviews: ${error}`);
  }
});

server.get('/api/reviews', async (req, res) => {
  console.log("Fetching reviews...");
  const placeId = process.env.SHM_APP_GOOGLE_PLACE_ID;
  try {
    const response = await axios.get(process.env.SHM_APP_GOOGLE_API_REP, {
      params: {
        place_id: placeId,
        fields: 'reviews,rating,user_ratings_total',
        key: apiKey,
      },
    });
    res.json(response.data); 
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    res.status(500).send('Error fetching reviews');
  }
});

server.post('/api/write-reviews', async (req, res) => {
  console.log("Writing reviews to file...");
  const reviews = req.body;
  if (!reviews) {
    return res.status(400).send("Data sent is incorrect.");
  }
  try {
    reviews.Date = Date.now();
    fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2));
    res.status(200).send("Reviews updated on file successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error writing reviews: ${error}`);
  }
});

server.post('/api/send-email', async (req, res) => {
  console.log("Posting email...");
  if (Object.keys(req.body).length === 0) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    return;
  }
  const { fullName, number, email, date, origin, destination, workloadDescription } = req.body;
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SHM_APP_SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SHM_APP_SMTP_USER,
        pass: process.env.SHM_APP_SMTP_PASS,
      },
      dkim: {
        domainName: 'stonehandsmoving.com',
        keySelector: 'default',
        privateKey: process.env.SHM_APP_SMTP_PRIVATE_KEY,
      },
    });
    let mailOptions = {
      from: process.env.SHM_APP_SMTP_USER,
      to: process.env.SHM_APP_SMTP_USER,
      replyTo: email,
      subject: `New moving request from ${fullName} on ${date}`,
      html: `<p><strong>${fullName}</strong> wants to employ you for a moving job on the <strong>${date}</strong></p>.
            <p>Origin: ${origin}</p>
            <p>Destination: ${destination}</p>
            <p>Description: ${workloadDescription}</p>
            <p> Phone No: ${number}</p>
            <p>By clicking reply to this email, the customer email will automatically populate the "To" field.</p>`,            
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Next.js handling
server.get("*", (req, res) => {
  return handle(req, res);
});

app.prepare().then(() => {
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${port}`);
  });
});