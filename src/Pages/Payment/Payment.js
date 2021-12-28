import React from 'react';
// import { useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import './Payment.css';
import { useLocation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51Jw0hLC5oEvRCY62lWyxMUN5YGqcco0HZWyaIRL2moF3g4KgDogZm6NuxSS7FHixQIXz2Z6VcidQxFW7MP2zl3Fs00DIe2yzBL');

const Payment = () => {
    const {state} = useLocation();
    

    return (
        <Container className='payment-container'>
            <Row>
                <Col>
                    <h1 style={{ color: "#00095e"}}>Booking Information</h1>
                    <div className='info-container'>
                        <Table bordered hover variant='dark'>
                            <thead>
                                <tr>
                                    <th>Field</th>
                                    <th>Info.</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><em>Name</em></td>
                                    <td className="info">{ state.name }</td>
                                </tr>
                                <tr>
                                    <td><em>Email</em></td>
                                    <td className="info">{ state.email }</td>
                                </tr>
                                <tr>
                                    <td><em>Phone</em></td>
                                    <td className="info">{ state.phone }</td>
                                </tr>
                                <tr>
                                    <td><em>Booking Date</em></td>
                                    <td className="info">{ state.bookingDate }</td>
                                </tr>
                                <tr>
                                    <td><em>Destination</em></td>
                                    <td className="info">{ state.destination.name }</td>
                                </tr>
                                <tr>
                                    <td><em>Start Date</em></td>
                                    <td className="info">{ state.tourDuration.startDate }</td>
                                </tr>
                                <tr>
                                    <td><em>End Date</em></td>
                                    <td className="info">{ state.tourDuration.endDate }</td>
                                </tr>
                                <tr>
                                    <td><em>Price</em></td>
                                    <td className="info">${ state.destination.price }</td>
                                </tr>
                                <tr>
                                    <td><em>Payment Status</em></td>
                                    <td className="info">Unpaid</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Col>
                <Col>
                <Elements stripe={stripePromise}>
                        <CheckoutForm price={state.destination.price }/>
                </Elements>
                </Col>
           </Row>
        </Container>
    );
};

export default Payment;