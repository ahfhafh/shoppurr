import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import firebaseApp from '../../firebase/app';
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { shimmer, toBase64 } from '../../utils/imageLoad';

const Food = (props) => {

    const router = useRouter();
    const { id } = router.query;

    const db = getFirestore(firebaseApp);

    const [product, setProduct] = useState();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (!router.isReady) return;

        async function getProduct() {
            setLoading(true);
            await getDoc(doc(db, 'Foods', id)).then((snapshot) => {
                setProduct(snapshot.data());
            }).catch((err) => {
                setError(err);
                console.log(err);
            });
            setLoading(false);
        }

        getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    return (
        <>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Loading...</span>}
            {product && (
                <div className=''>
                    <Link href={`foods/${product.id}`}><a className='text-4xl'>{product.Name}</a></Link>
                    <Image
                        src={product.Image}
                        alt="Food 1"
                        height="256px"
                        width="256px"
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                    />
                    <button className='text-lg text-background2 bg-accent px-24 py-4' onClick={() => props.addToCart(product)}>Add To Cart</button>
                </div>
            )}
        </>

    );
};

export default Food;

// TODO: open cart when adding item to cart