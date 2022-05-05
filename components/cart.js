import CartDesktop from "./cartDesktop";
import CartMobile from "./cartMobile";
import { AnimatePresence } from "framer-motion";

const Cart = (props) => {

    return (
        <AnimatePresence exitBeforeEnter>{props.cartState && (props.useMediaQuery
            ? <CartMobile cartItems={props.cartItems} toggleCart={() => props.toggleCart()} removeCartItem={(i) => props.removeCartItem(i)} incNumInCart={(i) => props.incNumInCart(i)} decNumInCart={(i) => props.decNumInCart(i)} />
            : <CartDesktop cartItems={props.cartItems} toggleCart={() => props.toggleCart()} removeCartItem={(i) => props.removeCartItem(i)} incNumInCart={(i) => props.incNumInCart(i)} decNumInCart={(i) => props.decNumInCart(i)} />)
        }</AnimatePresence>
    );
};

export default Cart;