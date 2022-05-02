import CartDesktop from "./cartDesktop";
import CartMobile from "./cartMobile";
import { AnimatePresence } from "framer-motion";

const Cart = (props) => {

    return (<div>
        <AnimatePresence exitBeforeEnter>{props.toggleCart && (props.useMediaQuery
            ? <CartMobile cartItems={props.cartItems} setToggleCart={() => props.setToggleCart()} />
            : <CartDesktop cartItems={props.cartItems} setToggleCart={() => props.setToggleCart()} />)
        }</AnimatePresence>
    </div>);
};

export default Cart;