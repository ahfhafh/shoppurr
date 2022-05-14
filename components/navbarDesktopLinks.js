import Link from 'next/link';
import UserIcon from '../public/images/user_icon.svg';
import SearchIcon from '../public/images/magnifying-glass.svg';
import CartIcon from '../public/images/cart-shopping.svg';

const NavbarDesktopLinks = (props) => {
    return (
        <>
            <div className='flex flex-wrap justify-center'>
                <Link href='/Foods'>
                    <a className='font-indie text-accent text-xl mx-4'>FOOD</a>
                </Link>
                <Link href='/Toys'>
                    <a className='font-indie text-accent text-xl mx-4'>TOYS</a>
                </Link>
                <Link href='/Clothing'>
                    <a className='font-indie text-accent text-xl mx-4'>CLOTHING</a>
                </Link>
            </div>
            <div className="ml-9 w-48 flex float-right justify-between">

                <Link href='/account'><a title="Profile">
                    <UserIcon className="fill-accent" />
                </a></Link>

                <a title="Search" role="button">
                    <SearchIcon className="fill-accent" onClick={() => props.toggleSearch()} />
                </a>

                <button onClick={() => props.toggleCart()}>
                    <span className="fa-layers fa-fw fa-lg mb-2" title="Cart">
                        <CartIcon className="fill-accent" />
                        {props.cartItems > 0 && <span className="fa-layers-counter text-5xl" style={{ '--fa-counter-background-color': '#D9376E', '--fa-right': '-20px', '--fa-top': '-5px' }}>{props.cartItems}</span>}
                    </span>
                </button>

            </div>
        </>

    );
};

export default NavbarDesktopLinks;