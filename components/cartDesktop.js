const CartDesktop = (props) => {
    return (
        <div className="border-2 border-solid border-accent2 z-10 absolute right-0 h-full bg-background2">
            <button className="float-right">X</button>
            <ul className="text-center">
                {props.cartItems.map((item, i) => {
                    return (<li key={i} >{item.name}</li>)
                })}
            </ul>
        </div>
    );
}

export default CartDesktop;