import Image from 'next/image';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import firebase from '../firebase/app';

const db = firebase.firestore();
const storage = firebase.storage();

var gsReference = storage.refFromURL('gs://shop-purr.appspot.com/food_1.jpg');

// const docRef = doc(db, "Foods", "jqu976h5XkU3xdiJ6UDJ");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }

// var docRef = db.collection("Foods").doc("jqu976h5XkU3xdiJ6UDJ");

// docRef.get().then((doc) => {
//     if (doc.exists) {
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });

const Food = (props) => {

    const [snapshot, loading, error] = useCollection(
        db.collection("Foods"),
        {}
    );

    const [value, loadingImg, errorImg] = useDownloadURL(gsReference);

    return (
        <div>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {snapshot && (
                <span>
                    Collection:{' '}
                    {snapshot.docs.map((doc) => (
                        <div key={doc.id}>
                            {value && <Image
                                src={value}
                                alt="Food 1"
                                height="64px"
                                width="64px" />}
                            {JSON.stringify(doc.data())},{' '}
                        </div>
                    ))}
                </span>
            )}
        </div >
    );
}

export default Food;