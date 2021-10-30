import React from 'react';
import Banner from './Banner/Banner';
import Destinations from './Destinations/Destinations';
import FAQ from './FAQ/FAQ';
import GetReady from './GetReady/GetReady';
import './Home.css'

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Destinations></Destinations>
            <GetReady></GetReady>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;