import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import bkash from '../../media/bkash.png'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = (props) => {
    const [paymnetMethod, setPaymetMethod] = useState('credit-card');
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const price = props.booking.destination.price;
    const { name, email, phone, bookingDate, tourDuration, destination, status } = props.booking;

    const navigate = useNavigate();



    useEffect(() => {
        fetch('https://gruesome-village-05256.herokuapp.com/create-payment-intent', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({price})
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret))
    },[price])


    const handleCardDetailsChange = ev => {
        ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
      };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        setProcessingTo(true);

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
      
        if (error) {
            setCheckoutError(error.message);
            setProcessingTo(false);
          } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
        
        stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                name: document.getElementById('card-holder').value,
            },
            },
        })
            .then(async function (result) {
                console.log(result);
                if (result.paymentIntent.status === 'succeeded') {
                    setProcessingTo(false);
                    const payBtn = document.getElementById("pay-btn");
                    payBtn.setAttribute("disabled", true);
                    payBtn.style.display = "none";

                    const newBooking = {
                        name, email, phone, bookingDate, tourDuration, destination, status, payment: "Paid",
                        transaction_id: result.paymentIntent.id, payment_method: result.paymentIntent.payment_method_types[0],
                        card_details: paymentMethod.card
                    };

                    fetch('https://gruesome-village-05256.herokuapp.com/bookings', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(newBooking)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId) {
                                navigate('/success');
                            }
                  })
                }
                else {
                    setCheckoutError('An error occured. Please try again');
                    return;
                }
        });




    }


    const iframeStyles = {
        base: {
          color: "#000",
          fontSize: "16px",
          iconColor: "#f6c103",
          "::placeholder": {
            color: "#00095e"
          }
        },
        invalid: {
          iconColor: "#d64161",
          color: "#d64161"
        },
        complete: {
          iconColor: "#34A853"
        }
      };
    
      const cardElementOpts = {
        iconStyle: "solid",
        style: iframeStyles,
        hidePostalCode: false
    };
    

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
                    paymnetMethod === "credit-card" &&
                    <form onSubmit={handleSubmit} className='text-start p-3 credit-card'>
                            <label htmlFor="card-holder"><b>Card Holder:</b></label>
                            <input type="text" id='card-holder' placeholder="Enter card holder name" className='payment-input w-100 p-3' />
                            <br /><br />
                        <CardElement
                            options={cardElementOpts}
                            onChange={handleCardDetailsChange}
                        />
                        {
                            !isProcessing ? <input type="submit" id="pay-btn" className="hero-btn payment-btn" value="Confirm payment" disabled={!stripe} />
                                : <button className='hero-btn payment-btn d-flex justify-content-center align-items-center'>
                                    <div className="spinner-border text-primary me-3" role="status"></div>
                                    <span>Processing...</span>
                                </button>
                        }
                    </form>
                    
                        
                    }
                
                    {
                        checkoutError && <p style={{color: "red"}}>{ checkoutError }</p>
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