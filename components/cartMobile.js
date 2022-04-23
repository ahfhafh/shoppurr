import { useRef } from "react";
import Link from "next/link";

const CartMobile = (props) => {

    const modalRef = useRef();

    function closeModal(e) {
        if (modalRef.current === e.target) props.setToggleCart()
    }

    return (
        <div className="bg-background2 bg-opacity-50 backdrop-blur-sm z-10 w-full h-full absolute" onClick={closeModal} ref={modalRef}>
            <div className="w-full bg-background2 shadow-2xl absolute bottom-0 pb-24 pt-20">
                <button className="absolute right-8 top-8" onClick={() => props.setToggleCart()}>X</button>
                <ul className="text-center py-2 overflow-y-auto" style={{ 'maxHeight': 'calc(100vh - 205px)' }}>
                    {props.cartItems.map((item, i) => {
                        return (<li key={i} className='my-2' >{item.name} {item.price} {item.quanty}</li>)
                    })}
                </ul>
                <p className="text-center mt-4">subtotal: </p>
                <Link href='/'>
                    <a className="bg-accent text-background2 absolute left-1/2 -translate-x-1/2 text-center text-xl w-10/12 mt-4 rounded-lg p-3" onClick={() => props.setToggleCart()}>Checkout</a>
                </Link>
            </div>
        </div>
    );
}

export default CartMobile;