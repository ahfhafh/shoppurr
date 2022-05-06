import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import firebaseApp from '../firebase/app';
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { shimmer, toBase64 } from '../utils/imageLoad';
import Loader from '../public/images/loader.svg';
import LeftArrow from '../public/images/left-arrow.svg';
import RightArrow from '../public/images/right-arrow.svg';
import CircleIndicator from '../public/images/circle.svg';

export default function Home() {

  const db = getFirestore(firebaseApp);

  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [carouselNum, setCarouselNum] = useState(3);
  const [carouselInterval, setCarouselInterval] = useState();

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

    // eslint-disable-next-line max-statements-per-line
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCarouselInterval(setInterval(() => { setCarouselNum(carouselNum += 1); }, 5000));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (carouselNum % 3 == 0) {

    } else if (carouselNum % 3 == 1) {

    } else if (carouselNum % 3 == 2) {

    }

    if (carouselNum === 0 || carouselNum === 1 || carouselNum === 2) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (carouselInterval === undefined) setCarouselInterval(setInterval(() => { setCarouselNum(carouselNum += 1); }, 5000));
    }
    console.log(carouselNum);
  }, [carouselNum, carouselInterval]);

  function scrollTo1() {
    clearInterval(carouselInterval);
    setCarouselInterval(undefined);
    setCarouselNum(0);
  }

  function scrollTo2() {
    clearInterval(carouselInterval);
    setCarouselInterval(undefined);
    setCarouselNum(1);
  }

  function scrollTo0() {
    clearInterval(carouselInterval);
    setCarouselInterval(undefined);
    setCarouselNum(2);
  }

  const popularItems = useRef(null);
  const carousel = useRef(null);
  function scrollRight(ref) { ref.current.scrollBy(500, 0); }
  function scrollLeft(ref) { ref.current.scrollBy(-500, 0); }

  return (
    <div>
      <Head>
        <title>ShopPurr</title>
        <meta name="description" content="Shop cat stuff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=''>

        <div className='relative'>
          <div className='relative h-72 md:h-96 w-full' ref={carousel}>
            <div className={`absolute w-full h-full ${carouselNum % 3 == 0 ? 'right-0' : 'right-[-100vw]'}`}>
              <Image
                src='https://firebasestorage.googleapis.com/v0/b/shop-purr.appspot.com/o/main-cat-toys-1.jpg?alt=media&token=ecb7123d-6f0a-46c1-ae4b-17756fc82213'
                alt="Cat Foods"
                layout='fill'
                objectFit='cover'
                objectPosition='0 30%'
                quality={100}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
              />
            </div>
            <div className={`absolute w-full h-full ${carouselNum % 3 == 1 ? 'right-0' : 'right-[-100vw]'}`}>
              <Image
                src='https://firebasestorage.googleapis.com/v0/b/shop-purr.appspot.com/o/main-cat-toys-2.jpg?alt=media&token=0d6a52de-06a3-41a2-8f27-28fc73094804'
                alt="Cat Foods"
                layout='fill'
                objectFit='cover'
                objectPosition='0 60%'
                quality={100}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
              />
            </div>
            <div className={`absolute w-full h-full ${carouselNum % 3 == 2 ? 'right-0' : 'right-[-100vw]'}`}>
              <Image
                src='https://firebasestorage.googleapis.com/v0/b/shop-purr.appspot.com/o/main-cat-toys-3.jpg?alt=media&token=5ceba167-bc8b-4e42-a61b-9c3d61ebb9d4'
                alt="Cat Foods"
                layout='fill'
                objectFit='cover'
                objectPosition='0 15%'
                quality={100}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
              />
            </div>
          </div>
          <div className='absolute bottom-4 mx-auto left-0 right-0 w-min flex'>
            <button className='' onClick={() => scrollTo1()}><CircleIndicator className={(carouselNum % 3 === 0) ? "fill-black" : "fill-transparent"} /> </button>
            <button className='' onClick={() => scrollTo2()}><CircleIndicator className={(carouselNum % 3 === 1) ? "fill-black" : "fill-transparent"} /></button>
            <button className='' onClick={() => scrollTo0()}><CircleIndicator className={(carouselNum % 3 === 2) ? "fill-black" : "fill-transparent"} /></button>
          </div>
        </div>

        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <Loader className='absolute top-1/2 left-1/2 -translate-x-1/2' />}
        {products && (
          <>
            <div className='px-10 mt-8'>
              {/* TODO: get items most rated */}
              <h1 className='text-4xl'>Popular:</h1>
              <div className='relative mt-8 mb-16 mx-auto max-w-7xl flex items-center border'>
                <LeftArrow className='absolute left-4 z-10' onClick={() => scrollLeft(popularItems)} role='button' />
                <RightArrow className='absolute right-4 z-10' onClick={() => scrollRight(popularItems)} role='button' />
                <div className=' pb-8 flex gap-8 overflow-x-scroll snap-x' ref={popularItems}>
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
            </div>
          </>
        )}

        <div className='grid grid-rows-2 grid-cols-3 grid-flow-col md:w-3/4 mx-auto'>
          <div className='relative block row-span-2 col-span-2'>
            <p className='absolute top-2 left-10 z-10'>o yea</p>
            <Image
              src='https://firebasestorage.googleapis.com/v0/b/shop-purr.appspot.com/o/sub-head-2.png?alt=media&token=1b8aa3a3-f1d9-4e68-8e6a-44fac39c4119'
              alt='cat dressing'
              layout='fill'
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            />
          </div>
          <div className='relative block'>
            <Image
              src='https://firebasestorage.googleapis.com/v0/b/shop-purr.appspot.com/o/sub-head-1.jpg?alt=media&token=3b9397dc-e813-4de8-9129-20baebc5005d'
              alt='cat toying'
              height='550px'
              width='550px'
              objectFit='cover'
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            />
          </div>
          <div className='relative block'>
            <Image
              src='https://firebasestorage.googleapis.com/v0/b/shop-purr.appspot.com/o/sub-head-3.jpg?alt=media&token=97363b4b-6566-4905-a390-719e65859b66'
              alt='cat hoodie'
              layout='fill'
              objectFit='cover'
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            />
          </div>
        </div>

        <video className='my-16' autoPlay loop muted playsInline poster='https://firebasestorage.googleapis.com/v0/b/shop-purr.appspot.com/o/vid1_poster.png?alt=media&token=143b8e45-9adc-43d2-9c9b-dc1745630242'>
          <source src='https://firebasestorage.googleapis.com/v0/b/shop-purr.appspot.com/o/Cats_1.mp4?alt=media&token=7daa1613-2561-4b73-bfc6-5568a5b49860' type='video/mp4' />
        </video>

        <div className='flex justify-around overflow-x-scroll'>
          <div className='text-center h-52 w-52 border border-black'>INSTAGRAM</div>
          <div className='text-center h-52 w-52 border border-black'>INSTAGRAM</div>
          <div className='text-center h-52 w-52 border border-black'>INSTAGRAM</div>
          <div className='text-center h-52 w-52 border border-black'>INSTAGRAM</div>
          <div className='text-center h-52 w-52 border border-black'>INSTAGRAM</div>
        </div>
      </main>
    </div>
  );
}
