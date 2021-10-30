import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import './AllDestinations.css'

const AllDestinations = () => {
    const [allDestinations, setAllDestinations] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/all-destinations')
            .then(res => res.json())
            .then(data => setAllDestinations(data))
    }, [])
    return (
        <div>
            <h1 className="hero-title">Find your favourite place to visit</h1>
            <Container>
                {
                    allDestinations.length ?
                    <Row className="p-5 m-0 container gy-5">
                    {
                        allDestinations.map(destination => <Col lg={4}>
                            <Card className="destination text-center h-100 pb-5 m-2">
                            <div className="image-container">
                                <Card.Img className="destination-image" variant="top" src={destination.img} />
                            </div>
                            <Card.Body>
                                <Card.Title><h3 className="card-title">{destination.name}</h3></Card.Title>
                                <Card.Text>
                                    <><i className="fas fa-heart"></i> {destination.loved}</>
                                    <br />
                                    <><span className="price"><sup>$</sup>{destination.price}</span> {destination.time}</>
                                    <br /><br />
                                    <>{destination.description}</>
                            </Card.Text>
                            </Card.Body>
                            <button className="book-now-btn">Book Now</button>
                        </Card>
                        
                        </Col>)
                    }
                        </Row>
                        : <Spinner className="my-5" animation="grow" />
                }
            </Container>
        </div>
    );
};

export default AllDestinations;