import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import Minus_sign from '../public/images/minus-sign.svg';
import Plus_sign from '../public/images/plus-sign.svg';

const CartMobile = (props) => {

    const modalRef = useRef();

    function closeModal(e) {
        if (modalRef.current === e.target) props.setToggleCart();
    }

    return (
        <motion.div className="z-10 w-full h-full absolute"
            onClick={closeModal}
            ref={modalRef}
            key="modalBackM"
            animate={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: "blur(4px)" }}
            exit={{ backgroundColor: 'rgba(255, 255, 255, 0)', backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
        >
            <motion.div className="w-full bg-background2 shadow-2xl absolute pt-20 flex flex-col max-h-screen items-center"
                key='modalM'
                initial={{ bottom: '-100vh' }}
                animate={{ bottom: 0 }}
                exit={{ bottom: '-100vh' }}
                transition={{ bounce: 0 }}
            >
                <button className="absolute right-8 top-8" onClick={() => props.setToggleCart()}>X</button>
                <ul className="text-center py-2 w-full overflow-y-auto">
                    {props.cartItems.length ?
                        props.cartItems.map((item, i) =>
                            <li key={i} className='my-2 mx-8 flex items-center' >
                                <button className="" onClick={() => props.removeCartItem(i)}>X</button>
                                <Image
                                    src={item.Image}
                                    alt={item.Name}
                                    width='128px'
                                    height='128px'
                                />
                                <div className="grow text-left">
                                    <p className="font-medium">{item.Name}</p>
                                    <p className="text-sm">{`$${item.Price}`}</p>
                                </div>
                                <div className="flex items-center">
                                    <button className="p-2 ring-1 ring-neutral-400 hover:ring-black disabled:ring-neutral-400 disabled:cursor-not-allowed" disabled={item.numInCart <= 1} onClick={() => props.decNumInCart(i)}><Minus_sign /></button>
                                    <label className="px-4 inline-block border-y h-8 border-neutral-400">{item.numInCart}</label>
                                    <button className="p-2 ring-1 ring-neutral-400 hover:ring-black disabled:ring-neutral-400 disabled:cursor-not-allowed" disabled={item.numInCart >= item.Qty} onClick={() => props.incNumInCart(i)}><Plus_sign /></button>
                                </div>
                            </li>
                        )
                        : <p>No items in cart</p>
                    }
                </ul>
                <p className="text-center mt-4">subtotal: </p>
                <Link href='/'>
                    <a className="bg-accent text-background2 text-center text-xl w-10/12 mt-4 rounded-lg p-3 mb-8" onClick={() => props.setToggleCart()}>Checkout</a>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default CartMobile;