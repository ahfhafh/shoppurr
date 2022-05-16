import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import CartIcon from '../public/images/cart-shopping.svg';

const NavbarMobileMenu = (props) => {
    const [hideCartBtn, setHideCartBtn] = useState(false);

    useEffect(() => {
        if (props.toggleState === false) setHideCartBtn(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.toggleState]);

    const cartBtnVariants = {
        open: {
            transition: {
                duration: 0.25,
            },
        },
        closed: {
            width: 0,
            padding: 0,
            transition: {
                duration: 0.25,
            },
        },
    };

    const cartBtnIconVariants = {
        open: {
            transition: {
                duration: 0.15,
            },
            transitionEnd: { display: "block" },
        },
        closed: {
            opacity: 0,
            transition: {
                duration: 0.15,
            },
            transitionEnd: { display: "none" },
        },
    };

    return (
        <div className="flex w-10/12 left-1/2 -translate-x-1/2 h-16 fixed bottom-8 overflow-x-hidden">
            <button className="grow bg-accent text-background2 font-indie text-3xl" onClick={() => { props.toggleSlideNav(); setHideCartBtn(!hideCartBtn); }}>
                {props.toggleState ? 'X' : 'MENU'}
            </button>
                {props.cartItems > 0 &&
                    <motion.button
                        className={`w-16 bg-accent2`}
                        key="cartBtn"
                        variants={cartBtnVariants}
                        animate={!hideCartBtn ? 'open' : 'closed'}
                        onClick={() => props.toggleCart()}
                    >
                        <motion.span
                            className={`fa-layers fa-lg mb-3 ml-3`}
                            key="cartBtnIcon"
                            variants={cartBtnIconVariants}
                            animate={!hideCartBtn ? 'open' : 'closed'}
                        >
                            <CartIcon className="fill-accent" />
                            {props.cartItems > 0 &&
                                <span className="fa-layers-counter text-5xl" style={{ '--fa-counter-background-color': 'black', '--fa-right': '-25px', '--fa-top': '-5px' }}>{props.cartItems}</span>
                            }
                        </motion.span>
                    </motion.button>
                }
        </div>
    );
};

export default NavbarMobileMenu;