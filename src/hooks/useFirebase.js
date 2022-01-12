import { useEffect, useState } from "react"
import initAuthentication from "../firebase/firebase.init";
import {
    getAuth, signInWithPopup, GoogleAuthProvider,
    onAuthStateChanged, signOut, createUserWithEmailAndPassword,
    updateProfile, signInWithEmailAndPassword, sendPasswordResetEmail,
    sendEmailVerification, FacebookAuthProvider
} from "firebase/auth";

initAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const auth = getAuth();


    const registerUser = (name, email, password, location, navigate ) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateUserProfile(name);
                const userProfile = userCredential.user;

                setUser(user);
                saveUserToDb(name, userProfile, 'POST');

                // const redirectURL = location?.state?.from?.pathname || "/";
                // navigate(redirectURL);

                sendVerificationEmail(userCredential.user, navigate);


            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
        })
    }

    const updateUserProfile = name => {
        updateProfile(auth.currentUser, {
            displayName: name
          }).then(() => {
              
          }).catch((error) => {
            setError(error.message)
          })
    }


    const logInUser = (email, password, location, navigate) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const redirectURL = location?.state?.from?.pathname || "/";

                setUser(user);
                navigate(redirectURL);
                
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
                
        })
    }

    const sendVerificationEmail = (currentUser, navigate) => {
        sendEmailVerification(currentUser)
            .then(() => {
                setLoading(false);
                navigate("/emailVerification");
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
        })
    }

    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                
            })
            .catch((error) => {
                setError(error.message);
        });
    }

    const signInWithGoogle = (location, navigate) => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
        .then(result => {
            const user = result.user;

            const redirectURL = location?.state?.from?.pathname || "/";
            navigate(redirectURL);

            setUser(user);
            saveUserToDb(user.displayName, user, 'PUT');
        })
        .catch(error => {
            setError(error.message);
        })
        .finally(() => setLoading(false))
    }

    const signInWithFacebook = (location, navigate) => {
        const facebookProvider = new FacebookAuthProvider();
        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                const user = result.user;

                const redirectURL = location?.state?.from?.pathname || "/";
                navigate(redirectURL);

                setUser(user);
                saveUserToDb(user.displayName, user, 'PUT');
            })
            .catch((error) => {
                setError(error.message);

            })
            .finally(() => setLoading(false));
        

    }

    const logOut = () => {
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

    useEffect(() => {
        setLoading(true);
        if (user.email) {
            const email = user.email;
            fetch(`https://gruesome-village-05256.herokuapp.com/checkAdmin/${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.admin) {
                        setAdmin(true);
                        setLoading(false);
                    }
                    else {
                        setAdmin(false);
                        setLoading(false);
                    }
                })
        }
    }, [user.email]);

    useEffect(() => {
        setLoading(true);
        if (user.email) {
            const email = user.email;
            //console.log(user);
            // console.log(email);
            if (user.emailVerified) {
                setEmailVerified(true);
            }
            else {
                setEmailVerified(false);
            }

            fetch(`https://gruesome-village-05256.herokuapp.com/emailVerified/${email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);

                    if (!data.emailVerified && user.emailVerified) {
                        updateUserToDb(email);
                    }
                    else if (data.emailVerified && user.emailVerified) {
                        setEmailVerified(true);
                    }
                    else if (!data.emailVerified && !user.emailVerified) {
                        setEmailVerified(false);
                    }
            })

        }
    },[user.email, user])


    const saveUserToDb = (name, userProp, method) => {
        const newUser = {
            Id: userProp.uid,
            Name: name,
            Email: userProp.email,
            Email_Verified: userProp.emailVerified
        };

        fetch('https://gruesome-village-05256.herokuapp.com/users', {
            method: method,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => data)
    }

    const updateUserToDb = email => {
        fetch(`https://gruesome-village-05256.herokuapp.com/emailVerified/${email}`, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ Email_Verified: true })
        })
            .then(res => res.json())
            .then(data => data)
    }

    return {
        user, error, loading, admin, emailVerified,
        setUser, setError, setLoading, signInWithGoogle,
        signInWithFacebook, logOut, registerUser, logInUser,
        resetPassword
    }
}

export default useFirebase;