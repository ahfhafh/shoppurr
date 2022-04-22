import NavSlide from "./navbarMobileSlide";
import NavbarDesktopLinks from "./navbarDesktopLinks";
import NavbarMobileLinks from "./navbarMobileLinks";
import Link from 'next/link';
import Image from "next/image";
import logo from "../public/images/logo-dark.svg"
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion"

const Navbar = (props) => {
    const [toggleSlideNav, setToggleSlideNav] = useState(false);

    useEffect(() => {
        (props.useMediaQuery && setToggleSlideNav(false));
    },[props.useMediaQuery])

    return (
        <nav>
            <div className="h-24 pt-2 md:px-12 md:pt-0 bg-background2 md:flex md:justify-between md:items-center">
                <div className="text-center">
                    <Link href='/'>
                        <a>
                            <Image
                                src={logo}
                                alt='Shop purr logo'
                                width='64px'
                                height='64px'
                            />
                            <h1 className="font-indie text-accent text-5xl ml-2 inline-block md:grow">Shop purr</h1>
                        </a>
                    </Link>
                </div>
                {!props.useMediaQuery && <NavbarDesktopLinks cartItems={1} setToggleCart={() => props.setToggleCart()} />}
            </div>
            {props.useMediaQuery && <NavbarMobileLinks cartItems={1} toggleSlideNav={() => setToggleSlideNav(!toggleSlideNav)} toggleState={toggleSlideNav} setToggleCart={() => props.setToggleCart()}/>}
            <AnimatePresence exitBeforeEnter>
                {toggleSlideNav && <NavSlide />}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;