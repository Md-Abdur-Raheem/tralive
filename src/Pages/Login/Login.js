import React from 'react';
import './Login.css';
import useAuth from '../../hooks/useAuth';
import { useHistory, useLocation } from 'react-router';
import loginBg from '../../media/login.jpg';
import { useForm } from "react-hook-form";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import AlertModal from '../Shared/AlertModal/AlertModal'

const Login = () => {
    const { signInWithGoogle, logInUser, resetPassword } = useAuth();
    const [AlertModalShow, setAlertModalShow] = useState(false);
    const [AlertModalShow2, setAlertModalShow2] = useState(false);

    const location = useLocation();
    const history = useHistory();

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const { email, password } = data;
        logInUser(email, password, location, history)
    };

    const forgotPasssword = () => {
        const email = document.getElementById("email").value;
        if (email) {
            resetPassword(email);
            setAlertModalShow2(true);
        } else {
            setAlertModalShow(true);
        }
    }

    return (
        <div className="login-container">
            <img className="login-bg" src={loginBg} alt="" />
            <div className="login-form">
                <div className="login">
                    <h2><strong>LOGIN</strong></h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <input id="email" className="input-field" placeholder="Email" type="email" {...register("email", {required: true})} />
                        <br />
                        <input className="input-field" placeholder="Password" type="password" {...register("password", { required: true })} />
                        <br />
                        {errors.exampleRequired && <span>This field is required</span>}
                        <br />
                        
                        <input className="hero-btn login-btn" type="submit" value="Login" />
                    </form>

                    <button onClick={forgotPasssword} style={{ backgroundColor: "transparent", border: "none", color:"red" }}><strong>Forgot Password?</strong></button>
                    <br /><br />
                    <p style={{color:"black"}}><strong>New to tralive? <NavLink to="/register">Register</NavLink></strong></p>

                    <p><strong>------------or--------------</strong></p>
                    <br />

                    <button onClick={handleGoogleSignIn} className="google-login-btn">
                        <a href="https://icons8.com/icon/V5cGWnc9R4xj/google">
                            <img src="https://img.icons8.com/fluency/24/000000/google-logo.png" alt="" />
                        </a> Sign in with google
                    </button>

                    <br /><br />

                    <button onClick={handleGoogleSignIn} className="facebook-login-btn">
                    <a href="https://icons8.com/icon/118497/facebook">
                        <img src="https://img.icons8.com/color/24/000000/facebook-new.png" alt=""/>
                        </a> Sign in with facebook
                    </button>
                </div>
            
            </div>
            <AlertModal show={AlertModalShow} onHide={() => setAlertModalShow(false)} variant="danger">Please type your email address</AlertModal>
            <AlertModal show={AlertModalShow2} onHide={() => setAlertModalShow2(false)} variant="success">A password reset email have been sent to your email address.</AlertModal>
        </div>
    );
};

export default Login;