import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import Destination from '../Destination/Destination';
import './Destinations.css'

const Destinations = () => {
    const [destinations, setDestinations] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/destinations')
            .then(res => res.json())
        .then(data => setDestinations(data))
    }, [])
    
    return (
        <Container>
            <h5 className="destination-sub-title">Check our best promotional tour</h5>
            <h1 className="hero-title">Our destinations</h1>
            <div className="destination-container">
                {
                    destinations.length ? <Row className="p-5 m-0 flex-nowrap">
                
                   { destinations.map(destination => <Destination key = {destination._id} destination = {destination}></Destination>) }
             
                    </Row>  : <Spinner className="my-5" animation="grow" />
                }
        </div>
        </Container>
    );
};

export default Destinations;