import React from 'react';
import { useState, useEffect } from 'react';
import { Col, Container, Offcanvas, Row } from 'react-bootstrap';
import AddNewDestination from '../AddNewDestination/AddNewDestination';
import AdminAllDestination from '../AdminAllDestinations/AdminAllDestination';
import ManageAllBookings from '../ManageAllBookings/ManageAllBookings';
import './Dashboaed.css'


const options = [
    {
        name: 'Enable body scrolling',
        scroll: true,
        backdrop: false,
      }
]

const Dashboard = () => {
    const [render, setRender] = useState('ManageAllBookings');
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [show, setShow] = useState(true);
    
    
    const updateMedia = () => {
        setScreenSize(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        const offcanvas = document.getElementById('side-navigation');
        console.log(offcanvas);
        
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
        // setRender('')
    }

    const handleClick = (renderElement) => {
        setRender(renderElement);
        if (screenSize < 1440) {
            toggleShow();
        }
        
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
                                <button className='side-nav-btn' onClick={()=>handleClick('ManageAllBookings')}>Manage All Booking</button>
                                <br /><br />
                                <button className='side-nav-btn' onClick={()=>handleClick('AllDestinations')}>All Destinations</button>
                                <br /><br />
                                <button className='side-nav-btn' onClick={()=>handleClick('AddNewDestination')}>Add New Destination</button>
                            </Offcanvas.Body>
                        </Offcanvas>))
                        
                    }
                    {
                        screenSize < 1440 && <button onClick={toggleShow} className='expand-btn'><i className="fas fa-chevron-circle-right"></i></button>
                    }
                </Col>

                <Col lg={12} sm={10} md={12}>
                    {
                        render === "ManageAllBookings" && <ManageAllBookings/> 
                    }
                    {
                        render === "AllDestinations" && <AdminAllDestination/>
                    }
                    {
                        render === "AddNewDestination" && <AddNewDestination/>
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;