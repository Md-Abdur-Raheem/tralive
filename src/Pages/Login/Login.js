import React from 'react';
import './Login.css';
import googleLogo from '../../media/google.png'
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const { signInWithGoogle } = useAuth();
    return (
        <div className="login-container">
            <div className="login">
            <button onClick={signInWithGoogle} className="login-btn"><img src={googleLogo} className="google-logo w-0" alt="" />Signin with google</button>
            </div>
        </div>
    );
};

export default Login;