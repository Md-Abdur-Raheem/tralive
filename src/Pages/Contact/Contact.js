import React from 'react';
import { Container } from 'react-bootstrap';
import './Contact.css';
import emailjs from 'emailjs-com';
import { useState } from 'react';

const Contact = () => {
    const [error, setError] = useState('');

    const sendEmail = e => {
        e.preventDefault();
        emailjs.sendForm( process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, e.target, process.env.REACT_APP_USER_ID )
            .then((result) => {
                console.log(result.text);
                e.target.reset();
                alert("Email has been sent successfully");
            }, (error) => {
                setError(error.text);
            });
        
        
    }

    return (
        <Container className="mx-auto">
            <div className="contact-container container mb-5"><h1 style={{color:"#00095e"}} className="banner-title text-start fw-bold fs-1">Contact Us</h1></div>
            <div className="row mb-5 mx-auto">
                <div className="col-md-4">
                    <h1 className="cont-title text-start">Contact Our Office <br /> for Inforamtion</h1>
                    <div className="d-flex align-items-center my-5">
                        <i className="cont-icon fas fa-map-marker-alt me-3"/>
                        <div className="text-start">
                        <h4>Address</h4>
                        <p>205/3, Tazlane, Mirpur,<br /> Dhaka-1216</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center my-5">
                        <i className="cont-icon fas fa-phone-alt me-3"/>
                        <div className="text-start">
                        <h4>+880 179 7176 635</h4>
                        <p>Call Us Now!</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center my-5">
                        <i className="cont-icon fas fa-envelope me-3"></i>
                        <div className="text-start">
                        <p>Do you have a Question?</p>
                        <h4>md.raheem2450@gmail.com</h4>
                        </div>
                    </div>
                </div>

                <form onSubmit={sendEmail} className="col-md-8 text-start">
                    <h1 className="mb-5" style={{color:"#00095e", fontFamily: "Josefin Sans"}} >Do Not Use This Form <br /> To Communicate Personal Data.</h1>
                    <div>
                        <input className="contact-input-field" type="text" placeholder="Your Name" name="name"/>
                        <input className="contact-input-field" type="email" placeholder="Your Email" name="email"/>
                    </div>
                    <div>
                        <input className="contact-input-field" type="number" placeholder="Phone" name="phone"/>
                        <input className="contact-input-field" type="text" placeholder="Subject" name="subject"/>
                    </div>
                    <textarea className="text-field" placeholder="Message" cols="80" rows="5" name="message"></textarea>
                    <br />
                    <input type="submit" className="hero-btn" value="Send Message"/>
                </form>
                {
                    error && <p style={{color: "red"}}>{ error }</p>
                }
            </div>
        </Container>
    );
};

export default Contact;