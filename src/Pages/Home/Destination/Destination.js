import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Destination.css'

const Destination = (props) => {
    const { destination } = props;
    const {_id, img, name, price, description, loved, time } = destination;

    return (
        <Card className="destination col-md-3 text-center service pb-5 m-2">
            <div className="image-container">
                <Card.Img className="destination-image" variant="top" src={img} />
            </div>
        <Card.Body>
            <Card.Title><h3 className="card-title">{name}</h3></Card.Title>
                <Card.Text>
                    <><i className="fas fa-heart"></i> {loved}</>
                    <br />
                    <><span className="price"><sup>$</sup>{price}</span> {time}</>
                    <br /><br />
                    <>{description}</>
            </Card.Text>
        </Card.Body>
        <NavLink to={`/bookingDestination/${_id}`}><button className="book-now-btn">Book Now</button></NavLink>
    </Card>
    );
};

export default Destination;