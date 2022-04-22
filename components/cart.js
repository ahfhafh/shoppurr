import CartDesktop from "./cartDesktop";
import CartMobile from "./cartMobile";
import { useState } from "react";

const Cart = (props) => {
    // const [cartItems, setCartItems] = useState([]);

    const cartItems = [
        {
            name: "food 1",
            price: '2',
            quantity: 1
        },
        {
            name: "food 2",
            price: '22',
            quantity: 3
        },
    ]

    return (<div>
        {props.toggleCart && (props.useMediaQuery
            ? <CartMobile cartItems={cartItems} />
            : <CartDesktop cartItems={cartItems} />)
        }
    </div>);
}

export default Cart;