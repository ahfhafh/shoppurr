import NavSlide from "./navbarMobileSlide";
import NavbarDesktopLinks from "./navbarDesktopLinks";
import NavbarMobileMenu from "./navbarMobileMenu";
import Search from '../components/search';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from "../public/images/logo-dark.svg";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

const Navbar = (props) => {
    const [toggleSlideNav, setToggleSlideNav] = useState(false);

    useEffect(() => {
        (!props.useMediaQuery && setToggleSlideNav(false));
    }, [props.useMediaQuery]);

    const [toggleSearch, setToggleSearch] = useState(false);

    /* Prevent the user from scrolling when the cart is open. */
    useEffect(() => {
        if (toggleSearch) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [toggleSearch]);


    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = () => {
            setToggleSearch(false);
        };

        router.events.on('routeChangeStart', handleRouteChange);

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <nav className="relative z-30 shadow-md">

            <AnimatePresence>
                {toggleSearch && <Search toggleSearch={() => setToggleSearch(false)} />}
            </AnimatePresence>

            <div className="h-24 pt-2 md:px-12 md:pt-0 bg-background2 md:flex md:justify-between md:items-center">
                <Link href='/'>
                    <a className="flex justify-center items-end">
                        <Logo className='shrink-0' />
                        <h1 className="font-indie text-accent text-5xl ml-2 mr-4 shrink-0 md:grow">Shop purr</h1>
                    </a>
                </Link>
                {!props.useMediaQuery && <NavbarDesktopLinks cartItems={props.cartItemsNum} toggleCart={() => props.toggleCart()} toggleSearch={() => setToggleSearch(!toggleSearch)} />}
            </div>
            {props.useMediaQuery && <NavbarMobileMenu cartItems={props.cartItemsNum} toggleSlideNav={() => setToggleSlideNav(!toggleSlideNav)} toggleState={toggleSlideNav} toggleCart={() => props.toggleCart()} />}
            <AnimatePresence exitBeforeEnter>
                {toggleSlideNav && <NavSlide toggleSearch={() => setToggleSearch(!toggleSearch)} />}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;