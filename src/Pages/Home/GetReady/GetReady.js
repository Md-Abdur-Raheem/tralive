import React from 'react';
import './GetReady.css';
import travelPic from '../../../media/get.png'
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const GetReady = () => {
    return (
        <Container className="get-ready-container my-5">
            <div className="get-ready d-flex justify-content-center align-items-center">
                <div className="travel-img">
                    <img src={travelPic} alt="" />
                </div>
                <div className="ms-lg-5 ps-lg-5 pt-5">
                    <h1 className="hero-title">Get ready for real time adventure</h1>
                    <br />
                    <p>Let’s start your journey with us, your dream will come true. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.</p>
                    <br />
                    <NavLink to ="/allDestinations"><button className="get-btn">Book your destination</button></NavLink>
                </div>
            </div>
        </Container>
    );
};

export default GetReady;