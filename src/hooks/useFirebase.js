import { useEffect, useState } from "react"
import initAuthentication from "../firebase/firebase.init";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

initAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    const signInWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                setUser(user);
            })
            .catch(error => {
            setError(error.message)
            })
            .finally(() => setLoading(false))
    }

    const logOut = () => {
        const confirmation = window.confirm('Are you sure you want to logout?')
        if (confirmation) {
            setLoading(true);
            signOut(auth)
                .then(() => {
                    setUser([]);
                })
                .catch((error) => {
                    setError(error.message);
                })
                .finally(() => setLoading(false))
        }
        else {
            return;
        }
        
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            }
            else {
                setUser({});
            }
            setLoading(false);
        })
    }, []);

    return {user, error, loading, setUser, setError, setLoading, signInWithGoogle, logOut}
}

export default useFirebase;