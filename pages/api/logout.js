import { signOut } from "firebase/auth";

export default function signout(auth) {
    signOut(auth).then(() => {
        console.log('sign out successful');
    }).catch((error) => {
        console.log(error);
        // An error happened.
    });
}