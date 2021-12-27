import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    let location = useLocation();
    if (loading) {
        return <Spinner className="my-5" animation="grow" />
    }
    
    if (!user.email) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
};

export default PrivateRoute;