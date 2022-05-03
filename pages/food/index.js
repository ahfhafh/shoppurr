import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import firebaseApp from '../../firebase/app';
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { shimmer, toBase64 } from '../../utils/imageLoad';

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
        <div>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Loading...</span>}
            {products && (
                products.map((product) => (
                    <div className='flex' key={product.id}>
                        <Link href={`food/${product.id}`}><a className='text-4xl'>{product.Name}</a></Link>
                        <Image
                            src={product.Image}
                            alt="Food 1"
                            height="256px"
                            width="256px"
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                        />
                    </div>
                ))
            )}
        </div>
    );
};

export default Food;

// TODO: pagination