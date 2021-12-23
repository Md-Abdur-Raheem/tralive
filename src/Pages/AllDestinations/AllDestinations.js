import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './AllDestinations.css';
import { addToWishLists, removeFromWishLists } from '../../utilities/localStorage';

const AllDestinations = () => {
    const [allDestinations, setAllDestinations] = useState([]);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/all-destinations')
            .then(res => res.json())
            .then(data => {
                setAllDestinations(data)
            })
    }, [added]);

    const add = id => {
        addToWishLists(id);
        setAdded(!added);
    }

    const remove = id =>{
        removeFromWishLists(id);
        setAdded(!added);
    }

    return (
        <div>
            <h1 className="hero-title">Find your favourite place to visit</h1>
            <Container>
                {
                    allDestinations.length ?
                    <Row className="p-5 m-0 container gy-5">
                    {
                        allDestinations.map(destination => <Col  key={destination._id} lg={4}>
                            <Card className="destination text-center h-100 pb-5 m-2">
                            <div className="image-container">
                                <Card.Img className="destination-image" variant="top" src={destination.img} />
                            </div>
                            <Card.Body style={{fontFamily:"Josefin Sans"}}>
                                <Card.Title><h3 className="card-title">{destination.name}</h3></Card.Title>
                                <Card.Text>
                                    <><i className="fas fa-heart"></i> {destination.loved}</>
                                    <br />
                                    <><span className="price"><sup>$</sup>{destination.price}</span> {destination.time}</>
                                    <br /><br />
                                    <>{destination.description}</>
                            </Card.Text>
                            </Card.Body>
                                <NavLink to={`/bookingDestination/${destination._id}`}><button className="book-now-btn wish-list-btn"><i style={{color: "#00095e"}} className="fas fa-plus-circle"></i> Book Now</button></NavLink>
                                <br />
                                {
                                    (localStorage.getItem("tralive-wish-list") && JSON.parse(localStorage.getItem("tralive-wish-list")).includes(destination._id)) ?
                                            <button onClick={() => remove(destination._id)} style={{marginLeft: 90}} className="book-now-btn"><i style={{color: "#f6c103"}} className="fas fa-minus-circle"></i> Remove</button>
                                            :
                                            <button onClick={() => add(destination._id)} style={{marginLeft: 90}} className="book-now-btn"><i style={{color: "#f6c103"}} className="fas fa-star fa-yellow"></i> Add To Wishlist</button>
                                }
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