import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import footerLogo from '../../../media/footer-logo.png'
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row className="p-5">
                    <Col lg={3} className="text-start">
                        <img className="pt-5" src={footerLogo} alt="" />
                        <br /><br /><br />
                        <p className="text">Travel is one of those things that naturally gives rise to queries, concerns and doubts, so we’re here to put your mind at ease.</p>
                        <br /><br />
                        <a href="/"><i className="social-icon fab fa-twitter-square me-4 fs-4"></i></a>
                        <a href="/"><i className="social-icon fab fa-facebook-square me-4 fs-4"></i></a>
                        <a href="/"><i className="social-icon fab fa-linkedin me-4 fs-4"></i></a>
                        <a href="/"><i className="social-icon fab fa-pinterest-square me-4 fs-4"></i></a>
                    </Col>
                    <Col lg={3} className="text-start">
                        <h5 className="text-white pt-5">Navigation</h5>
                        <br />
                        <ul className="m-0 p-0">
                            <li className="text list-item py-2"><NavLink to="/home" className="footer-link">Home</NavLink></li>
                            <li className="text list-item py-2"><NavLink to="/allDestinations" className="footer-link">All Destinations</NavLink></li>
                            <li className="text list-item py-2"><NavLink to="/home" className="footer-link">About us</NavLink></li>
                            <li className="text list-item py-2"><NavLink to="/contact" className="footer-link">Contact</NavLink></li>
                            <li className="text list-item py-2"><NavLink to="/home" className="footer-link">Login</NavLink></li>
                        </ul>
                    </Col>
                    <Col lg={3} className="text-start">
                        <h5 className="text-white pt-5">Services</h5>
                        <br />
                        <ul className="m-0 p-0">
                            <li className="text list-item py-2">Blackforest</li>
                            <li className="text list-item py-2">Bodhubon</li>
                            <li className="text list-item py-2">Rongdhonu</li>
                            <li className="text list-item py-2">Contact</li>
                            <li className="text list-item py-2">Meghrong</li>
                        </ul>
                    </Col>
                    <Col lg={3} className="text-start">
                        <h5 className="text-white pt-5">Contact us</h5>
                        <br />
                        <p className="text">205/3, Tazlane, Mirpur, Dhaka-1216 <br /> tralive@gmail.com</p>
                        <br />
                        <h4 className="phone">+10 (78) 738-7093</h4>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;