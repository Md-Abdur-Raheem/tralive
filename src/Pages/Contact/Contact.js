import React from 'react';
import { Container } from 'react-bootstrap';
import './Contact.css'

const Contact = () => {
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
                        <h4>+10 (78) 738-7093</h4>
                        <p>Call Us Now!</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center my-5">
                        <i className="cont-icon fas fa-envelope me-3"></i>
                        <div className="text-start">
                        <p>Do you have a Question?</p>
                        <h4>tralive@gmail.com</h4>
                        </div>
                    </div>
                </div>

                <div className="col-md-8 text-start">
                    <h1 className="mb-5" style={{color:"#00095e", fontFamily: "Josefin Sans"}} >Do Not Use This Form <br /> To Communicate Personal Data.</h1>
                    <div>
                        <input className="input-field" type="text" placeholder="Your Name"/>
                        <input className="input-field" type="email" placeholder="Your Email" />
                    </div>
                    <div>
                        <input className="input-field" type="number" placeholder="Phone" />
                        <input className="input-field" type="text" placeholder="Subject" />
                    </div>
                    <textarea className="text-field" placeholder="Message" cols="80" rows="5"></textarea>
                    <br />
                    <button className="hero-btn">Send Mesage</button>
                </div>
                
            </div>
        </Container>
    );
};

export default Contact;