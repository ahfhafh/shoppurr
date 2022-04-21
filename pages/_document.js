import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=optional" rel="stylesheet"></link>
        </Head>
        <body className='bg-background'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument