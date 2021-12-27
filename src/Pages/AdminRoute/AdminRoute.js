import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useFirebase';

const AdminRoute = ({ children, ...rest }) => {
    const { user, loading, admin } = useAuth();
    let location = useLocation();

    if (loading) {
        return <Spinner className="my-5" animation="grow" />
    }
    if (!user.email || !admin) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
};

export default AdminRoute;