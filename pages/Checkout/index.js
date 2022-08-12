import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import firebaseApp from '../../firebase/app';
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { shimmer, toBase64 } from '../../utils/imageLoad';
import Loader from '../../public/images/loader.svg';

const Checkout = () => {

    const db = getFirestore(firebaseApp);

    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getProducts() {
            setLoading(true);
            setLoading(false);
        }
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [country, setCountry] = useState('Canada');

    useEffect(() => {
        console.log(country);
    }, [country]);

    return (
        <div className='w-full'>
            <div>
                <form className='w-1/2 p-4'>
                    <label className='block font-bold mb-4'>Shipping Address</label>
                    <select className='rounded-md border-solid border-2 border-slate-300 w-full p-1' name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
                        <option value="Canada">Canada</option>
                        <option value="USA">USA</option>
                    </select>
                    <input className='rounded-md border-solid border-2 border-slate-300 w-1/2 my-1 p-1' type='text' placeholder='First Name' />
                    <input className='rounded-md border-solid border-2 border-slate-300 w-1/2 my-1 p-1' type='text' placeholder='Last Name' />
                    <input className='rounded-md border-solid border-2 border-slate-300 w-full my-1 p-1' type='text' placeholder='Address' />
                    <input className='rounded-md border-solid border-2 border-slate-300 w-full my-1 p-1' type='text' placeholder='Apartment, suite, etc. (optional)' />
                    <input className='rounded-md border-solid border-2 border-slate-300 w-full my-1 p-1' type='text' placeholder='City' />
                    {country === 'USA' &&
                        <>
                            <select className='rounded-md border-solid border-2 border-slate-300 p-1' name="state" id="state">
                                <option value="">Select State</option>
                                <option value="Alabama">Alabama</option>
                                <option value="Alaska">Alaska</option>
                                <option value="Arizona">Arizona</option>
                                <option value="Arkansas">Arkansas</option>
                                <option value="California">California</option>
                                <option value="Colorado">Colorado</option>
                            </select>
                            <input className='rounded-md border-solid border-2 border-slate-300 p-1' type='text' placeholder='Zip Code' />
                        </>
                    } {country === "Canada" &&
                        <>
                            <select className='rounded-md border-solid border-2 border-slate-300 p-1' name='province' id='province'>
                                <option value="">Select Province</option>
                                <option value='AB'>Alberta</option>
                                <option value='BC'>British Columbia</option>
                                <option value='MB'>Manitoba</option>
                                <option value='NB'>New Brunswick</option>
                                <option value='NL'>Newfoundland and Labrador</option>
                                <option value='NS'>Nova Scotia</option>
                                <option value='ON'>Ontario</option>
                                <option value='PE'>Prince Edward Island</option>
                                <option value='QC'>Quebec</option>
                                <option value='SK'>Saskatchewan</option>
                                <option value='NT'>Northwest Territories</option>
                                <option value='NU'>Nunavut</option>
                                <option value='YT'>Yukon</option>
                            </select>
                            <input className='rounded-md border-solid border-2 border-slate-300 p-1' type='text' placeholder='Postal Code' />
                        </>
                    }
                    <input className='rounded-md border-solid border-2 border-slate-300 p-1' type='text' placeholder='Phone' />
                    <input className='rounded-md border-solid border-2 border-black py-1 px-4' type='submit' value='Continue' />
                </form>
            </div>
        </div>
    );
};

export default Checkout;