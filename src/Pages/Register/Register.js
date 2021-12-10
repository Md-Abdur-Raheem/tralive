import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useHistory, useLocation } from 'react-router';
import loginBg from '../../media/login.jpg';
import { useForm } from "react-hook-form";
import { NavLink } from 'react-router-dom';

const Register = () => {
    const { signInWithGoogle, setError, registerUser, error } = useAuth();
    const location = useLocation();
    const history = useHistory();

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const { name, email, password, password2 } = data;
        if (password !== password2) {
            setError('Password did not match.');
            return;
        } else {
            setError('');
            registerUser(name, email, password, location, history);
        }
        
    };

    return (
        <div className="login-container">
            <img className="login-bg" src={loginBg} alt="" />
            <div className="login-form">
                <div className="login">
                    <h2><strong>REGISTER</strong></h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <input className="input-field" placeholder="Type your full name" type="text" {...register("name", {required: true})} />
                        <br />
                        <input className="input-field" placeholder="Type your email" type="email" {...register("email", {required: true})} />
                        <br />
                        <input className="input-field" placeholder="Type your password" type="password" {...register("password", { required: true })} />
                        <br />
                        <input className="input-field" placeholder="Re enter your password" type="password" {...register("password2", { required: true })} />
                        <br />
                        {errors.exampleRequired && <span style={{color: "red"}}>This field is required</span>}
                        {error && <span style={{color: "red"}}>{error}</span>}
                        <br />
                        
                        <input className="hero-btn login-btn" type="submit" value="Register" />
                    </form>

                    <p style={{color:"black"}}><strong>Already have an account? <NavLink to="/login">Login</NavLink></strong></p>

                    <p><strong>------------or--------------</strong></p>
                    <br />

                    <button onClick={handleGoogleSignIn} className="google-login-btn">
                        <a href="https://icons8.com/icon/V5cGWnc9R4xj/google">
                            <img src="https://img.icons8.com/fluency/24/000000/google-logo.png" alt="" />
                        </a> Sign up with google
                    </button>

                    <br /><br />

                    <button onClick={handleGoogleSignIn} className="facebook-login-btn">
                    <a href="https://icons8.com/icon/118497/facebook">
                        <img src="https://img.icons8.com/color/24/000000/facebook-new.png" alt=""/>
                        </a> Sign up with facebook
                    </button>
                </div>
            
            </div>
        </div>
    );
};

export default Register;