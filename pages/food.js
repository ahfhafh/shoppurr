import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import firebaseApp from '../firebase/app';
import { collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const Food = (props) => {

    const db = getFirestore(firebaseApp);

    const postConverter = {
        fromFirestore(snapshot, options) {
            const data = snapshot.data(options)
            return {
                id: snapshot.id,
                Name: data.Name,
                Image: data.Image,
            };
        }
    };

    const ref = collection(db, "Foods").withConverter(postConverter);
    const [values, loading, error, snapshot] = useCollectionDataOnce(ref, {});


    // const products = useMemo(() => {
    //     []
    // }, [])

    const [products, setProducts] = useState([]);

    return (
        <div>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Loading...</span>}
            {snapshot && (
                values.map((product) => {
                    return (<div key={product.id}>
                        <h2>{product.Name}</h2>
                        {console.log(product)}

                        {/* <Image
                            src={product.Image}
                            alt="Food 1"
                            height="256px"
                            width="256px" /> */}
                    </div>)
                })
            )}
        </div>
    );
}

export default Food;

// TODO: pagination