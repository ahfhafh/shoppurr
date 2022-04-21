
import { motion } from "framer-motion"
import { useState } from 'react';
import NavSlide from "./navbarMobileSlide";
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const NavbarMobileLinks = (props) => {
    const [toggleSlideNav, setToggleSlideNav] = useState(false);

    return (
        <div>
            <button className="border-solid border-2 border-text w-10/12 ml-9 h-16 fixed bottom-8" onClick={() => setToggleSlideNav(!toggleSlideNav)}>
                <Link href='/'>
                    <a className="float-right mr-8">
                        <span className="fa-layers fa-fw fa-lg mt-2">
                            <FontAwesomeIcon icon={faCartShopping} className="text-4xl text-accent" />
                            <span className="fa-layers-counter text-5xl" style={{ '--fa-counter-background-color': '#D9376E', '--fa-right': '-20px', '--fa-top': '-15px' }}>{props.cartItems}</span>
                        </span>
                    </a>
                </Link>
            </button>
            {toggleSlideNav && <NavSlide cartItems={props.cartItems} />}
        </div>

    );
}

export default NavbarMobileLinks;