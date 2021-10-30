import React from 'react';
import './FAQ.css';
import faqImg from '../../../media/full.png'
import { Accordion } from 'react-bootstrap';

const FAQ = () => {
    return (
        <div className="h-100">
            <h5 className="destination-sub-title">FAQ</h5>
            <h1 className="hero-title">Full range of travel service</h1>
             <div className="faq-container container d-lg-flex align-items-center justify-content-center my-5">
            <div className="accordion-container h-100">
            <Accordion flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="acc-header">Are trips physically demanding?</Accordion.Header>
                    <Accordion.Body>
                    Want to lie in a hammock and not move until cocktail hour? We’ve got a trip for that. Want to power up the side of mountain at high altitude? We’ve also got a trip for that. To determine what type of trip suits you best, each of our trips comes with a Physical Rating to let you know how physically demanding it is… or isn’t.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header className="acc-header">Does Tralive have family trips? </Accordion.Header>
                    <Accordion.Body>
                    Tralive offers a wide range of Family Adventures around the globe. The minimum age (for Family trips) varies depending on destination, and Tralive has set minimum ages to ensure that the included activities suit each age range. Additionally, you’ll notice that some of the more adventurous destinations have a higher minimum age.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header className="acc-header">I’m travelling alone – is that OK?</Accordion.Header>
                    <Accordion.Body>
                    This is the beauty of the Tralive style of travel: many of our travellers join because they are travelling solo and want to meet and share experiences with like-minded people. 
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header className="acc-header">Tralive Insiders</Accordion.Header>
                    <Accordion.Body>
                    <b>Tralive Insiders</b> is an exclusive community of travellers that, if you’ve already travelled with us, you’re already part of. Every now and then, you’ll receive email updates packed with competitions, partner offers, Insiders-only previews of sales and, best of all, you’ll be one of the first to hear about new trips.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            </div>
            {/* <div className="w-75 h-100"> */}
                <img className="faq-img m-lg-5 p-lg-5 mt-sm-5" src={faqImg} alt="" />
            {/* </div> */}
        </div>
       </div>
    );
};

export default FAQ;