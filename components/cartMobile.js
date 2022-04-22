

const CartMobile = (props) => {
    return (
        <div className="border-2 border-solid border-accent2 z-10 absolute bottom-0 w-full bg-background2">
            <button className="float-right">X</button>
            <ul className="text-center py-2">
                {props.cartItems.map((item, i) => {
                    return (<li key={i} className='my-2' >{item.name} {item.price} {item.quanty}</li>)
                })}
            </ul>
        </div>
    );
}

export default CartMobile;