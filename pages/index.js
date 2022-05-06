import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import firebaseApp from '../firebase/app';
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { shimmer, toBase64 } from '../utils/imageLoad';
import Loader from '../public/images/loader.svg';

export default function Home() {

  const db = getFirestore(firebaseApp);

  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      await getDocs(collection(db, 'Foods')).then((snapshot) => {
        setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }).catch((err) => {
        setError(err);
        console.log(err);
      });
      setLoading(false);
    }
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Head>
        <title>ShopPurr</title>
        <meta name="description" content="Shop cat stuff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=''>
        {/* TODO: Carousel with button */}
        <div className='h-72 md:h-96 relative bg-center'>
          <Image
            src='https://firebasestorage.googleapis.com/v0/b/shop-purr.appspot.com/o/main-cat-toys-1.jpg?alt=media&token=ecb7123d-6f0a-46c1-ae4b-17756fc82213'
            alt="Cat Foods"
            layout='fill'
            objectFit='cover'
            quality={100}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          />
        </div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <Loader className='absolute top-1/2 left-1/2 -translate-x-1/2' />}
        {products && (
          <>
            <div className='px-10 mt-8'>
              {/* TODO: get items most rated */}
              <h1 className='text-4xl'>Popular:</h1>
              <div className='mt-8 mb-16 mx-auto max-w-7xl flex gap-8 overflow-x-scroll snap-x'>
                {products.map((product) => (
                  <Link href={`food/${product.id}`} key={product.id}><a className='scroll-ml-4 snap-start relative min-w-[150px] flex-none basis-[20%]'>
                    <Image
                      src={product.Image}
                      alt="Food 1"
                      height="256px"
                      width="256px"
                      quality={50}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                    />
                    <div className='absolute top-2 left-2 bg-white border border-black p-1'>${product.Price}</div>
                  </a></Link>
                ))}
              </div>
            </div>
          </>
        )}
        <video className='my-16' autoPlay loop muted playsInline poster='https://firebasestorage.googleapis.com/v0/b/shop-purr.appspot.com/o/vid1_poster.png?alt=media&token=143b8e45-9adc-43d2-9c9b-dc1745630242'>
          <source src='https://firebasestorage.googleapis.com/v0/b/shop-purr.appspot.com/o/Cats_1.mp4?alt=media&token=7daa1613-2561-4b73-bfc6-5568a5b49860' type='video/mp4' />
        </video>
      </main>
    </div>
  );
}
