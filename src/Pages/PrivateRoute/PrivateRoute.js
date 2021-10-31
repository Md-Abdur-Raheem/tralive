import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return <Spinner className="my-5" animation="grow" />
    }
    return <Route {...rest} render = { ({ location }) => user.email ? children : <Redirect to={{pathname: "/login", state: { from: location}}}/> }/> ;
};

export default PrivateRoute;