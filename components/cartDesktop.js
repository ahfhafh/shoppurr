const CartDesktop = (props) => {
    return (
        <div className="border-2 border-solid border-accent2 absolute right-0 h-full">
            <ul className="text-center">
                {props.cartItems.map((item, i) => {
                    return (<li key={i} >{item.name}</li>)
                })}
            </ul>
        </div>
    );
}

export default CartDesktop;