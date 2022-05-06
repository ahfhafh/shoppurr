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

  /* Initial state of the carouselNum variable is 3 to account 0, 1, 2 for manual switching. */
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCarouselInterval(setInterval(() => { setCarouselNum(carouselNum += 1); }, 5000));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    /* Checking if the carouselNum is 0, 1, or 2. Is async so that it won't set multiple intervals */
    if (carouselNum === 0 || carouselNum === 1 || carouselNum === 2) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (carouselInterval === undefined) setCarouselInterval(setInterval(() => { setCarouselNum(carouselNum += 1); }, 5000));
    }
  }, [carouselNum, carouselInterval]);

  function scrollTo(n) {
    clearInterval(carouselInterval);
    setCarouselInterval(undefined);
    setCarouselNum(n);
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
        <link rel="icon" href="../public/cat_butt.ico" />
      </Head>
      <main className='overflow-x-clip'>

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
            <button className='' aria-label="Panel 1" onClick={() => scrollTo(0)}><CircleIndicator className={`${(carouselNum % 3 === 0) ? "fill-accent" : "fill-transparent"}   hover:fill-accent`} /></button>
            <button className='' aria-label="Panel 2" onClick={() => scrollTo(1)}><CircleIndicator className={`${(carouselNum % 3 === 1) ? "fill-accent" : "fill-transparent"}   hover:fill-accent`} /></button>
            <button className='' aria-label="Panel 3" onClick={() => scrollTo(2)}><CircleIndicator className={`${(carouselNum % 3 === 2) ? "fill-accent" : "fill-transparent"}   hover:fill-accent`} /></button>
          </div>
        </div>

        <div className='px-10 mt-8'>
          {/* TODO: get items most rated */}
          <h1 className='text-4xl'>Popular:</h1>
          <div className='relative mt-8 mb-16 mx-auto max-w-7xl flex items-center border'>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <Loader className='absolute left-1/2 -translate-x-1/2' />}
            {products && (
              <>
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
              </>
            )}
          </div>
        </div>

        <div className='grid grid-rows-3 md:grid-rows-2 md:grid-cols-3 grid-flow-col md:w-3/4 mx-auto border'>
          <div className='relative block md:row-span-2 col-span-2'>
            <div className='absolute bottom-40 left-10 z-10'>
              <p className='text-4xl font-extrabol'>BEAUTIFUL CAT CLOTHING!</p>
              <Link href='/clothing'><a className=''>SHOP NOW {'>'}</a></Link>
            </div>
            <Image
              src='https://firebasestorage.googleapis.com/v0/b/shop-purr.appspot.com/o/sub-head-2.jpg?alt=media&token=2cce8815-efbb-4495-a27d-6d1e6052d4bf'
              alt='cat dressing'
              layout='fill'
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            />
          </div>
          <div className='relative block'>
            <p className='absolute top-10 left-8 text-xl font-semibold z-10'>AFFORDABLE TOYS FOR YOUR FURRY FRIEND!</p>
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
            <p className='absolute bottom-40 left-1/4 text-2xl font-semibold text-white z-10'>STYLISH CLOTHES!</p>
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

        <video className='my-16' autoPlay loop muted playsInline poster='https://firebasestorage.googleapis.com/v0/b/shop-purr.appspot.com/o/vid1_poster.jpg?alt=media&token=37daec5d-85f0-460a-a173-60c9464e5fec'>
          <source src='https://firebasestorage.googleapis.com/v0/b/shop-purr.appspot.com/o/Cats_1.mp4?alt=media&token=7daa1613-2561-4b73-bfc6-5568a5b49860' type='video/mp4' />
        </video>

        <div className='flex justify-center gap-4 overflow-x-scroll'>
          <div className='text-center h-52 w-52 flex-none border border-black'>INSTAGRAM</div>
          <div className='text-center h-52 w-52 flex-none border border-black'>INSTAGRAM</div>
          <div className='text-center h-52 w-52 flex-none border border-black'>INSTAGRAM</div>
          <div className='text-center h-52 w-52 flex-none border border-black'>INSTAGRAM</div>
          <div className='text-center h-52 w-52 flex-none border border-black'>INSTAGRAM</div>
        </div>
      </main>
    </div>
  );
}
