import React from 'react';
import { useState } from 'react';
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
    
    return (
        <Container className="dashboard-container">
            <Row>
                <Col className='w-25' lg={0} sm={2}>{options.map((props, idx) => (
                    <Offcanvas key={idx} className="side-navigation" show={true}{...props}>
                        <Offcanvas.Header>
                            <Offcanvas.Title>Navigate</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <button className='side-nav-btn' onClick={() => setRender('ManageAllBookings')}>Manage All Booking</button>
                            <br /><br />
                            <button className='side-nav-btn' onClick={() => setRender('AllDestinations')}>All Destinations</button>
                            <br /><br />
                            <button className='side-nav-btn' onClick={()=>setRender('AddNewDestination')}>Add New Destination</button>
                        </Offcanvas.Body>
                    </Offcanvas>))}
                </Col>

                <Col lg={12} sm={10}>
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