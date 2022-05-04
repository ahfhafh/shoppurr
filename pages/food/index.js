import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import firebaseApp from '../../firebase/app';
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { shimmer, toBase64 } from '../../utils/imageLoad';
import Loader from '../../public/images/loader.svg';

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
        <div className='w-full px-10'>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <Loader className='absolute top-1/2 bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />}
            {products && (
                <div>
                    <div className='text-3xl text-center'>Show Case</div>
                    <div>
                        <div className='md:sticky top-8 w-52 md:float-left flex flex-col items-start'>
                            <p className='font-medium'>Sort By:</p>
                            <button>Price: Low to High</button>
                            <button>Price: High to Low</button>
                            <button>Top Rated</button>
                            <button>Newest</button>
                        </div>
                        <div className='mt-8 mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                            {products.map((product) => (
                                <Link href={`food/${product.id}`} key={product.id}><a className='mb-16'>
                                    <Image
                                        src={product.Image}
                                        alt="Food 1"
                                        height="256px"
                                        width="256px"
                                        placeholder="blur"
                                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                    />
                                    <div>{product.Name}</div>
                                    <div>${product.Price}</div>
                                </a></Link>
                            ))}
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default Food;

// TODO: pagination