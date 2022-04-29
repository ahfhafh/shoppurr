import firebase from "../firebase/app";
import { useAuthState } from 'react-firebase-hooks/auth';
import signout from "./api/logout";
import { useState } from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const Account = (props) => {

    const auth = firebase.auth();
    const [user, loading, error] = useAuthState(auth);

    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
    };

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
                    <StyledFirebaseAuth className='mb-8' uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </div>}
        </>

    );
}

// TODO: loading animations
// TODO: switching between login logout animation

export default Account;