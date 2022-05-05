import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const NavbarDesktopLinks = (props) => {
    return (
        <>
            <div className='flex flex-wrap justify-center'>
                <Link href='/food'>
                    <a className='font-indie text-accent text-xl mx-4'>FOOD</a>
                </Link>
                <Link href='/toys'>
                    <a className='font-indie text-accent text-xl mx-4'>TOYS</a>
                </Link>
                <Link href='/clothing'>
                    <a className='font-indie text-accent text-xl mx-4'>CLOTHING</a>
                </Link>
            </div>
            <div className="ml-9 w-48 flex float-right justify-between">

                <Link href='/account'><a title="Profile">
                    <FontAwesomeIcon icon={faUser} className="text-4xl text-accent" />
                </a></Link>

                <Link href='/'><a title="Search">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-4xl text-accent" />
                </a></Link>

                <button onClick={() => props.setToggleCart()}>
                    <span className="fa-layers fa-fw fa-lg mt-2" title="Cart">
                        <FontAwesomeIcon icon={faCartShopping} className="text-4xl text-accent" />
                        {props.cartItems > 0 && <span className="fa-layers-counter text-5xl" style={{ '--fa-counter-background-color': '#D9376E', '--fa-right': '-20px', '--fa-top': '-15px' }}>{props.cartItems}</span>}
                    </span>
                </button>

            </div>
        </>

    );
};

export default NavbarDesktopLinks;