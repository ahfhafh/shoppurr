import '../styles/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Navbar from '../components/navbar'
import { useEffect, useState, useCallback } from "react";
import Cart from '../components/cart';
import Footer from '../components/footer';
config.autoAddCss = false

function MyApp({ Component, pageProps }) {
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
    }, [width, updateTarget])

    return targetReached;
  };

  const [toggleCart, setToggleCart] = useState(false);

  return (
    <>
      <div style={{ 'minHeight': 'calc(100vh - 200px)' }}>
        <Cart useMediaQuery={useMediaQuery(MOBILE_WINDOW)} toggleCart={toggleCart} />
        <Navbar useMediaQuery={useMediaQuery(MOBILE_WINDOW)} setToggleCart={() => setToggleCart(!toggleCart)} />
        <Component {...pageProps} />
      </div>
      <Footer />
    </>

  )
}

export default MyApp


    // TODO: navbar: close slide after clicking link
    // TODO: navbar: box shadow
    // TODO: navbar: mobile slide remove cart btn when empty
    // IMPLEMENT: navbar: show/hide on scroll