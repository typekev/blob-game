export const title = "Blob Game by Typekev";
const url = "https://typekev.com/";
const author = "Kevin Gonzalez";
const twitter = "@typekev";

export default function Head() {
  return (
    <>
      {/* Recommended Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="language" content="english" />
      <meta httpEquiv="content-type" content="text/html" />
      <meta name="author" content={author} />
      <meta name="designer" content={author} />
      <meta name="publisher" content={author} />

      {/* Search Engine Optimization Meta Tags */}
      <title>{title}</title>
      <meta name="robots" content="index,follow" />
      <meta name="distribution" content="web" />
      {/* 
      Facebook Open Graph meta tags
        documentation: https://developers.facebook.com/docs/sharing/opengraph */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="site" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={"/icons/share.png"} />
      <meta property="og:site_name" content={title} />

      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-touch-fullscreen" content="yes" />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src="https://unpkg.com/ios-pwa-splash@1.0.0/cdn.min.js" />
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <script>iosPWASplash('/apple-touch-icon.png', '#FFFFFF');</script>
      <link rel="manifest" href="/site.webmanifest" />

      {/* Meta Tags for HTML pages on Mobile */}
      {/* <meta name="format-detection" content="telephone=yes"/>
        <meta name="HandheldFriendly" content="true"/>  */}
      <meta
        name="viewport"
        content="width=device-width, minimum-scale=1, initial-scale=1.0"
      />
      <meta name="theme-color" content="#FFFFFF" />
      <link rel="shortcut icon" href="/apple-touch-icon.png" />

      {/* 
      Twitter Summary card
        documentation: https://dev.twitter.com/cards/getting-started
        Be sure validate your Twitter card markup on the documentation site. */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={twitter} />
    </>
  );
}
