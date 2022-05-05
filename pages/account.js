import firebaseApp from "../firebase/app";
import { useAuthState } from 'react-firebase-hooks/auth';
import signout from "./api/logout";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleLogo from '../public/images/Google__G__Logo.svg';
import FacebookLogo from '../public/images/Facebook_icon_2013.svg';
import MailIcon from '../public/images/Email_icon.svg';

const Account = () => {

    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    function googleAuth() {
        signInWithPopup(auth, provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return (
            <div>
                <p>Initialising User...</p>
            </div>
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
                ? <div className="flex flex-col items-center"><a role={'button'} className="mt-8 py-2 px-10 text-background bg-accent2" onClick={() => signout(auth)}>Sign out</a></div>

                : <div className="px-4 py-4 max-w-xs mx-auto mt-[10vh] bg-background2">
                    <h1 className="text-center font-indie text-4xl mt-8 mb-24">LOGIN</h1>
                    <div className='mb-8 flex flex-col items-center'>
                        <button className="w-72 py-2 px-4 border shadow-md relative" onClick={googleAuth}>
                            <GoogleLogo className='inline-block align-text-top absolute left-4' />
                            <p className="text-base inline-block ml-8 mr-4">Continue with Google</p>
                        </button>
                        <br />
                        <button className="w-72 py-2 px-4 border shadow-md relative bg-[#4267B2]">
                            <FacebookLogo className='inline-block align-text-top absolute left-4' />
                            <p className="text-base text-white inline-block ml-8 mr-4">Continue with Facebook</p>
                        </button>
                        <br />
                        <button className="w-72 py-2 px-4 border shadow-md relative bg-red-700">
                            <MailIcon className='inline-block align-text-top absolute left-4' />
                            <p className="text-base text-white inline-block ml-8 mr-4">Continue with Email</p>
                        </button>
                    </div>
                </div>}
        </>

    );
};

// TODO: loading animations

export default Account;