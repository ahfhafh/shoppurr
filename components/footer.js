import firebaseApp from '../firebase/app';
import { getFirestore, addDoc, serverTimestamp, query, where, collection, getDocs } from "firebase/firestore";
import { useState } from 'react';

const db = getFirestore(firebaseApp);

const Footer = (props) => {

    const [message, setMessage] = useState(false);
    const [subscribeOK, setSubscribOK] = useState(false);

    async function storeEmail(e) {
        e.preventDefault();
        const email = e.target.elements.email.value;

        // Check if email already exists
        const doc = await getDocs(query(collection(db, "Emails"), where("Email", "==", email)));
        if (doc.empty) {
            await addDoc(collection(db, "Emails"), {
                Email: email,
                Created: serverTimestamp(),
            });
            setMessage();
            e.target.elements.email.value = '';
            setSubscribOK(true);
        } else {
            setMessage(true);
        }
    }

    return (
        <footer className='text-center bg-background2 pt-8 pb-36'>
            <div className="m-4">
                {subscribeOK ?
                    <div>{`Can't believe u signed up.`}</div>
                    : <>
                        <div className="my-4">Subscribe for 0.5% off your first purchase:</div>
                        <form onSubmit={(e) => storeEmail(e)}>
                            <input className="border border-gray-300 focus:outline-none focus:border-black py-1 px-2 mr-2 focus:invalid:border-red-500" name='email' type='email' placeholder="Email" required></input>
                            <button className="text-xl font-semibold" type='submit'>{`>`}</button>
                            {message && <div className='mt-2'>{`Hey u already signed up!`}</div>}
                        </form>
                    </>}
            </div>
            <div>Powered by <a href="https://github.com/ahfhafh/shoppurr" className="underline">Github Repo</a></div>
        </footer>
    );
};

export default Footer;