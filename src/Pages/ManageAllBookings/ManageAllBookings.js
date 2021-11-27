import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import AlertModal from '../Shared/AlertModal/AlertModal';
import VerticalModal from '../Shared/VerticalModal/VerticalModal';
import './ManageAllBookings.css'

const ManageAllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [AlertModalShow, setAlertModalShow] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/all-bookings')
            .then(res => res.json())
            .then(data => {
                setBookings(data)
                setLoading(false);
            })
        
    }, [loading])

    const handleDelete = () => {
        setModalShow(true);
        fetch(`http://localhost:5000/all-bookings/${deleteId}`, {
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
                    setLoading(!loading);
                }
        })
    }   
    return (
        <div className = "container">
            <Table striped bordered hover className="w-75 container">
                <thead>
                    <tr>
                    <th>User Email</th>
                        <th>Bookings</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                        {
                           bookings.map(b => <tr key={b._id}>
                                <td>{b.email}</td>
                                <td>{b.destination.name}</td>
                                <td><button onClick={()=>{setModalShow(true); setDeleteId(b._id)}} className="btn btn-danger">Delete</button></td>
                           </tr>)
                           
                        }
                </tbody>
            </Table>
            <VerticalModal show={modalShow} onHide={() => { setModalShow(false); setDeleteId('')}} delete={"delete"} handledeletetrip={handleDelete}>
                <p>Are you sure you want delete this trip?</p>
            </VerticalModal>
            <AlertModal show={AlertModalShow} onHide={() => setAlertModalShow(false)} variant="success">Trip deleted successfully !!!</AlertModal>
        </div>
    );
};

export default ManageAllBookings;