import CartDesktop from "./cartDesktop";
import CartMobile from "./cartMobile";
import { AnimatePresence } from "framer-motion";

const Cart = (props) => {

    return (<div>
        <AnimatePresence exitBeforeEnter>{props.toggleCart && (props.useMediaQuery
            ? <CartMobile cartItems={props.cartItems} setToggleCart={() => props.setToggleCart()} removeCartItem={(i) => props.removeCartItem(i)} incNumInCart={(i) => props.incNumInCart(i)} decNumInCart={(i) => props.decNumInCart(i)} />
            : <CartDesktop cartItems={props.cartItems} setToggleCart={() => props.setToggleCart()} removeCartItem={(i) => props.removeCartItem(i)} incNumInCart={(i) => props.incNumInCart(i)} decNumInCart={(i) => props.decNumInCart(i)} />)
        }</AnimatePresence>
    </div>);
};

export default Cart;