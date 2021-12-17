import React from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import error from '../../media/404-error.png'

const NotFound = () => {
    return (
        <div>
            <img src={error} alt="" />
            <br />
            <NavLink to="/"><Button variant='primary'>Back to home</Button></NavLink>
        </div>
    );
};

export default NotFound;