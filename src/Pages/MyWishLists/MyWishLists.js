import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import  {removeFromWishLists}  from '../../utilities/localStorage';

const MyWishLists = () => {
    const [myWishLists, setMyWishLists] = useState([]);
    const [added, setAdded] = useState(false);
    const [loading, setLoading] = useState(true);

    const wishLists = localStorage.getItem('tralive-wish-list');
    
    useEffect(() => {
        fetch(`https://gruesome-village-05256.herokuapp.com/allDestinations/?wishLists=${wishLists}`)
            .then(res => res.json())
            .then(data => {
                setMyWishLists(data)
                setLoading(false);
            })
    },[wishLists, added])
    
    const remove = id =>{
        removeFromWishLists(id);
        setAdded(!added);
    }

    return (
        <Container>
            <h1 style={{ color: "#00095e" }}>My Wishlists</h1>
            <Row>
                {
                    loading && <div className='d-flex justify-content-center'>
                        <Spinner className="my-5" animation="grow" />
                    </div>
                }
                {
                    myWishLists.map(wish => <Card className='m-2' key={wish._id} style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{wish.name}</Card.Title>
                        <img width={200} height={150} src={wish.img} alt="" />
                        <br /><br />
                        <Card.Subtitle className="mb-2 text-muted"><span className="fs-4"><sup>$</sup>{wish.price}</span></Card.Subtitle>
                        <Card.Text>
                            {wish.description}
                        </Card.Text>
                        <Card.Link style={{textDecoration: 'none'}} as={NavLink} to={`/bookingDestination/${wish._id}`}>Book now</Card.Link>
                        <Card.Link style={{cursor:"pointer", textDecoration:'none'}} onClick={()=>remove(wish._id)}>Remove</Card.Link>
                    </Card.Body>
                    </Card>)
                    }
            </Row>
        </Container>
    );
};

export default MyWishLists;