import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import firebaseApp from '../../firebase/app';
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { shimmer, toBase64 } from '../../utils/imageLoad';
import Loader from '../../public/images/loader.svg';
import food_header from '/public/images/food_header.jpg';
import Star_template from '../../public/images/star_template.svg';

const Food = () => {

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
        <div className='w-full'>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <Loader className='absolute top-1/2 left-1/2 -translate-x-1/2' />}
            {products && (
                <>
                    <div className='h-72 md:h-96 relative'>
                        <Image
                            src={food_header}
                            alt="Cat Foods"
                            layout='fill'
                            objectFit='cover'
                            quality={100}
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                        />
                        <h1 className='absolute w-full text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-extrabold'>Cat Food</h1>
                    </div>
                    <div className='px-10'>
                        <div className='md:sticky md:top-8 mt-10 w-52 md:float-left flex flex-col items-start'>
                            <p className='font-medium'>Sort By:</p>
                            <button>Price: Low to High</button>
                            <button>Price: High to Low</button>
                            <button>Top Rated</button>
                            <button>Newest</button>
                        </div>
                        <div className='mt-8 mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center items-start'>
                            {products.map((product) => (
                                <div key={product.id} className='w-full h-[256px] mb-36'>
                                    <Link href={`Foods/${product.id}`} ><a>
                                        <div className='relative w-full h-full'>
                                            <Image
                                                src={product.Image}
                                                alt={`Food ${product.Name}`}
                                                layout='fill'
                                                objectFit='contain'
                                                placeholder="blur"
                                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                            />
                                        </div>
                                        <div className='overflow-hidden text-ellipsis' style={{ 'display': '-webkit-box', 'WebkitLineClamp': 3, 'WebkitBoxOrient': 'vertical' }} title={product.Name}>{product.Name}</div>
                                        <div className=''>${product.Price}</div>
                                        <div className='bg-background flex' title={product.Rating}>
                                            <div className='absolute w-[99px] h-[18px]'>
                                                <div className={`h-full bg-yellow-300`} style={{ width: `${product.Rating ? Math.round(product.Rating / 5 * 100) : 0}%` }}></div>
                                            </div>
                                            <Star_template className='z-10  w-[99px] h-[18px]' />
                                        </div>
                                    </a></Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Food;

// TODO: pagination