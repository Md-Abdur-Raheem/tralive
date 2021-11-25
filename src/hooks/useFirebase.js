import { useEffect, useState } from "react"
import initAuthentication from "../firebase/firebase.init";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

initAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [AlertModalShow, setAlertModalShow] = useState(false);
    const auth = getAuth();

    const signInWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
       return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        // const confirmation = window.confirm('Are you sure you want to logout?')
        // if (confirmation) {
            setLoading(true);
            signOut(auth)
                .then(() => {
                    setUser([]);
                    setAlertModalShow(true);
                })
                .catch((error) => {
                    setError(error.message);
                })
                .finally(() => setLoading(false))
        // }
        // else {
        //     return;
        // }
        
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
            }
            else {
                setUser({})
            }
            setLoading(false)
        });
        return unsubscribe;
    }, [auth]);

    return {user, error, loading, AlertModalShow, setUser, setError, setLoading, signInWithGoogle, logOut,setAlertModalShow}
}

export default useFirebase;