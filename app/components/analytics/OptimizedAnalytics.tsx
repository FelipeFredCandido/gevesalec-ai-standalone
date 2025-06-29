'use client'

import { useEffect } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
    fbq: (...args: any[]) => void
  }
}

export default function OptimizedAnalytics() {
  useEffect(() => {
    // Initialize dataLayer for GTM
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', 'G-XXXXXXXXXX', {
      page_title: document.title,
      page_location: window.location.href,
    })
  }, [])

  // Only load analytics in production
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      {/* Google Analytics - Load with strategy="afterInteractive" for better performance */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      
      {/* Facebook Pixel - Load after page is interactive */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1234567890');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* NoScript fallback for Facebook Pixel */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1234567890&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  )
}