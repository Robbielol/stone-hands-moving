
export const metadata = {
    title: 'Stonehands Moving Company | Best Movers In Vancouver',
    description: 'Hire the best moving company in British Coloumbia for stress-free home or residential moves. Specializing in Piano moving.',
}


export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <meta name='keywords' content='best moving company, Pianos, Vancouver, North Vancouver, Burnaby, Surrey, Richmond, 
            Coquitlam, West Vancouver'/>
            <meta property="og:title" content="Best Professional Moving Services in Vancouver | Free Quotes" />
            <meta property="og:image" content="https://stonehandsmoving.com/Pictures/stoneHandsMovingLogo.ico" />
            <meta property="og:url" content="https://stonehandsmoving.com" />
            <meta property="og:type" content="Moving Company" />
        </head>
        <body>
            <div id="root">{children}</div>
        </body>
        </html>
    );
  }