import NavSlide from "./navbarMobileSlide";
import NavbarDesktopLinks from "./navbarDesktopLinks";
import NavbarMobileMenu from "./navbarMobileMenu";
import Link from 'next/link';
import Logo from "../public/images/logo-dark.svg";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

const Navbar = (props) => {
    const [toggleSlideNav, setToggleSlideNav] = useState(false);

    useEffect(() => {
        (!props.useMediaQuery && setToggleSlideNav(false));
    }, [props.useMediaQuery]);

    return (
        <nav className="relative z-30">
            <div className="h-24 pt-2 md:px-12 md:pt-0 bg-background2 md:flex md:justify-between md:items-center">
                <div>
                    <Link href='/'>
                        <a className="flex justify-center items-end">
                            <Logo className='shrink-0' />
                            <h1 className="font-indie text-accent text-5xl ml-2 mr-4 shrink-0 md:grow">Shop purr</h1>
                        </a>
                    </Link>
                </div>
                {!props.useMediaQuery && <NavbarDesktopLinks cartItems={props.cartItemsNum} toggleCart={() => props.toggleCart()} />}
            </div>
            {props.useMediaQuery && <NavbarMobileMenu cartItems={props.cartItemsNum} toggleSlideNav={() => setToggleSlideNav(!toggleSlideNav)} toggleState={toggleSlideNav} toggleCart={() => props.toggleCart()} />}
            <AnimatePresence exitBeforeEnter>
                {toggleSlideNav && <NavSlide />}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

// TODO: change icons to svgs