import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/images/firstLogo.png" />
      </Head>
      <body className="bg-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}