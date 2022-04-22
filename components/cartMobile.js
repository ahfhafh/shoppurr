

const CartMobile = (props) => {
    return (
        <div className="border-2 border-solid border-accent2 z-10 absolute bottom-0 w-full bg-background2">
            <ul className="text-center">
                {props.cartItems.map((item, i) => {
                    return (<li key={i} >{item.name}</li>)
                })}
            </ul>
        </div>
    );
}

export default CartMobile;