import React from 'react';
import { useLocation } from 'react-router';

const EmailVerification = () => {
    const location = useLocation();
    console.log(location?.state?.from?.pathname);
    return (
        <div>
            <h3>A verification email has been sent to your email address. <br /> Please check your email and verify.</h3>
        </div>
    );
};

export default EmailVerification;