import React from 'react';
import { useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import './Payment.css';
import bkash from '../../media/bkash.png'
import { useLocation } from 'react-router-dom';

const Payment = () => {
    const {state} = useLocation();
    const [paymnetMethod, setPaymetMethod] = useState('credit-card');

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
                    <h1 style={{ color: "#00095e"}}>Payment Details</h1>
                    <div className='form-container'>
                        <div className='btn-container'>
                            <button onClick={() => { setPaymetMethod('credit-card') }} autoFocus>
                                <i className="fas fa-credit-card"></i>
                                <br />
                                Credit Card
                            </button>
                            <button onClick={() => { setPaymetMethod('bkash') }}>
                                <img src={bkash} style={{ objectFit: "cover" }} width={50} height={20} alt='' />
                                <br />
                                Bkash
                            </button>
                            <button onClick={() => { setPaymetMethod('net-banking') }}>
                                <i className="fas fa-mobile-alt"></i>
                                <br />
                                Net Banking
                            </button>
                        </div>
                        {
                            paymnetMethod === "credit-card" && <form className='text-start p-3 credit-card'>
                                <label className='pb-2' htmlFor="input">
                                    <b>Card Owner</b>
                                </label>
                                <br />

                                <input className='payment-input w-100 me-5 ps-2' type="text" name="" id="" placeholder='Card Owner Name' />
                                <br />

                                <label className='pb-2 pt-3' htmlFor="input">
                                    <b>Card Number</b>
                                </label>
                                <br />

                                <input className='payment-input w-100 me-5 ps-2' type="text" name="" id="" placeholder='Card Number' />
                                <br />

                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <label className='p-2 pt-3' htmlFor="input">
                                            <b>Expiration Date</b>
                                        </label>
                                        <br />

                                        <input className='payment-input ps-2' type="text" name="" id="" placeholder='MM' />
                                        <input className='payment-input ps-2' type="text" name="" id="" placeholder='YY' />
                                    </div>
                                    <div>
                                        <label className='p-2 pt-3' htmlFor="input">
                                            <b>CVV</b>
                                        </label>
                                        <br />

                                        <input className='payment-input ps-2' type="text" name="" id=""/>
                                    </div>
                                </div>
                                <input type="submit" className="hero-btn payment-btn" value="Confirm payment"/>
                            </form>
                        }

                        {
                            paymnetMethod === "bkash" && <div>Bkash coming soon</div>
                        }

                        {
                            paymnetMethod === "net-banking" && <div>Net banking coming soon</div>
                        }
                    </div>
                </Col>
           </Row>
        </Container>
    );
};

export default Payment;