import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const NavbarDesktopLinks = (props) => {
    return (
        <div className="ml-9 w-1/3 flex float-right justify-between">

            <Link href='/login'>
                <a><FontAwesomeIcon icon={faUser} className="text-4xl text-accent" /></a>
            </Link>

            <Link href='/'>
                <a>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-4xl text-accent" />
                </a>
            </Link>

            <button onClick={() => props.setToggleCart()}>
                <span className="fa-layers fa-fw fa-lg mt-2">
                    <FontAwesomeIcon icon={faCartShopping} className="text-4xl text-accent" />
                    <span className="fa-layers-counter text-5xl" style={{ '--fa-counter-background-color': '#D9376E', '--fa-right': '-20px', '--fa-top': '-15px' }}>{props.cartItems}</span>
                </span>
            </button>

        </div>
    );
}

export default NavbarDesktopLinks;