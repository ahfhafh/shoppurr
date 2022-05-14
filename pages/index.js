import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import firebaseApp from '../firebase/app';
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { shimmer, toBase64 } from '../utils/imageLoad';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../public/images/loader.svg';
import LeftArrow from '../public/images/left-arrow.svg';
import RightArrow from '../public/images/right-arrow.svg';
import CircleIndicator from '../public/images/circle.svg';
import main_cat_1 from '/public/images/main-cat-1.jpg';
import main_cat_2 from '/public/images/main-cat-2.jpg';
import main_cat_3 from '/public/images/main-cat-3.jpg';
import sub_head_2 from '/public/images/sub-head-2.jpg';
import sub_head_1 from '/public/images/sub-head-1.jpg';
import sub_head_3 from '/public/images/sub-head-3.jpg';

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

  const carouselRef = useRef(null);
  const [pointerX, setPointerX] = useState();

  const carouselAttributes = {
    ['drag']: "x",
    ['onDragStart']: (event, info) => {
      setPointerX(info.point.x);
      clearInterval(carouselInterval);
    },
    ['onDragEnd']: (event, info) => {
      if (info.point.x > pointerX + carouselRef.current.offsetWidth / 5) { scrollTo(carouselNum - 1); }
      else if (info.point.x < pointerX - carouselRef.current.offsetWidth / 5) { scrollTo(carouselNum + 1); }
      setCarouselInterval(setInterval(() => { setCarouselNum(carouselNum += 1); }, 5000));
    },
    ['dragSnapToOrigin']: true,
  };

  const popularItemsRef = useRef(null);
  const [viewLeft, setViewLeft] = useState(false);
  const [viewRight, setViewRight] = useState(true);
  const [popItemsScrollPos, setPopItemsScrollPos] = useState(0);
  function scrollRight(ref) { ref.current.scrollBy({ left: 500, behavior: 'smooth' }); }
  function scrollLeft(ref) { ref.current.scrollBy({ left: -500, behavior: 'smooth' }); }

  useEffect(() => {
    const clientWidth = popularItemsRef.current.clientWidth;
    const scrollWidth = popularItemsRef.current.scrollWidth;
    const scroll_Left = popularItemsRef.current.scrollLeft;
    if (scroll_Left == 0) {
      setViewRight(true);
      setViewLeft(false);
    } else if (scrollWidth - scroll_Left == clientWidth) {
      setViewLeft(true);
      setViewRight(false);
    } else {
      setViewLeft(true);
      setViewRight(true);
    }

  }, [popItemsScrollPos]);

  return (
    <div>
      <Head>
        <title>ShopPurr</title>
        <meta name="description" content="Shop cat stuff" />
      </Head>
      <main className='overflow-x-clip'>

        {/* Carousel */}
        <div className='relative'>
          <div className='relative h-72 md:h-96 w-full' ref={carouselRef}>
            <motion.div {...carouselAttributes} className={`absolute w-full h-full`} animate={{ right: `${(carouselNum % 3) * 100}vw` }} transition={{ type: 'tween' }}>
              <Image
                src={main_cat_1}
                alt="Cat Foods"
                layout='fill'
                objectFit='cover'
                objectPosition='0 30%'
                quality={100}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                draggable={false}
              />
            </motion.div>
            <motion.div {...carouselAttributes} className={`absolute w-full h-full`} animate={{ right: `${(carouselNum % 3 - 1) * 100}vw` }} transition={{ type: 'tween' }}>
              <Image
                src={main_cat_2}
                alt="Cat Foods"
                layout='fill'
                objectFit='cover'
                objectPosition='0 60%'
                quality={100}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                draggable={false}
              />
            </motion.div>
            <motion.div {...carouselAttributes} className={`absolute w-full h-full`} animate={{ right: `${(carouselNum % 3 - 2) * 100}vw` }} transition={{ type: 'tween' }}>
              <Image
                src={main_cat_3}
                alt="Cat Foods"
                layout='fill'
                objectFit='cover'
                objectPosition='0 15%'
                quality={100}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                draggable={false}
              />
            </motion.div>
          </div>
          <div className='absolute bottom-4 mx-auto left-0 right-0 w-min flex'>
            <motion.button whileHover={{ fill: '#ff8e3c' }} animate={(carouselNum % 3 === 0) ? { fill: '#ff8e3c' } : { fill: '#00000050' }} transition={{ duration: 0.5 }} aria-label="Panel 1" onClick={() => scrollTo(0)}><CircleIndicator /></motion.button>
            <motion.button whileHover={{ fill: '#ff8e3c' }} animate={(carouselNum % 3 === 1) ? { fill: '#ff8e3c' } : { fill: '#00000050' }} transition={{ duration: 0.5 }} aria-label="Panel 2" onClick={() => scrollTo(1)}><CircleIndicator /></motion.button>
            <motion.button whileHover={{ fill: '#ff8e3c' }} animate={(carouselNum % 3 === 2) ? { fill: '#ff8e3c' } : { fill: '#00000050' }} transition={{ duration: 0.5 }} aria-label="Panel 3" onClick={() => scrollTo(2)}><CircleIndicator /></motion.button>
          </div>
        </div>

        {/* Slidder */}
        <div className='px-10 mt-20'>
          {/* TODO: get items most rated */}
          <h1 className='text-4xl max-w-7xl mx-auto'>Popular:</h1>
          <div className='relative mt-8 mb-16 mx-auto max-w-7xl flex items-center border'>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <Loader className='absolute left-1/2 -translate-x-1/2' />}
            {products && (
              <>
                <AnimatePresence>
                  {viewLeft && <motion.div key={'leftArrow'} className='absolute z-10 hover:scale-105' initial={{ opacity: 0, left: -50 }} animate={{ opacity: 1, left: 16 }} exit={{ opacity: 0, left: -50 }}><LeftArrow className='fill-white' onClick={() => scrollLeft(popularItemsRef)} role='button' /></motion.div>}
                  {viewRight && <motion.div key={'rightArrow'} className='absolute z-10 hover:scale-105' initial={{ opacity: 0, right: -50 }} animate={{ opacity: 1, right: 16 }} exit={{ opacity: 0, right: -50 }}><RightArrow className='fill-white' onClick={() => scrollRight(popularItemsRef)} role='button' /></motion.div>}
                </AnimatePresence>
                <div className='pb-8 flex gap-8 overflow-x-scroll snap-x w-full' ref={popularItemsRef} onScroll={() => setPopItemsScrollPos(popularItemsRef.current.scrollLeft)}>
                  {products.map((product) => (
                    <Link href={`Foods/${product.id}`} key={product.id}><a className='scroll-ml-4 snap-start relative min-w-[150px] min-h-[150px] h-[256px] flex-none basis-[20%]'>
                      <Image
                        src={product.Image}
                        alt="Food 1"
                        layout='fill'
                        objectFit='contain'
                        quality={50}
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                      />
                      <div className='absolute top-2 left-2 bg-accent border border-black p-1'>${product.Price}</div>
                    </a></Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className='grid grid-rows-3 grid-cols-1 max-w-[550px] md:max-w-none md:grid-rows-2 md:grid-cols-3 grid-flow-col md:w-3/4 mx-auto border'>
          <div className='relative block md:row-span-2 col-span-2'>
            <div className='absolute bottom-8 md:bottom-32 left-10 z-10'>
              <p className='text-4xl font-extrabol'>BEAUTIFUL CAT CLOTHING!</p>
              <Link href='/clothing'><a className='hover:underline'>SHOP NOW {'>'}</a></Link>
            </div>
            <Image
              src={sub_head_2}
              alt='cat dressing'
              layout='fill'
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            />
          </div>
          <div className='relative block row-span-1 col-span-1'>
            <button className='absolute bottom-16 right-0 text-2xl md:text-lg font-semibold text-white bg-accent p-3 z-10 hover:underline'>AFFORDABLE TOYS!</button>
            <Image
              src={sub_head_1}
              alt='cat toying'
              height='550px'
              width='550px'
              objectFit='cover'
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            />
          </div>
          <div className='relative block row-span-1 col-span-1'>
            <button className='absolute bottom-16 md:bottom-30 text-2xl md:text-lg font-semibold text-white bg-accent p-3 z-10 hover:underline'>STYLISH human CLOTHES!</button>
            <Image
              src={sub_head_3}
              alt='cat hoodie'
              layout='fill'
              objectFit='cover'
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            />
          </div>
        </div>

        {/* Video */}
        <video className='my-16' autoPlay loop muted playsInline poster='/images/vid1_poster.jpg'>
          <source src='/videos/Cats_1.mp4' type='video/mp4' />
        </video>

        {/* INSTAGRAM */}
        <div className='flex justify-center gap-4 overflow-x-scroll'>
          <div className='text-center h-52 w-52 flex-none border border-black'>INSTAGRAM</div>
          <div className='text-center h-52 w-52 flex-none border border-black'>INSTAGRAM</div>
          <div className='text-center h-52 w-52 flex-none border border-black'>INSTAGRAM</div>
          <div className='text-center h-52 w-52 flex-none border border-black'>INSTAGRAM</div>
          <div className='text-center h-52 w-52 flex-none border border-black'>INSTAGRAM</div>
        </div>
      </main >
    </div >
  );
}
