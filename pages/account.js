import firebase from "../firebase/app";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import signout from "./api/logout";
import { useEffect } from "react";

import 'firebaseui/dist/firebaseui.css'

const Account = (props) => {

    const auth = getAuth(firebase);
    const [user, loading, error] = useAuthState(auth);

    var uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
    };

    useEffect(() => {
        async function initFirebaseUI() {
            // delay the import until window object is ready
            const firebaseui = await import("firebaseui");
            const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
            if (!user) {
                ui.start('#firebaseui-auth-container', uiConfig);
            }
        }
        initFirebaseUI();
    });

    if (loading) {
        return (
            <div>
                <p>Initialising User...</p>
                <div className="hidden" id="firebaseui-auth-container"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
                <div className="hidden" id="firebaseui-auth-container"></div>
            </div>
        );
    }

    return (
        <>
            {user
                ? <div className="flex flex-col items-center"><a role={'button'} className="mt-8 py-2 px-10 text-background bg-accent2" onClick={() => signout(auth)}>Sign out</a></div>

                : <div className="px-4 py-4 max-w-xs mx-auto mt-[10vh] bg-background2">
                    <h1 className="text-center font-indie text-4xl mt-8 mb-24">LOGIN</h1>
                    <div id="firebaseui-auth-container"></div>
                </div>}
        </>

    );
}

// TODO: loading animations
// TODO: switching between login logout animation

export default Account;