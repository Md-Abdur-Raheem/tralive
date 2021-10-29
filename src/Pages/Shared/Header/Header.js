import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../../../media/logo.png'
import './Header.css'

const Header = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="mb-5">
            <Container>
                <Navbar.Brand href="#home">
                <img
                    src={logo} className="d-inline-block align-top" alt="React Bootstrap logo"
                /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                <Nav.Link className="nav-menu me-lg-4 fs-6 fw-bold" href="#deets"><i className="fas fa-home"></i> Home</Nav.Link>
                <Nav.Link className="nav-menu me-lg-4 fs-6 fw-bold" eventKey={2} href="#memes"><i className="fas fa-plane"></i> All destinations</Nav.Link>
                <Nav.Link className="nav-menu me-lg-4 fs-6 fw-bold" eventKey={2} href="#memes"><i className="fas fa-info-circle"></i> About us</Nav.Link>
                <Nav.Link className="nav-menu me-lg-4 fs-6 fw-bold" eventKey={2} href="#memes"><i className="fas fa-envelope"></i> Contact</Nav.Link>
                <Nav.Link className="nav-menu me-lg-4 fs-6 fw-bold" eventKey={2} href="#memes"><i className="fas fa-sign-in-alt"></i> Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;