import React from 'react';
import { Spinner, Table } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import useBookings from '../../hooks/useBookings';
import { removeFromDb } from '../../utilities/localStorage';
import './MyBookings.css'

const MyBookings = () => {
    const [usersBooking ] = useBookings();
    const { user } = useAuth();
    
    const handleDelete = (id) => {
        const confirmation = window.confirm('Are you sure you want to delete?')
        if (confirmation) {
            removeFromDb(id, user.email)
            alert('Deleted successfully')
        }
    }

    return (
        <div className = "container">
            <Table striped bordered hover className="w-75 container">
                <thead>
                    <tr>
                    <th>Destination Name</th>
                        <th>Price</th>
                        <th>Cancel trip</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersBooking.length ? usersBooking.map(b => <tr key={b.id}>
                                            <td>{b.name}</td>
                                            <td>{b.price}</td>
                                        <td>
                                            <button onClick={()=> handleDelete(b.id)} className="btn btn-danger">Cancel trip</button>
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