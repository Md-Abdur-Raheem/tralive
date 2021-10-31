import React from 'react';
import { Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useBookings from '../../hooks/useBookings';
import './MyBookings.css'

const MyBookings = () => {
    const [booking, loading] = useBookings();
    if (!loading) {
        const filteredId = booking?.booking.map(id => id);
        console.log(filteredId);
    }
    

    console.log(booking);
    return (
        <div className = "cart-container container">
            <Table striped bordered hover className="w-75 container">
                <thead>
                    <tr>
                    <th>Destination Name</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        booking.length ? <p>done</p>/* booking.map(b => <tr key={b.id}>
                                            <td>{b.name}</td>
                                            <td>{b.price}</td>
                                        <td>
                                            <NavLink to="/confirmEnroll"><button className="confirm-btn">Confirm Enroll</button></NavLink>
                                        </td>
                        </tr>) */ :
                            <p>loading...</p>
                                
                            
                    }
                </tbody>

            </Table>
        </div>
    );
};

export default MyBookings;