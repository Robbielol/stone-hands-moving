
export const metadata = {
    title: 'Stonehands Moving Company | Best Movers In Vancouver',
    description: 'Hire the best moving company in British Coloumbia for stress-free home or residential moves. Specializing in Piano moving.',
}


export default function RootLayout({ children }) {
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Stonehands Moving",
        "url": "https://stonehandsmoving.com",
        "description": "Expert moving company and piano movers",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://stonehandsmoving.com/search?q={moving company}",
          "query-input": "required name=moving company"
        }
    };
    
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Stonehands Moving",
        "url": "https://stonehandsmoving.com",
        "logo": "https://stonehandsmoving.com/stoneHandsMovingLogo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+16048284860",
          "contactType": "customer service"
        }
    };

    return (
        <html lang="en">
        <head>
            <script type="application/ld+json">
            {JSON.stringify([websiteSchema, organizationSchema])}
            </script>
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