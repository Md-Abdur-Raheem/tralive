import React from 'react';
import { useState, useEffect } from 'react';
import { Col, Container, Offcanvas, Row } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';
import './Dashboaed.css'


const options = [
    {
        name: 'Enable body scrolling',
        scroll: true,
        backdrop: false,
      }
]

const Dashboard = () => {
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [show, setShow] = useState(true);
    
    
    const updateMedia = () => {
        setScreenSize(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        const offcanvas = document.getElementById('side-navigation');
        
        if (offcanvas && screenSize > 1440) {
            offcanvas.style.display = "block";
            
        }
        else if(offcanvas && screenSize < 1440) {
            offcanvas.style.display = "none";
            offcanvas.style.width = "100vw";
        }
    }
    , [screenSize])

    const toggleShow = () => {
        setShow(!show)
    }

    
    return (
        <Container className="dashboard-container">
            <Row>
                <Col className='w-25' lg={0} sm={2} md={0}>
                    {
                        
                        options.map((props, idx) => (
                        <Offcanvas key={idx} id="side-navigation" className="side-navigation" onHide = {()=>setShow(false)} show={show} {...props}>
                            <Offcanvas.Header closeButton = {screenSize < 1440}>
                                <Offcanvas.Title>Navigate</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <NavLink to="manageAllBookings"><button onClick={screenSize < 1440 && toggleShow} className='side-nav-btn'>Manage All Booking</button></NavLink>
                                <br /><br />
                                <NavLink to="adminAllDestinations"><button onClick={screenSize < 1440 && toggleShow} className='side-nav-btn'>All Destinations</button></NavLink>
                                <br /><br />
                                <NavLink to="addNewDestination"><button onClick={screenSize < 1440 && toggleShow} className='side-nav-btn'>Add New Destination</button></NavLink>
                                <br /><br />
                                <NavLink to="makeAdmin"><button onClick={screenSize < 1440 && toggleShow} className='side-nav-btn'>Make Admin</button></NavLink>
                            </Offcanvas.Body>
                        </Offcanvas>))
                        
                    }
                    {
                        screenSize < 1440 && <button onClick={toggleShow} className='expand-btn'><i className="fas fa-angle-double-right fa-2x arrow"></i></button>
                    }
                </Col>

                <Col lg={12} sm={10} md={12}>
                    <Outlet/>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;