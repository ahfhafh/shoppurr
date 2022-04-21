import { motion } from "framer-motion";
import Link from 'next/link';

const NavSlide = (props) => {
    return (
        <motion.div className="border-solid border-2 border-text w-10/12 ml-9 fixed bottom-24">
            <ul className="text-center py-2">
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
            </ul>

        </motion.div>
    );
}

export default NavSlide