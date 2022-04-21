import Link from "next/link";
import Image from "next/image";
import logo from "../public/images/logo-dark.svg"
import { useEffect, useState, useCallback } from "react";
import NavbarDesktopLinks from "./navbarDesktopLinks";
import NavbarMobileLinks from "./navbarMobileLinks";


const Navbar = (props) => {

    const MOBILE_WINDOW = 768;

    const useMediaQuery = (width) => {
        const [targetReached, setTargetReached] = useState(false);

        const updateTarget = useCallback((e) => {
            if (e.matches) {
                setTargetReached(true);
            } else {
                setTargetReached(false);
            }
        }, []);

        useEffect(() => {
            const media = window.matchMedia(`(max-width: ${width}px)`)
            media.addEventListener('change', e => updateTarget(e))

            // Check on mount (callback is not called until a change occurs)
            if (media.matches) {
                setTargetReached(true)
            }

            return () => media.removeEventListener('change', e => updateTarget(e))
        }, [])

        return targetReached;
    };

    return (
        <nav>
            <div className="h-24 pt-2 md:px-12 md:pt-0 bg-background md:flex md:justify-between md:items-center">
                <div className="text-center">
                    <Image
                        src={logo}
                        alt='logo'
                        width='64px'
                        height='64px'
                    />
                    <h1 className="font-indie text-accent text-5xl ml-2 inline-block md:grow">Shop purr</h1>
                </div>
                {!useMediaQuery(MOBILE_WINDOW) && <NavbarDesktopLinks cartItems={1} />}
            </div>
            {useMediaQuery(MOBILE_WINDOW) && <NavbarMobileLinks cartItems={1} />}
        </nav>
    );
}

export default Navbar;