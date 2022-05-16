import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import firebaseApp from '../../firebase/app';
import { getFirestore, doc, getDoc, collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { shimmer, toBase64 } from '../../utils/imageLoad';
import Loader from '../../public/images/loader.svg';
import Star_template from '../../public/images/star_template.svg';

const Food = (props) => {

    const router = useRouter();
    const { id } = router.query;

    const db = getFirestore(firebaseApp);

    const [product, setProduct] = useState();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState(0);

    const [reviews, setReviews] = useState([]);
    const [reviewsErr, setReviewsErr] = useState('');
    const [reviewsLoading, setReviewsLoading] = useState(false);

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

        async function getReviews() {
            setReviewsLoading(true);
            await getDocs(collection(db, 'Foods', id, 'Reviews')).then((snapshot) => {
                setReviews(snapshot.docs.map((review) => ({ ...review.data(), id: review.id })));
            }).catch((err) => {
                setReviewsErr(err);
                console.log(err);
            });
            setReviewsLoading(false);
        }
        getReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    function renderTab() {
        switch (tab) {
            case 0:
                return <p>{product.Description}</p>;
            case 1:
                return <div>Express: greater or equal to 150 Days</div>;
            case 2:
                return <div>Return for no refund</div>;
            default:
                return <p>{product.Description}</p>;
        }
    }

    function addToCartHandler() {
        product.id = id;
        product.category = 'food';
        props.addToCart(product);
        props.toggleCart();
    }

    const [reviewOpen, setReviewOpen] = useState(false);
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewFeedback, setReviewFeedback] = useState('');

    async function handleReviewSubmit(e) {
        console.log(reviewTitle);
        console.log(reviewFeedback);
        await addDoc(collection(doc(db, 'Foods', id), 'Reviews'), {
            Title: reviewTitle,
            Feedback: reviewFeedback,
        });
    }

    const auth = getAuth(firebaseApp);
    console.log(auth.currentUser);

    return (
        <>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <Loader className='absolute top-1/2 bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />}
            {product && (
                <div>
                    <div className='max-w-7xl mx-auto my-4 md:my-16 px-8 md:px-16 flex flex-col md:flex-row gap-8'>

                        <div className='basis-3/5 flex flex-col md:flex-row gap-4 max-h-[500px] shrink-0 items-center'>
                            <div className='grow w-full md:w-auto h-[500px] relative md:order-last'>
                                <Image
                                    src={product.Image}
                                    alt={product.Name}
                                    layout='fill'
                                    objectFit='contain'
                                    placeholder="blur"
                                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                />
                            </div>
                            <div className='w-full md:w-24 h-[150px] md:h-full flex justify-center md:inline overflow-x-scroll md:overflow-y-scroll md:overflow-x-hidden'>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <button key={i} className='relative w-20 h-20 flex-none md:mb-5'>
                                            <Image
                                                src={product.Image}
                                                alt={product.Name}
                                                layout='fill'
                                                objectFit='contain'
                                                quality={10}
                                                placeholder="blur"
                                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p className='text-4xl'>{product.Name}</p>
                            <Link href='/'><a className='text-md underline'>{product.Brand}</a></Link>
                            <div className='bg-background flex'>
                                <div className='absolute w-[132px] h-[24px]'>
                                    <div className={`h-full bg-yellow-300`} style={{ width: `${product.Rating ? Math.round(product.Rating / 5 * 100) : 0}%` }}></div>
                                </div>
                                <Star_template className='z-10' />
                                <p className='ml-2 underline'>placeholder</p>
                            </div>
                            <p className='text-2xl'>${product.Price}</p>
                            <button className='text-lg text-background2 bg-accent px-20 py-2 mt-8' onClick={() => addToCartHandler()}>Add To Cart</button>

                            <div className='mt-8'>
                                <button className={`border-b-2 ${(tab < 1) ? 'border-b-black' : 'border-b-slate-400'} w-1/3 text-center`} onClick={() => setTab(0)} disabled={tab === 0}>Description</button>
                                <button className={`border-b-2 ${(tab === 1) ? 'border-b-black' : 'border-b-slate-400'} w-1/3 text-center mb-4`} onClick={() => setTab(1)} disabled={tab === 1}>Shipping</button>
                                <button className={`border-b-2 ${(tab > 1) ? 'border-b-black' : 'border-b-slate-400'} w-1/3 text-center mb-4`} onClick={() => setTab(2)} disabled={tab === 2}>Returns</button>

                                {renderTab()}
                            </div>

                        </div>
                    </div>
                    <div className='mt-16 mx-8 md:mx-28'>
                        <button className='mb-2 float-right rounded-sm bg-accent2 py-2 px-4 text-white' onClick={() => setReviewOpen(!reviewOpen)}>Add Review</button>
                        {reviewOpen &&
                            <div className='mt-20 clear-right border-2 border-gray-400 p-4'>
                                <h1>Submit a review:</h1>
                                <form onSubmit={e => { handleReviewSubmit(e); }}>
                                    <label>Review:*</label><br />
                                    <textarea className='w-full' style={{ WebkitBoxSizing: 'border-box', boxSizing: 'border-box' }} name='feedback' type='text' value={reviewFeedback} onChange={(e) => setReviewFeedback(e.target.value)} required></textarea><br />
                                    <label>Title:*</label><br />
                                    <input className='w-full' name='title' type='text' value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} required></input><br />
                                    <button className='rounded-sm bg-accent2 py-2 px-4 mt-4' type='submit'>Submit review</button>
                                </form>
                            </div>
                        }
                        <p className='text-2xl'>Reviews:</p>

                        {reviewsErr && <strong>Error: {JSON.stringify(reviewsErr)}</strong>}
                        {reviewsLoading && <Loader className='' />}
                        {reviews &&
                            <ul className='px-4 py-8'>
                                {reviews.map((review) => (
                                    <li key={review.id} className='border p-4'>
                                        <h1 className='text-xl'>{review.Title}</h1>
                                        <p>{review.Feedback}</p>
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                </div>
            )}
        </>

    );
};

export default Food;

// TODO: better view of other pictures, better scroll
// TODO: review, ratings, num of ratings
// TODO?: add amount to cart