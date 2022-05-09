import firebaseApp from "../firebase/app";
import { useAuthState } from 'react-firebase-hooks/auth';
import signout from "./api/logout";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import GoogleLogo from '../public/images/Google__G__Logo.svg';
import FacebookLogo from '../public/images/Facebook_icon_2013.svg';
import MailIcon from '../public/images/Email_icon.svg';
import Loader from '/public/images/loader.svg';
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Account = () => {

    const auth = getAuth(firebaseApp);
    const GoogleProvider = new GoogleAuthProvider();
    const FacebookProvider = new FacebookAuthProvider();

    function googleAuth() {
        signInWithPopup(auth, GoogleProvider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
        }).catch((error) => {
            // Handle Errors here.
            console.log('errorCode: ' + error.code + ' errorMessage: ' + error.message);
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    function FacebookAuth() {
        signInWithPopup(auth, FacebookProvider).then((result) => {
            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
        }).catch((error) => {
            // Handle Errors here.
            console.log('errorCode: ' + error.code + ' errorMessage: ' + error.message);
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
        });
    }

    function checkEmailExists(email) {
        fetchSignInMethodsForEmail(auth, email).then((result) => {
            if (result.length === 0) {
                setUserExists(false);
            } else {
                setUserExists(true);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    function passwordAuthSignup(email, password) {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed in
            const user = userCredential.user;
        }).catch((error) => {
            console.log('errorCode: ' + error.code + ' errorMessage: ' + error.message);
            switch (error.code) {
                case 'auth/email-already-exists':
                    setEmailMessage('Email already exists');
                    break;
                case 'auth/user-not-found':
                    setEmailMessage('User not found');
                    break;
                case 'auth/weak-password':
                    setEmailMessage('Password too weak. Should be at least 6 characters long');
                    break;
                default:
                    setEmailMessage('Errorrrrrr');
                    break;
            }
        });
    }

    function passwordAuthSignin(email, password) {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed in
            const user = userCredential.user;
        }).catch((error) => {
            console.log('errorCode: ' + error.code + ' errorMessage: ' + error.message);
            switch (error.code) {
                case 'auth/user-not-found':
                    setEmailMessage('User not found');
                    break;
                case 'auth/wrong-password':
                    setEmailMessage('Wrong password');
                    break;
                case 'auth/too-many-requests':
                    setEmailMessage('Too many requests. Try again later.');
                    break;
                case 'auth/user-disabled':
                    setEmailMessage('Ha uve been disabled. Get outta here');
                    break;
                default:
                    setEmailMessage('Errorrrrrr');
                    break;
            }
        });
    }

    const [emailOpen, setEmailOpen] = useState(false);
    const [userExists, setUserExists] = useState();
    const [passwordStep, setPasswordStep] = useState(false);
    const [emailMessage, setEmailMessage] = useState();

    const [user, loading, error] = useAuthState(auth);

    function checkEmailHandler(e) {
        e.preventDefault();
        const email = e.target.elements.email.value;

        if (passwordStep) {
            const password = e.target.elements.password.value;
            if (userExists) passwordAuthSignin(email, password);
            else passwordAuthSignup(email, password);
        } else {
            checkEmailExists(email);
        }
        setPasswordStep(true);
    }

    useEffect(() => {
        if (!passwordStep || !emailOpen) setEmailMessage();
        if (emailOpen) emailInputRef.current.focus();
    }, [passwordStep, emailOpen]);

    useEffect(() => {
        setEmailOpen(false);
    }, [user]);

    const emailInputRef = useRef();

    if (loading) {
        return (
            <Loader className='absolute top-1/2 bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
        );
    }

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <>
            {user
                ? <div className="flex flex-col items-center"><a role={'button'} className="mt-8 py-2 px-10 text-background bg-accent2" onClick={() => signout(auth)}>Sign out</a>
                    {user.displayName}
                </div>

                : <motion.div className="px-4 py-4 mb-16 max-w-xs mx-auto mt-[10vh] bg-background2" layout animate={{ height: 'auto' }}>
                    <motion.h1 className="text-center font-indie text-4xl mt-8 mb-24 block" layout>LOGIN</motion.h1>
                    <div className='mb-8 flex flex-col items-center'>
                        <motion.button className="w-72 py-2 px-4 border shadow-md relative h-11" onClick={googleAuth} layout>
                            <GoogleLogo className='inline-block align-text-top absolute left-4' />
                            <p className="text-base inline-block ml-8 mr-4">Continue with Google</p>
                        </motion.button>
                        <br />
                        <motion.button className="w-72 py-2 px-4 border shadow-md relative bg-[#4267B2] h-11" onClick={FacebookAuth} layout>
                            <FacebookLogo className='inline-block align-text-top absolute left-4' />
                            <p className="text-base text-white inline-block ml-8 mr-4">Continue with Facebook</p>
                        </motion.button>
                        <br />
                        <AnimatePresence>
                            <motion.div className="w-72 border shadow-md relative bg-red-700" layout animate={{ height: 'auto' }}>
                                <motion.button layout className="w-full h-11" onClick={() => { setEmailOpen(!emailOpen); }}>
                                    <MailIcon className='inline-block align-text-top absolute left-4 top-2' />
                                    <p className="text-base text-white inline-block ml-8 mr-4 top-2">Continue with Email</p>
                                </motion.button>
                                {emailOpen &&
                                    <motion.form className="mx-auto w-min my-4" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} onSubmit={(e) => checkEmailHandler(e)}>
                                        <motion.input className="py-1 px-2 my-1 rounded-sm" layout name="email" type={'email'} placeholder={'Email'} required ref={emailInputRef}></motion.input>
                                        {passwordStep && <motion.input className="py-1 px-2 my-1 rounded-sm" layout name="password" type={'password'} placeholder={'Password'} required></motion.input>}
                                        {(passwordStep && emailMessage) && <p className="text-lg font-semibold text-red-600 bg-red-300 rounded-sm px-2">{emailMessage}</p>}
                                        <div>
                                            {passwordStep && <motion.button className="mt-8 mb-4 mr-4 ml-4 py-2 text-white" layout onClick={() => setPasswordStep(false)}>cancel</motion.button>}
                                            <motion.button className="mt-8 float-right mb-4 text-white bg-black rounded-sm py-2 px-4" layout type="submit">{(passwordStep) ? (userExists ? 'SIGN IN' : 'SIGN UP') : 'NEXT'}</motion.button>
                                        </div>
                                    </motion.form>}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            }
        </>

    );
};

export default Account;