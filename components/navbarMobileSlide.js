import Link from 'next/link';
import { motion } from "framer-motion";

const NavSlide = () => {
    return (
        <motion.div className="bg-background2 w-10/12 left-1/2 -translate-x-1/2 h-0 fixed bottom-24" key="navSlide" animate={{ height: "auto"}} transition={{ duration: .2, type: "tween", ease: "easeOut" }} exit={{ height: 0 }} >
            <motion.ul className="text-center py-2 opacity-0" key="navSlideList" animate={{ opacity: 1 }} transition={{ duration: .1 }} exit={{ opacity: 0 }}>
                <li className="my-2">
                    <Link href='/login'>
                        <a className="text-xl">Login</a>
                    </Link>
                </li>
                <li className="my-2">
                    <Link href='/'>
                        <a className="text-xl">
                            Search
                        </a>
                    </Link>
                </li>
                <li className="my-2">
                    <Link href='/'>
                        <a className="text-xl">
                            Food
                        </a>
                    </Link>
                </li>
                <li className="my-2">
                    <Link href='/'>
                        <a className="text-xl">
                            Toys
                        </a>
                    </Link>
                </li>
                <li className="my-2">
                    <Link href='/'>
                        <a className="text-xl">
                            Clothing
                        </a>
                    </Link>
                </li>
            </motion.ul>
        </motion.div>
    );
}

export default NavSlide