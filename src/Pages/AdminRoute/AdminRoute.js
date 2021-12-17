import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useFirebase';

const AdminRoute = ({ children, ...rest }) => {
    const { user, loading, admin } = useAuth();
    if (loading) {
        return <Spinner className="my-5" animation="grow" />
    }
    return <Route {...rest} render = { ({ location }) => user.email && admin ? children : <Redirect to={{pathname: "/not_found", state: { from: location}}}/> }/> ;
};

export default AdminRoute;