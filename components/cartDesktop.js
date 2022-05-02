import { useRef } from "react";
import Link from 'next/link';
import { motion } from 'framer-motion';

const CartDesktop = (props) => {

    const modalRef = useRef();

    function closeModal(e) {
        if (modalRef.current === e.target) props.setToggleCart();
    }

    return (
        <motion.div className="z-10 w-full h-full absolute"
            onClick={closeModal}
            ref={modalRef}
            key="modalBackD"
            animate={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: "blur(4px)" }}
            exit={{ backgroundColor: 'rgba(255, 255, 255, 0)', backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
        >
            <motion.div className="bg-background2 shadow-2xl absolute pt-20 right-0 w-[496px] h-full flex flex-col items-center"
                key="modalD"
                initial={{ right: '-100vw' }}
                animate={{ right: 0 }}
                exit={{ right: '-100vw' }}
                transition={{ bounce: 0 }}
            >
                <button className="absolute right-8 top-8" onClick={() => props.setToggleCart()}>X</button>
                <ul className="text-center py-2 overflow-y-auto grow w-full">
                    {props.cartItems.length ?
                        props.cartItems.map((item, i) =>
                            <li key={i} className='my-2' >{item.Name} {item.Price} {item.Qty}</li>
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

export default CartDesktop;