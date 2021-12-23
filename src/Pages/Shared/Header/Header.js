import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../../media/logo.png'
import userPhotoDefault from '../../../media/user.png'
import useAuth from '../../../hooks/useAuth';
import './Header.css'
import { useState } from 'react';
import VerticalModal from '../VerticalModal/VerticalModal'


const Header = () => {
    const { user, admin } = useAuth();
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
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
                                user.email && admin && <Nav.Link as={ NavLink} to="/dashboard" className="nav-menu me-lg-4 fs-6 fw-bold"><i className="fas fa-users-cog"></i> Admin Panel</Nav.Link>
                            }
                            {
                                user.email ?
                                    <>   <img className="user-photo" src={ user?.photoURL || userPhotoDefault } alt="" />
                                        <NavDropdown id="nav-dropdown-dark-example" menuVariant="dark">
                                            <NavDropdown.Item className="dropdown-profile-menu">
                                                <div>
                                                    <img  className="user-photo" src={user?.photoURL || userPhotoDefault} alt="" />
                                                    <p className='text-white'>{user?.displayName}</p>
                                                </div>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item className="dropdown-nav-menu" as = {NavLink} to = "/myBookings">My Bookings</NavDropdown.Item>
                                            <NavDropdown.Item className="dropdown-nav-menu" as = {NavLink} to = "/myBookings">My Wishlists</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="#action/3.4"><button onClick={()=>setModalShow(true)} as={NavLink} className="me-lg-4 log-out-btn"><i className="fas fa-sign-out-alt"></i> Logout</button></NavDropdown.Item>
                                        </NavDropdown>
                                        
                                    </>
                                    : <Nav.Link as={NavLink} to="/login" className="nav-menu me-lg-4 fs-6 fw-bold"><i className="fas fa-sign-in-alt"></i> Login</Nav.Link>
                            }
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <VerticalModal show={modalShow} onHide={() => setModalShow(false)} logout={"logOut"}>
                <p>Are you sure you want to log out?</p>
            </VerticalModal>
        </>
    );
};

export default Header;