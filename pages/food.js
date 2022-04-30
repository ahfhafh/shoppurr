import Image from 'next/image';
import { useEffect, useState } from 'react';
import firebase from '../firebase/app';

const db = firebase.firestore();

const Food = (props) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        db.collection('Foods').get().then((snapshot) => {
            setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        });
    }, [])

    return (
        <div>
            {/* {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Loading...</span>} */}
            {products && (console.log(products),
                products.map((product) => (
                    <div key={product.id}>
                        <h2>{product.Name}</h2>
                        <Image
                            src={product.Image}
                            alt="Food 1"
                            height="256px"
                            width="256px" />
                    </div>
                ))
            )}
        </div>
    );
}

export default Food;

// TODO: pagination