import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";
import Minus_sign from '../public/images/minus-sign.svg';
import Plus_sign from '../public/images/plus-sign.svg';

const CartDesktop = (props) => {

    const modalRef = useRef();

    function closeModal(e) {
        if (modalRef.current === e.target) props.toggleCart();
    }

    const [cartEmpty, setCartEmpty] = useState();
    const [animateFinish, setAnimateFinish] = useState(true);

    useEffect(() => {
        (props.cartItems.length > 0) ?
            (setCartEmpty(false), setAnimateFinish(false))
            : (setCartEmpty(true));
    }, [props.cartItems.length]);

    useEffect(() => {
        (props.cartItems.length > 0) && setAnimateFinish(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animateFinish]);

    return (
        <motion.div className="z-40 w-full h-full left-0 fixed overflow-x-hidden"
            onClick={closeModal}
            ref={modalRef}
            key="modalBackD"
            animate={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: "blur(4px)" }}
            exit={{ backgroundColor: 'rgba(255, 255, 255, 0)', backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
        >
            <motion.div className="bg-background2 shadow-2xl border-l absolute pt-20 right-0 w-[496px] h-full"
                key="modalD"
                initial={{ right: '-100vw' }}
                animate={{ right: 0 }}
                exit={{ right: '-100vw' }}
                transition={{ bounce: 0 }}
            >
                <button className="absolute right-8 top-8" onClick={() => props.toggleCart()}>X</button>
                <div className="flex flex-col items-center h-full">
                    <ul className="text-center py-2 overflow-y-auto overflow-x-hidden w-full grow">
                        <AnimatePresence onExitComplete={() => setAnimateFinish(true)}>
                            {!cartEmpty &&
                                props.cartItems.map((item, i) =>
                                    <motion.li key={item.id} className='my-2 mx-8 flex items-center' layout exit={{ translateX: 500 }} transition={{ duration: 0.5, type: "tween" }}>
                                        <button className="" onClick={() => props.removeCartItem(i)}>X</button>
                                        <div className="shrink-0">
                                            <Image
                                                src={item.Image}
                                                alt={item.Name}
                                                width='100px'
                                                height='100px'
                                            />
                                        </div>
                                        <div className="grow text-left mr-2">
                                            <Link href={`/${item.category}/${item.id}`}><a>
                                                <p className="font-medium text-md overflow-hidden text-ellipsis hover:underline" style={{ 'display': '-webkit-box', 'WebkitLineClamp': 2, 'WebkitBoxOrient': 'vertical' }} title={item.Name}>{item.Name}</p>
                                            </a></Link>
                                            <p className="text-sm">{`$${item.Price}`}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <button className="p-2 ring-1 ring-neutral-400 hover:ring-black disabled:ring-neutral-400 disabled:cursor-not-allowed disabled:fill-zinc-300" disabled={item.numInCart <= 1} onClick={() => props.decNumInCart(i)}><Minus_sign /></button>
                                            <label className="px-4 inline-block border-y h-8 border-neutral-400">{item.numInCart}</label>
                                            <button className="p-2 ring-1 ring-neutral-400 hover:ring-black disabled:ring-neutral-400 disabled:cursor-not-allowed disabled:fill-zinc-300" disabled={item.numInCart >= item.Qty} onClick={() => props.incNumInCart(i)}><Plus_sign /></button>
                                        </div>
                                    </motion.li>
                                )
                            }
                        </AnimatePresence>
                    </ul>
                    <AnimatePresence>
                        {cartEmpty && animateFinish ?
                            <motion.p key={'NoItems'} className="absolute text-center" animate={{ top: 160 }}>No items in cart</motion.p>
                            : <motion.div key={'CheckoutBtn'} className="mt-4 mb-8 w-full" exit={{ translateY: 100 }}>
                                <p className="mb-4 pl-4 text-lg float-left">Subtotal:</p>
                                <p className="pr-4 text-lg font-bold float-right">${props.cartSubtotal}</p>
                                <Link href='/'>
                                    <a className="clear-both block bg-accent text-background2 text-center text-xl w-10/12 mx-auto rounded-lg py-3" onClick={() => props.toggleCart()}>Checkout</a>
                                </Link>
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div >
    );
};

export default CartDesktop;