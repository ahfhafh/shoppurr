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
  const [cartSubtotal, setCartSubtotal] = useState(0);

  const addToCartHandler = (item) => {
    /* Check if the item is already in the cart. If it is, it will increase the quantity of the item
    in the cart. If it is not, it will add the item to the cart. */
    let exist = false;
    setCartItems(cartItems.map((e) => {
      if (e.id === item.id) {
        exist = true;
        /* If not enough in stock */
        if (e.numInCart >= e.Qty) {
          console.log('Not enough in stock');
          return e;
        }
        e.numInCart += 1;
        return e;
      } else { return e; }
    }));
    if (!exist) {
      item.numInCart = 1;
      setCartItems([...cartItems, item]);
    }
  };

  const removeCartItem = (i) => {
    setCartItems(cartItems.filter((e, index) => index !== i));
  };

  const incNumInCart = (i) => {
    setCartItems(cartItems.map((e, index) => {
      if (index === i) {
        (e.numInCart += 1);
        return e;
      } else { return e; }
    }));
  };

  const decNumInCart = (i) => {
    setCartItems(cartItems.map((e, index) => {
      if (index === i) {
        (e.numInCart -= 1);
        return e;
      } else { return e; }
    }));
  };

  /* Get cart from local storage */
  useEffect(() => {
    const cart_history = JSON.parse(localStorage.getItem('cart_id'));
    if (cart_history) setCartItems(cart_history);
    setCartItemsNum(cartItems.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Save cart to local storage */
  useEffect(() => {
    setCartItemsNum(cartItems.length);
    if (cartItems) localStorage.setItem('cart_id', JSON.stringify(cartItems));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  return (
    <>
      <div style={{ 'minHeight': 'calc(100vh - 200px)' }}>
        <Cart
          useMediaQuery={useMediaQuery(MOBILE_WINDOW)}
          cartState={toggleCart}
          toggleCart={() => setToggleCart(!toggleCart)}
          cartItems={cartItems}
          removeCartItem={(i) => removeCartItem(i)}
          incNumInCart={(i) => incNumInCart(i)}
          decNumInCart={(i) => decNumInCart(i)} />
        <Navbar
          useMediaQuery={useMediaQuery(MOBILE_WINDOW)}
          toggleCart={() => setToggleCart(!toggleCart)}
          cartItemsNum={cartItemsNum} />
        <Component {...pageProps} addToCart={(item) => addToCartHandler(item)} toggleCart={() => setToggleCart(true)} />
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
    // TODO: change scroll styling

    // TODO: redux?
    // TODO: context?