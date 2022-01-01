import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import AlertModal from '../Shared/AlertModal/AlertModal';
import VerticalModal from '../Shared/VerticalModal/VerticalModal';

const AdminAllDestination = () => {
    const [allDestinations, setAllDestinations] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [AlertModalShow, setAlertModalShow] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [control, setControl] = useState(false);

    useEffect(() => {
        fetch('https://gruesome-village-05256.herokuapp.com/all-destinations')
            .then(res => res.json())
            .then(data => {
                setAllDestinations(data)
            })
    }, [control])


    const handleDelete = () => {
        fetch(`https://gruesome-village-05256.herokuapp.com/all-destinations/${deleteId}`, {
            method: 'DELETE',
            headers: {"Content-type" : "application/json"}
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
    return (
        <div className="container">
            <h1 style={{color:"#00095e", marginBottom: 30}}>All Destinations</h1>
            <div style={{overflowX:"scroll"}}>
                <Table striped bordered hover className="w-75 container">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Thumbnails</th>
                            <th>Destination Name</th>
                            <th>Price</th>
                            <th>Time</th>
                            <th>Loved By</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allDestinations.map((destination, index) => <tr key={destination._id}>
                                            <td>{index + 1}</td>
                                            <td><img src={destination.img} style={{objectFit:"cover", width:"100px", height:"100px" }} alt="This img is not available"/></td>
                                            <td>{destination.name}</td>
                                            <td>${destination.price}</td>
                                            <td>{destination.time}</td>
                                            <td>{destination.loved}</td>
                                            <td>
                                                <button onClick={() => { setModalShow(true); setDeleteId(destination._id)}} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>)
                        }
                    </tbody>
                </Table>
        </div>
        <VerticalModal show={modalShow} onHide={() => { setModalShow(false); setDeleteId('')}} deletedestination="deleteDestination" handledelete={handleDelete}>
            <p>Are you sure you want to delete this destination?</p>
        </VerticalModal>
        <AlertModal show={AlertModalShow} onHide={() => setAlertModalShow(false)} variant="success">Trip cancelled successfully !!!</AlertModal>
    </div>
    );
};

export default AdminAllDestination;