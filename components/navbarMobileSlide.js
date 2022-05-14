import Link from 'next/link';
import { motion } from "framer-motion";

const NavSlide = (props) => {
    return (
        <motion.div
            className="bg-accent w-10/12 left-1/2 -translate-x-1/2 h-0 fixed bottom-[95px]"
            key="navSlide" animate={{ height: "auto" }}
            transition={{ duration: 0.2, type: "tween", ease: "easeOut" }}
            exit={{ height: 0 }}
        >
            <motion.ul
                className="text-background2 text-center py-2 opacity-0"
                key="navSlideList"
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                exit={{ opacity: 0 }}
            >
                <li className="my-2">
                    <Link href='/account'>
                        <a className="text-xl">Login</a>
                    </Link>
                </li>
                <li className="my-2">
                    <a className="text-xl" onClick={() => props.toggleSearch()} >
                        Search
                    </a>
                </li>
                <li className="my-2">
                    <Link href='/Foods'>
                        <a className="text-xl">
                            Food
                        </a>
                    </Link>
                </li>
                <li className="my-2">
                    <Link href='/Toys'>
                        <a className="text-xl">
                            Toys
                        </a>
                    </Link>
                </li>
                <li className="my-2">
                    <Link href='/Clothing'>
                        <a className="text-xl">
                            Clothing
                        </a>
                    </Link>
                </li>
            </motion.ul>
        </motion.div>
    );
};

export default NavSlide;
