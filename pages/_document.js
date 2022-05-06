import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet" />
          <link rel="shortcut icon" href="/images/cat_butt.ico" type="image/x-icon" />
          <link rel="icon" href="/images/cat_butt.ico" type="image/x-icon" />
        </Head>
        <body className='bg-background'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;