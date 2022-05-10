import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import firebaseApp from '../../firebase/app';
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { shimmer, toBase64 } from '../../utils/imageLoad';
import Loader from '../../public/images/loader.svg';

const Clothing = () => {

    const db = getFirestore(firebaseApp);

    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getProducts() {
            setLoading(true);
            await getDocs(collection(db, 'Clothing')).then((snapshot) => {
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
                    <div className='h-72 md:h-96 relative bg-center bg-cover'>
                        <Image
                            src='https://firebasestorage.googleapis.com/v0/b/shop-purr.appspot.com/o/food_header.jpg?alt=media&token=5e4fb3a9-c935-4afb-a82e-7401cd877bff'
                            alt="Cat Clothing"
                            layout='fill'
                            objectFit='cover'
                            quality={100}
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                            className='bg-center bg-cover'
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
                                <Link href={`clothing/${product.id}`} key={product.id}><a className='mb-16'>
                                    <Image
                                        src={product.Image}
                                        alt={`Clothing ${product.name}`}
                                        height="256px"
                                        width="256px"
                                        placeholder="blur"
                                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                    />
                                    <div className='max-w-64'>{product.Name}</div>
                                    <div>${product.Price}</div>
                                </a></Link>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Clothing;