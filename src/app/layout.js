
export const metadata = {
    title: 'Stonehands Moving | Best Movers In Vancouver',
    description: 'Hire the best moving company in Vancouver for stress-free moves. We offer top-rated residential and commercial moving services.',
}


export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <meta name='keywords' content='best moving company, Vancouver, North Vancouver, Burnaby, Surrey, Richmond, 
            Coquitlam, West Vancouver'/>
            <meta property="og:title" content="Best Professional Moving Services in Vancouver | Free Quotes" />
            <meta property="og:image" content="https://stonehandsmoving.com/Pictures/stoneHandsMovingLogo.png" />
            <meta property="og:url" content="https://stonehandsmoving.com" />
            <meta property="og:type" content="stonehands-moving" />
        </head>
        <body>
            <div id="root">{children}</div>
        </body>
        </html>
    );
  }