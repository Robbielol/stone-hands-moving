require('dotenv').config({ path: '../.env' });
const express = require('express');
const nodemailer = require('nodemailer');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;
const apiKey = process.env.SHM_APP_GOOGLE_API_KEY; 

const fs = require('fs');
const util = require('util');

const logFile = fs.createWriteStream('server.log', { flags: 'a' });
const logStdout = process.stdout;

console.log = function (...args) {
  logFile.write(util.format(...args) + '\n');
  logStdout.write(util.format(...args) + '\n');
};

app.use(cors(({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (origin.includes("stonehandsmoving.com")) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
})));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Proxy route to forward requests to Google Places API
app.get('/api/reviews', async (req, res) => {
  console.log("Fetching reviews...");
  const placeId = process.env.SHM_APP_GOOGLE_PLACE_ID;
  try {
    const response = await axios.get(
      process.env.SHM_APP_GOOGLE_API_REP,
      {
        params: {
          place_id: placeId,
          fields: 'reviews',
          key: apiKey,
        },
      }
    );
    res.json(response.data); // Send data back to frontend
  } catch (error) {
    console.log("Review data retrieval failed...");
    console.error('Error fetching Google reviews:', error);
    res.status(500).send('Error fetching reviews');
  }
});

// Route for sending email
app.post('/api/send-email', async (req, res) => {
  console.log("Posting email...");
  if (req.body !== null){
    console.log("Email execution failed (Empty)...");
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    return;
  }
  const { fullName, email, date, origin, destination, workloadDescription } = req.body;
  try {
    // Your Nodemailer logic here
    let transporter = nodemailer.createTransport({
      host: 'smtp.privateemail.com', // Replace with your SMTP host
      port: 587, // Use 465 for SSL or 587 for TLS/STARTTLS
      secure: false, // Use true for 465, false for other ports
      auth: {
        user: 'info@stonehandsmoving.com', // Your email address
        pass: process.env.SHM_APP_SMTP_PASS, // Your email password
      }
    });
    console.log("Generating email...");
    let mailOptions = {
      from: email,
      to: 'info@stonehandsmoving.com',
      subject: `New moving request from ${fullName} on ${date}`,
      html: `<p><strong>${fullName}</strong> wants to employ you for a moving job on this date <strong>${date}</strong>.</p>
      <p>The location of origin is:<strong> ${origin}</strong></p>
      <p>The destination location is:<strong> ${destination}</strong></p>'
      <p>This is a description of what they would like to transport:</p>
      <p><strong>${workloadDescription}.</strong></p> <br/><br/>
      <p>If this job interests you please reply to this email: <strong>${email}</strong>/p>`
    };
    
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);  // This will log the error details to your server console
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});