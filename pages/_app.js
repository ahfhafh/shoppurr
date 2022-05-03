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

  const addToCartHandler = (item) => {
    // TODO: check if item already exists in cart
    item.numInCart = 1;
    setCartItems([...cartItems, item]);
  };

  const removeCartItem = (i) => {
    setCartItems(cartItems.filter((e, index) => index !== i));
  };

  const incNumInCart = (i) => {
    setCartItems(cartItems.map((e, index) => {
      if (index === i) {
        (e.numInCart += 1);
        return e;
      } else {return e;}
    }));
  };

  const decNumInCart = (i) => {
    setCartItems(cartItems.map((e, index) => {
      if (index === i) {
        (e.numInCart -= 1);
        return e;
      } else {return e;}
    }));
  };

  /* Save cart to local storage */
  useEffect(() => {
    setCartItemsNum(cartItems.length);
    if (cartItems.length > 0) localStorage.setItem('cart_id', JSON.stringify(cartItems));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  /* Get cart from local storage */
  useEffect(() => {
    const cart_history = JSON.parse(localStorage.getItem('cart_id'));
    if (cart_history.length > 0) setCartItems(cart_history);
    setCartItemsNum(cartItems.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{ 'minHeight': 'calc(100vh - 200px)' }}>
        <Cart
          useMediaQuery={useMediaQuery(MOBILE_WINDOW)}
          toggleCart={toggleCart}
          setToggleCart={() => setToggleCart(!toggleCart)}
          cartItems={cartItems}
          removeCartItem={(i) => removeCartItem(i)}
          incNumInCart={(i) => incNumInCart(i)}
          decNumInCart={(i) => decNumInCart(i)} />
        <Navbar
          useMediaQuery={useMediaQuery(MOBILE_WINDOW)}
          setToggleCart={() => setToggleCart(!toggleCart)}
          cartItemsNum={cartItemsNum} />
        <Component {...pageProps} addToCart={(item) => addToCartHandler(item)} />
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

    // TODO: redux?
    // TODO: context?