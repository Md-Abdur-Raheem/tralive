import React from 'react';
import Banner from './Banner/Banner';
import Destinations from './Destinations/Destinations';
import './Home.css'

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Destinations></Destinations>
        </div>
    );
};

export default Home;