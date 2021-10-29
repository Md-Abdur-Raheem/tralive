import React from 'react';
import Banner from './Banner/Banner';
import Destinations from './Destinations/Destinations';
import GetReady from './GetReady/GetReady';
import './Home.css'

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Destinations></Destinations>
            <GetReady></GetReady>
        </div>
    );
};

export default Home;