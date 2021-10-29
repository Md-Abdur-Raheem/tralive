import React from 'react';
import './Banner.css'
import car from '../../../media/banner.png'

const Banner = () => {
    return (
        <div className="banner-container mt-5 pt-5">
            <div>
                <h1 className="hero-title">Lifelong memories just a <br /> few seconds away <div className="hero-title-border"></div></h1>
                <h3 className="hero-sub-title">Lets start your journey with us, your dream will come true</h3>
                <button className="hero-btn">Explore Destinations</button>
            </div>
            <img className="car" src={car} alt="" />
            
        </div>
    );
};

export default Banner;