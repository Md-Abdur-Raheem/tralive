import React from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import './Payment.css';
import bkash from '../../media/bkash.png'

const Payment = () => {
    const [paymnetMethod, setPaymetMethod] = useState('credit-card');

    return (
        <Container className='payment-container'>
            <h1 style={{ color: "#00095e"}}>Payment Details</h1>
            <div className='form-container'>
                <div className='btn-container'>
                    <button onClick={()=>{setPaymetMethod('credit-card')}} autoFocus><i className="fas fa-credit-card"></i> Credit Card</button>
                    <button onClick={()=>{setPaymetMethod('bkash')}}><img src={bkash} style={{objectFit: "cover"}} width={50} height={20} alt=''/>Bkash</button>
                    <button onClick={()=>{setPaymetMethod('net-banking')}}><i className="fas fa-mobile-alt"></i> Net Banking</button>
                </div>
                {
                    paymnetMethod === "credit-card" && <form className='text-start p-3'>
                        <label className='pb-2' htmlFor="input"><b>Card Owner</b></label><br />
                        <input className='payment-input w-100 me-5 ps-2' type="text" name="" id="" placeholder='Card Owner Name' />
                        <br />
                        <label className='pb-2 pt-3' htmlFor="input"><b>Card Number</b></label><br />
                        <input className='payment-input w-100 me-5 ps-2' type="text" name="" id="" placeholder='Card Number' />
                        <br />

                        <div className='d-flex justify-content-between'>
                            <div>
                                <label className='p-2 pt-3' htmlFor="input"><b>Expiration Date</b></label><br />
                                <input className='payment-input ps-2' type="text" name="" id="" placeholder='MM' />
                                <input className='payment-input ps-2' type="text" name="" id="" placeholder='YY' />
                            </div>
                            <div>
                                <label className='p-2 pt-3' htmlFor="input"><b>CVV</b></label><br />
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
        </Container>
    );
};

export default Payment;