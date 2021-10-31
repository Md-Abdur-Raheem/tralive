import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import { clearAllBookings } from '../../utilities/localStorage';
import './ManageAllBookings.css'

const ManageAllBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('http://localhost:7000/all-bookings')
            .then(res => res.json())
            .then(data => setBookings(data))
        
    }, [loading])

    const handleDelete = id => {
        const confirmation = window.confirm('Are you sure you want to delete?')
        if (confirmation) {
            fetch(`http://localhost:7000/all-bookings/${id}`, {
                method: "DELETE",
                headers: {'content-type': 'application/json'}
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        clearAllBookings(user.email);
                        alert('Deleted Successfully')
                        setLoading(true);
                    }
                })
        }
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
                            <td>{b.booking.map(bo => <ul key={bo.name}><li>{bo.name}</li></ul>)}</td>
                            <td><button onClick={()=>handleDelete(b._id)} className="btn btn-danger">Delete</button></td>
                        </tr>)
                        }
                </tbody>

            </Table>
        </div>
    );
};

export default ManageAllBookings;