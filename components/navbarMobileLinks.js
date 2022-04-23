
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useState } from 'react';

const NavbarMobileLinks = (props) => {
    const [hideCartBtn, setHideCartBtn] = useState(false);

    const cartBtnVariants = {
        open: {
            transition: {
                duration: 0.25
            }
        },
        closed: {
            width: 0,
            padding: 0,
            transition: {
                duration: 0.25
            }
        }
    }

    const cartBtnIconVariants = {
        open: {
            transition: {
                duration: 0.15
            },
            transitionEnd: { display: "block" }
        },
        closed: {
            opacity: 0,
            transition: {
                duration: 0.15
            },
            transitionEnd: { display: "none" }
        }
    }

    return (
        <div className="flex w-10/12 left-1/2 -translate-x-1/2 h-16 fixed bottom-8">
            <button className="grow bg-accent text-background2 font-indie text-3xl" onClick={() => { props.toggleSlideNav(); setHideCartBtn(!hideCartBtn) }}>{props.toggleState ? <>X</> : 'MENU'}</button>
            <motion.button 
                className={`w-16 pl-4 bg-accent2`} 
                key="cartBtn" 
                variants={cartBtnVariants} 
                animate={!hideCartBtn ? 'open' : 'closed'} 
                onClick={() => props.setToggleCart()}
            >
                <motion.span 
                    className={`fa-layers fa-fw fa-lg mt-1`} 
                    key="cartBtnIcon" 
                    variants={cartBtnIconVariants} 
                    animate={!hideCartBtn ? 'open' : 'closed'}
                >
                    <FontAwesomeIcon icon={faCartShopping} className="text-2xl text-accent" />
                    {props.cartItems > 0 && <span className="fa-layers-counter text-4xl" style={{ '--fa-counter-background-color': 'black', '--fa-right': '-10px', '--fa-top': '-10px' }}>{props.cartItems}</span>}
                </motion.span>
            </motion.button>
        </div>
    );
}

export default NavbarMobileLinks;