import React from 'react';
import { Spinner, Table } from 'react-bootstrap';
import useBookings from '../../hooks/useBookings';
import './MyBookings.css'

const MyBookings = () => {
    const [usersBooking ] = useBookings();

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
                        usersBooking.length ? usersBooking.map(b => <tr key={b.id}>
                                            <td>{b.name}</td>
                                            <td>{b.price}</td>
                                        <td>
                                            <p>Pending</p>
                                        </td>
                        </tr>) : 
                            <tr><td><Spinner className="my-5" animation="grow" /></td></tr>
                                
                            
                    }
                </tbody>

            </Table>
        </div>
    );
};

export default MyBookings;