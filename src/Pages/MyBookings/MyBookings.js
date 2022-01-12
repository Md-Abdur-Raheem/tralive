import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import useBookings from '../../hooks/useBookings';
import VerticalModal from '../Shared/VerticalModal/VerticalModal';
import AlertModal from '../Shared/AlertModal/AlertModal'

const MyBookings = () => {
    const [cancelTripId, setCancelTripId] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [AlertModalShow, setAlertModalShow] = useState(false);
    const [control, setControl] = useState(false);
    const [usersBookings ] = useBookings(control);
    

    const handleCancelTrip = () => {
        fetch(`https://gruesome-village-05256.herokuapp.com/bookings/${cancelTripId}`, {
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
                }
        })
    }

    return (
        <div className = "container">
            <Table striped bordered hover className="w-75 container">
                <thead>
                    <tr>
                    <th>Destination Name</th>
                        <th>Price</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Cancel trip</th>
                    </tr>
                </thead>
                <tbody>
                    {
                         usersBookings.map(booking => <tr key={booking._id}>
                                            <td>{booking.destination.name}</td>
                                            <td>${booking.destination.price}</td>
                                            <td>{booking.tourDuration.startDate}</td>
                                            <td>{booking.tourDuration.endDate}</td>
                                        <td>
                                            <button onClick={() => { setModalShow(true); setCancelTripId(booking._id)}} className="btn btn-danger">Cancel trip</button>
                                        </td>
                        </tr>)
                    }
                </tbody>
            </Table>
            <VerticalModal show={modalShow} onHide={() => { setModalShow(false); setCancelTripId('')}} cancel="cancel" handlecanceltrip={handleCancelTrip}>
                <p>Are you sure you want to cancel this trip?</p>
            </VerticalModal>
            <AlertModal show={AlertModalShow} onHide={() => setAlertModalShow(false)} variant="success">Trip cancelled successfully !!!</AlertModal>
        </div>
    );
};

export default MyBookings;