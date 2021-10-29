import React from 'react';
import './Login.css';
import googleLogo from '../../media/google.png'

const Login = () => {
    return (
        <div className="login-container">
            <div className="login">
            <button className="login-btn"><img src={googleLogo} className="google-logo w-0" alt="" />Signin with google</button>
            </div>
        </div>
    );
};

export default Login;