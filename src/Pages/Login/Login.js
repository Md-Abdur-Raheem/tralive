import React from 'react';
import './Login.css';
import googleLogo from '../../media/google.png'
import useAuth from '../../hooks/useAuth';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
    const { signInWithGoogle, setUser, setError, setLoading } = useAuth();

    const location = useLocation();
    const history = useHistory();
    const redirectURL = location?.state?.from?.pathname || "/";

    const googleSignIn = () => {
        signInWithGoogle()
        .then(result => {
            const user = result.user;
            setUser(user);
            history.push(redirectURL);
        })
        .catch(error => {
        setError(error.message)
        })
        .finally(() => setLoading(false))
    }




    return (
        <div className="login-container">
            <div className="login">
            <button onClick={googleSignIn} className="login-btn"><img src={googleLogo} className="google-logo w-0" alt="" />Signin with google</button>
            </div>
        </div>
    );
};

export default Login;