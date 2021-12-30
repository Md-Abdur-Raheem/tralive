import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Destination.css';
import { addToWishLists, removeFromWishLists } from '../../../utilities/localStorage';

const Destination = (props) => {
    const { destination } = props;
    const { _id, img, name, price, description, loved, time } = destination;
    const [added, setAdded] = useState(false);

    const add = id => {
        addToWishLists(id);
        setAdded(true);
    }

    const remove = id =>{
        removeFromWishLists(id);
        setAdded(false);
    }

return (
    <Card className="destination col-md-4 text-center service pb-5 m-2">
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
        <NavLink to={`/bookingDestination/${_id}`}><button className="book-now-btn wish-list-btn"><i style={{color: "#00095e"}} className="fas fa-plus-circle"></i> Book Now</button></NavLink>
        <br />
        {
            (localStorage.getItem("tralive-wish-list") && JSON.parse(localStorage.getItem("tralive-wish-list")).includes(_id)) || added ?
                <button onClick={() => remove(_id)}  className="book-now-btn wish-btn"><i style={{color: "#f6c103"}} className="fas fa-minus-circle"></i> Remove</button>
                :
                <button onClick={() => add(_id)} className="book-now-btn wish-btn"><i style={{color: "#f6c103"}} className="fas fa-star fa-yellow"></i> Add To Wishlist</button>
        }
    </Card>
    );
};

export default Destination;