import React from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Success = () => {
    return (
        <div>
            <div className="success-checkmark">
                <div className="check-icon">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle"></div>
                    <div className="icon-fix"></div>
                </div>
            </div>
            <h4 style={{ color: "#00095e" }}><strong>Congratulation !!! <br /> Your booking placed successfully</strong></h4>
            <br /><br />
            <NavLink to="/myBookings"><Button className='get-btn'>See Your Bookings</Button></NavLink>
        </div>
    );
};

export default Success;