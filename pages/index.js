import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>ShopPurr</title>
        <meta name="description" content="Shop cat stuff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='bg-background'>
        <Navbar />
      </main>

      <footer className='absolute text-center bottom-0 w-full'>
          Powered by{' '}Nothing
      </footer>
    </div>
  )
}
