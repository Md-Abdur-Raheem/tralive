import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../../media/logo.png'
import userPhotoDefault from '../../../media/user.png'
import useAuth from '../../../hooks/useAuth';

import './Header.css'

const Header = () => {
    const { user, logOut } = useAuth();
    return (
        <Navbar collapseOnSelect expand="lg" className="mb-5">
            <Container>
                <Navbar.Brand href="#home">
                <img
                    src={logo} className="d-inline-block align-top" alt="React Bootstrap logo"
                /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="toggle-btn" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                    <Nav.Link as={ NavLink} to="/home" className="nav-menu me-lg-4 fs-6 fw-bold"><i className="fas fa-home"></i> Home</Nav.Link>
                    <Nav.Link as={ NavLink} to="/allDestinations" className="nav-menu me-lg-4 fs-6 fw-bold"><i className="fas fa-plane"></i> All destinations</Nav.Link>
                    <Nav.Link as={ NavLink} to="/contact" className="nav-menu me-lg-4 fs-6 fw-bold"><i className="fas fa-envelope"></i> Contact</Nav.Link>
                        {
                            user.email ?
                                <>   <img className="user-photo" src={ user?.photoURL || userPhotoDefault } alt="" />
                                    <NavDropdown id="nav-dropdown-dark-example" menuVariant="dark">
                                        <NavDropdown.Item className="dropdown-nav-menu" as = {NavLink} to = "/myBookings">My Bookings</NavDropdown.Item>
                                        <NavDropdown.Item className="dropdown-nav-menu" as = {NavLink} to = "/manageAllBookings">Manage All Bookings</NavDropdown.Item>
                                        <NavDropdown.Item className="dropdown-nav-menu" as = {NavLink} to = "/addNewDestination">Add new destinations</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4"><button onClick={logOut} as={NavLink} className="me-lg-4 log-out-btn"><i className="fas fa-sign-out-alt"></i> Logout</button></NavDropdown.Item>
                                    </NavDropdown>
                                    
                                </>
                                : <Nav.Link as={NavLink} to="/login" className="nav-menu me-lg-4 fs-6 fw-bold"><i className="fas fa-sign-in-alt"></i> Login</Nav.Link>
                        }
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;