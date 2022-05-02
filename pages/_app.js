import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useEffect, useState, useCallback } from "react";
import Navbar from '../components/navbar';
import Cart from '../components/cart';
import Footer from '../components/footer';
config.autoAddCss = false;

const MOBILE_WINDOW = 768;

function MyApp({ Component, pageProps }) {

  /**
   * Determines whether the current viewport width is Mobile or not.
   * @param width - The width in pixels to check against.
   * @returns A boolean value that is true if the window width is less than the width passed in.
   */
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
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addEventListener('change', e => updateTarget(e));

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeEventListener('change', e => updateTarget(e));
    }, [width, updateTarget]);

    return targetReached;
  };

  const [toggleCart, setToggleCart] = useState(false);

  /* Prevent the user from scrolling when the cart is open. */
  useEffect(() => {
    if (toggleCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggleCart]);

  const [cartItems, setCartItems] = useState([]);
  const [cartItemsNum, setCartItemsNum] = useState();

  useEffect(() => {
    setCartItemsNum(cartItems.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  return (
    <>
      <div style={{ 'minHeight': 'calc(100vh - 200px)' }}>
        <Cart useMediaQuery={useMediaQuery(MOBILE_WINDOW)} toggleCart={toggleCart} setToggleCart={() => setToggleCart(!toggleCart)} cartItems={cartItems} />
        <Navbar useMediaQuery={useMediaQuery(MOBILE_WINDOW)} setToggleCart={() => setToggleCart(!toggleCart)} cartItemsNum={cartItemsNum} />
        <Component {...pageProps} addToCart={(item) => setCartItems([...cartItems, item])} />
      </div>
      <Footer />
    </>

  );
}

export default MyApp;


    // TODO: navbar: close slide after clicking link
    // TODO: navbar: box shadow
    // TODO: navbar: mobile slide remove cart btn when empty
    // IMPLEMENT: navbar: show/hide on scroll
    // IMPLEMENT: second font