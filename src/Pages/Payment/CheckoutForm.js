import { CardElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useRef } from 'react';
import bkash from '../../media/bkash.png'

const CheckoutForm = ({ price }) => {
    const [paymnetMethod, setPaymetMethod] = useState('credit-card');
    const stripe = useStripe();
    const elements = useElements();
    const nameRef = useRef();
    const numberRef = useRef();
    const expMonthRef = useRef();
    const expYearRef = useRef();



    

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const name = nameRef.current.value;
        const number = numberRef.current.value;
        const exp_month = expMonthRef.current.value;
        const exp_year = expYearRef.current.value;
        const card = { name, number, exp_month, exp_year };
        console.log(card);
        console.log(price);

        if (!stripe || !elements) {
            return;
        }

        if (card === null) {
            return;
        }




    }
    return (
        <div>
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
                                Mobile Banking
                            </button>
                        </div>
                        {
                            paymnetMethod === "credit-card" && <form onSubmit={handleSubmit} className='text-start p-3 credit-card'>
                                 {/* <CardElement
                                        options={{
                                        style: {
                                            base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                            },
                                            invalid: {
                                            color: '#9e2146',
                                            },
                                        },
                                        }}
                                    /> */}
                                         <label className='pb-2' htmlFor="card-owner">
                                            <b>Card Owner</b>
                                        </label>
                                        <br />

                                        <input id='card-owner' className='payment-input w-100 me-5 ps-2' type="text" placeholder='Card Owner Name' ref={nameRef} />
                                        <br />

                                        <label htmlFor='card-number' className='pb-2 pt-3'>
                                            <b>Card Number</b>
                                        </label>
                                        <br />

                                        <input id='card-number' className='payment-input w-100 me-5 ps-2' type="number" placeholder='Card Number' ref={numberRef} />
                                        <br />

                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <label className='p-2 pt-3' htmlFor="expiration-date">
                                                    <b>Expiration Date</b>
                                                </label>
                                                <br />

                                                <input id='expiration-date' className='payment-input ps-2' type="text" placeholder='MM' ref={expMonthRef} />
                                                <input className='payment-input ps-2' type="number" placeholder='YY' />
                                            </div>
                                            <div>
                                                <label className='p-2 pt-3' htmlFor="cvv">
                                                    <b>CVV</b>
                                                </label>
                                                <br />

                                                <input id='cvv' className='payment-input ps-2' type="number" ref={expYearRef}/>
                                            </div>
                                        </div>
                                        <input type="submit" className="get-btn payment-btn" value="Confirm payment" disabled={!stripe}/>
                            </form>
                        }

                        {
                            paymnetMethod === "bkash" && <div>Bkash coming soon</div>
                        }

                        {
                            paymnetMethod === "net-banking" && <div>Mobile banking coming soon</div>
                        }
                    </div>
        </div>
    );
};

export default CheckoutForm;