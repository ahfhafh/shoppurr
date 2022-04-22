import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>ShopPurr</title>
        <meta name="description" content="Shop cat stuff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        
      </main>

      <footer className='absolute text-center bottom-0 w-full'>
          Powered by{' '}Nothing
      </footer>
    </div>
  )
}
