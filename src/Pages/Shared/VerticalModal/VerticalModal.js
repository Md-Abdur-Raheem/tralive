import React from 'react';
import { useState } from 'react';
import { Button }  from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import useAuth from '../../../hooks/useAuth';
import AlertModal from '../AlertModal/AlertModal';
import './VerticalModal.css'

const VerticalModal = (props) => {
    const { logOut } = useAuth();
    const [AlertModalShow, setAlertModalShow] = useState(false);

    const handleLogout = ()=> {
        logOut();
        props.onHide();
        setAlertModalShow(true)
    }

    return (
        <div>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                {
                    props.logout && <div style={{backgroundColor: "white", border: "1px solid rgb(0,0,0,.2)"}}>
                        <Modal.Header closeButton>
                            <Modal.Title className="text-center modal-title">
                                {props.children}
                            </Modal.Title>
                        </Modal.Header>
                        {/* <Modal.Body>
                        </Modal.Body> */}
                    </div>
                }
                {
                    props.cancel && <div style={{backgroundColor: "white", border: "1px solid rgb(0,0,0,.2)"}}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-center modal-title">
                            {props.children}
                        </Modal.Title>
                    </Modal.Header>
                    {/* <Modal.Body>
                    </Modal.Body> */}
                </div>
                }
                {
                    props.delete && <div style={{backgroundColor: "white", border: "1px solid rgb(0,0,0,.2)"}}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-center modal-title">
                            {props.children}
                        </Modal.Title>
                    </Modal.Header>
                    {/* <Modal.Body>
                    </Modal.Body> */}
                </div>
                }
                <Modal.Footer style={{backgroundColor: "white", border: ".5px solid rgb(0,0,0,.2)"}}>
                    <Button className="modal-btn" onClick={props.onHide}>Cancel</Button>
                    {
                        props.logout && <><Button className="modal-btn" variant="danger" onClick={handleLogout}>Logout</Button></>
                    }
                    {
                        props.cancel && <><Button className="modal-btn" variant="danger" onClick={props.handlecanceltrip}>Cancel Trip</Button></>
                    }
                    {
                        props.delete && <><Button className="modal-btn" variant="danger" onClick={props.handledeletetrip}>Delete Trip</Button></>
                    }
                </Modal.Footer>
            </Modal >
            
            <AlertModal show={AlertModalShow} onHide={() => setAlertModalShow(false)} variant="success">Logout successfully !!!</AlertModal>
        </div>
    );
};

export default VerticalModal;