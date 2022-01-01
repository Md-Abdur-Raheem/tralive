import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, Table } from 'react-bootstrap';
import AlertModal from '../Shared/AlertModal/AlertModal';
import VerticalModal from '../Shared/VerticalModal/VerticalModal';
import './ManageAllBookings.css'

const ManageAllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [control, setControl] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [AlertModalShow, setAlertModalShow] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        setControl(true);
        fetch('https://gruesome-village-05256.herokuapp.com/allBookings')
            .then(res => res.json())
            .then(data => {
                setBookings(data)
                setControl(!control);
            })
        
    }, [control])

    const handleDelete = () => {
        setModalShow(true);
        fetch(`https://gruesome-village-05256.herokuapp.com/all-bookings/${deleteId}`, {
            method: "DELETE",
            headers: {
                'Content-type': "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    setModalShow(false);
                    setAlertModalShow(true);
                    setControl(!control);
                    setDeleteId('');
                }
        })
    }
    
    const updateStatus = (status, id) => {
        fetch(`https://gruesome-village-05256.herokuapp.com/all-bookings/${id}`, {
            method: "PUT",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ status })
        })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount){
                    setControl(!control);
                }
            })
    }

    return (
        <div>
            <h1 style={{ color: "#00095e", marginBottom: 30, position:"sticky"}}>Manage All Bookings</h1>
            <div style={{overflowX:"scroll"}}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Contact No.</th>
                            <th>Booking to</th>
                            <th>Booking Date</th>
                            <th>Starting Date</th>
                            <th>Ending Date</th>
                            <th>Status</th>
                            <th>Payment Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                            bookings.map((b, i) => <tr key={b._id}>
                                
                                <td>{i +1}</td>
                                <td>{b.name}</td>
                                <td>{b.email}</td>
                                <td>{b.phone}</td>
                                <td>{b.destination.name}</td>
                                <td>{b.bookingDate}</td>
                                <td>{b.tourDuration.startDate}</td>
                                <td>{b.tourDuration.endDate}</td>
                                <td style={{ color: b.status === "Pending" ? "orange" : b.status=== "On going" ? "blue" : "green"}}
                                >{b.status}</td>
                                <td>{b?.payment }</td>
                                <td className='d-flex justify-content-center'>
                                    <button onClick={() => { setModalShow(true); setDeleteId(b._id) }} className="btn btn-danger me-5">Delete</button>
                                    <DropdownButton id="dropdown-basic-button" title="Update Status" bg="warning">
                                        <Dropdown.Item onClick={()=>updateStatus("Pending", b._id)}>Pending</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>updateStatus("On going", b._id)}>On going</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>updateStatus("Completed", b._id)}>Completed</Dropdown.Item>
                                    </DropdownButton>
                                </td>
                            </tr>)
                            
                            }
                    </tbody>
                </Table>
                <VerticalModal show={modalShow} onHide={() => { setModalShow(false); setDeleteId('')}} delete={"delete"} handledeletetrip={handleDelete}>
                    <p>Are you sure you want delete this trip?</p>
                </VerticalModal>
                <AlertModal show={AlertModalShow} onHide={() => setAlertModalShow(false)} variant="success">Trip deleted successfully !!!</AlertModal>
            </div>
        </div>
    );
};

export default ManageAllBookings;