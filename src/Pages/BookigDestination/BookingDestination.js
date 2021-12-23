import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import './BookingDestination.css';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import AlertModal from '../Shared/AlertModal/AlertModal'


const BookingDestination = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const phoneRef = useRef();
    const [destination, setDestination] = useState({});
    const [selectionRange, setSelectionRange] = useState({ startDate: new Date(), endDate: new Date(), key: 'selection' });
    const [tourDuration, setTourDuration] = useState({});
    const [AlertModalShow, setAlertModalShow] = useState(false);



    const handleSelect = (ranges) => {
        setSelectionRange({
            startDate: ranges.selection.startDate,
            endDate: ranges.selection.endDate,
            key: "selection"
        })
        setTourDuration({startDate: ranges.selection.startDate.toLocaleDateString(), endDate: ranges.selection.endDate.toLocaleDateString()})
    }
            

    useEffect(() => {
        fetch(`https://gruesome-village-05256.herokuapp.com/all-destinations/${id}`)
            .then(res => res.json())
        .then(data => setDestination(data))
    }, [id])
    
    const handleConfirm = () => {

        const bookingDate = new Date().toLocaleDateString();

        const newBooking = { name: user.displayName, email: user.email, phone: phoneRef.current.value, bookingDate, tourDuration, destination, status: "Pending" };
        
        fetch('http://localhost:5000/bookings', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBooking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setAlertModalShow(true);
                }
            })
    }
    return (
        <Container className="App">
            <Row>
                <Col sm={6}>
                    <img className="w-100" src={destination?.img} alt="" />
                </Col>
                <Col sm={6}>
                    <h1>{destination.name}</h1>
                    <p><i className="fas fa-heart"></i> {destination?.loved}</p>
                    <p>{destination?.description}</p>
                    <p>{destination?.time}</p>
                    <p>Price: ${destination?.price}</p>

                    <h5 style={{color: "orange", fontWeight: 700, textDecoration: "underline"}}>Confirm destination</h5>
                    <p><b>{user?.displayName}</b></p>
                    <p><b>{user?.email}</b></p>
                    <input className="w-50" style={{ height: 40, padding: 10 }} type="number" placeholder="Entre your phone no." ref={phoneRef}/>
                    <br /><br /><br />
                    <h6 style={{ color: "green", fontWeight: 700 }}>Select your tour duration</h6>
                    <br />
                    <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                    />
                    <button className="hero-btn" onClick={()=>{handleConfirm()}}>Confirm</button>

                </Col>
            </Row>
            <AlertModal show={AlertModalShow} onHide={() => setAlertModalShow(false)} variant="success">Your booking placed successfully !!!</AlertModal>
        </Container>
    );
};

export default BookingDestination;