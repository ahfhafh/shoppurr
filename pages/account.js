import firebase from "../firebase/app";
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import signout from "./api/logout";
import { useEffect, useState } from "react";
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
        ],
    };

    const [toggleSignin_Signup, setToggleSignin_Signup] = useState(true);

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
                    <h1 className="text-center font-indie text-4xl mt-8 mb-4">{toggleSignin_Signup ? 'LOGIN' : 'SIGN UP'}</h1>

                    <button className={`border-b-2 border-solid border-b-${toggleSignin_Signup ? 'text' : 'background'} w-1/2 text-center`} onClick={() => setToggleSignin_Signup(!toggleSignin_Signup)} disabled={toggleSignin_Signup}>Log in</button>
                    <button className={`border-b-2 border-solid border-b-${toggleSignin_Signup ? 'background' : 'text'} w-1/2 text-center mb-4`} onClick={() => setToggleSignin_Signup(!toggleSignin_Signup)} disabled={!toggleSignin_Signup}>Sign up</button>

                    {toggleSignin_Signup
                        ? <div>
                            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                            <p className="text-center font-indie text-lg">or</p>
                            <form>
                                <input type={'email'} className="block mx-auto mt-4 w-56 py-1 px-2 border-b focus:outline-none focus:invalid:border-red-500 invalid:text-red-600 focus:border-b-green-600" placeholder="email" required></input>
                                <input type={'password'} className="block mx-auto mt-4 w-56 py-1 px-2 border-b focus:outline-none focus:invalid:border-red-500 invalid:text-red-600 focus:border-b-green-600" placeholder="password" required minLength={6} maxLength={2000000}></input>
                                <input type={'submit'} className="block mx-auto mt-8 bg-accent text-background2 py-4 px-16 rounded-sm" value={'Sign In'}></input>
                            </form>
                            <a role={'button'} className="ml-8" onClick={signout}>Signout</a>
                        </div>
                        : <div>
                            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                            <p className="text-center font-indie text-lg">or</p>
                            <form>
                                <input className="block mx-auto mt-4 w-56 py-1 px-2 border-b border-solid border-b-background focus:outline-none focus:border-b-text" placeholder="email" required></input>
                                <input className="block mx-auto mt-4 w-56 py-1 px-2 border-b border-solid border-b-background focus:outline-none focus:border-b-text" placeholder="password" required></input>
                                <input type={'submit'} className="block mx-auto mt-8 bg-accent text-background2 py-4 px-16 rounded-sm" value={'Create account'}></input>
                            </form>
                        </div>}
                </div>}
        </>

    );
}

// TODO: loading animations
// TODO: switching between login logout animation

export default Account;