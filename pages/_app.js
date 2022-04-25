import Head from "next/head";

import "../styles/globals.css";

const app = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <link rel="manifest" href="/manifest.json" />

        <title>Password Generator</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default app;
