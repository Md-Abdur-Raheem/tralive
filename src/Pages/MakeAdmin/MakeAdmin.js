import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import AlertModal from '../Shared/AlertModal/AlertModal';

const MakeAdmin = () => {
    const [admins, setAdmins] = useState([]);
    const emailRef = useRef();
    const [AlertModalShow, setAlertModalShow] = useState(false);
    const [control, setControl] = useState(false);

    useEffect(() => {
        fetch('https://gruesome-village-05256.herokuapp.com/adminUsers')
            .then(res => res.json())
            .then(data => setAdmins(data));
    },[control])


    
    const makeAdmin = e => {
    
        const email = emailRef.current.value;
        fetch('https://gruesome-village-05256.herokuapp.com/adminUsers', {
            method: "POST",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify({email})
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setAlertModalShow(true);
                    setControl(!control);
                    emailRef.current.value = "";
                }
            })
        e.preventDefault();
    }

    const deleteAdmin = email => {
        fetch(`http://localhost:5000/adminUsers/${email}`, {
            method: "PUT",
            headers: { 'content-type': "application/json" }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    // setAlertModalShow(true);
                    setControl(!control);
                }
            })
    }

    return (
        <Container>
            <div>
                <h1 style={{color: "#00095e"}}>Make & Watch admin</h1>
                <form onSubmit={makeAdmin}> 
                    <input className=" w-sm-75" style={{border: '1px solid black',height: "50px" ,margin: "10px", borderRadius: "50px", backgroundColor: "rgba(255, 255, 255, 0.836)",padding: "20px"}} type="email" placeholder="Enter email address" ref={emailRef}></input>
                    <input className="hero-btn login-btn" type="submit" value="Make Admin" />
                </form>
            </div>


            <div style={{overflowX:"scroll"}}>
                <Table striped bordered hover className="w-75 container">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Email Verification</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        admins.map((admin, index) => <tr key={admin._id}>
                            <td>{index + 1}</td>
                            <td>{ admin.Id }</td>
                            <td>{admin.Name}</td>
                            <td>{admin.Email}</td>
                            <td>{admin.Email_Verified.toString()}</td>
                            <td>
                                <button onClick={()=>deleteAdmin(admin.Email)} className="btn btn-danger">Remove</button>
                            </td>
                        </tr>)
                    }
                </tbody>
                </Table>
            </div>
            <AlertModal show={AlertModalShow} onHide={() => setAlertModalShow(false)} variant="success">Admin added successfully !!!</AlertModal>
        </Container>
    );
};

export default MakeAdmin;