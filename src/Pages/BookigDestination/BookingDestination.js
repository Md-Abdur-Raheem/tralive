import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import './BookingDestination.css'

const BookingDestination = () => {
    const { user } = useAuth();
    console.log(user);
    const { id } = useParams();
    const [destination, setDestination] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/all-destinations/${id}`)
            .then(res => res.json())
        .then(data => setDestination(data))
    },[])
    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <img className="w-100" src={destination.img} alt="" />
                </Col>
                <Col sm={6}>
                    <h1>{destination.name}</h1>
                    <p><i className="fas fa-heart"></i> {destination.loved}</p>
                    <p>{destination.description}</p>
                    <p>{destination.time}</p>
                    <p>Price: ${destination.price}</p>

                    <h5>Confirm destination</h5>
                    <p>{user.displayName}</p>
                    <p>{user.email}</p>

                    <button>Confirm</button>

                </Col>
           </Row>
        </Container>
    );
};

export default BookingDestination;