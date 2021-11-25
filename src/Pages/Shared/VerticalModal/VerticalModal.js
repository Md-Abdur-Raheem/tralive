import React from 'react';
import { Button }  from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import useAuth from '../../../hooks/useAuth';
import AlertModal from '../AlertModal/AlertModal';
import './VerticalModal.css'

const VerticalModal = (props) => {
    const { logOut, setAlertModalShow } = useAuth();

    const handleLogout = ()=> {
        logOut();
        props.onHide();
        setAlertModalShow(true);
    }

    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                {
                    props.logout && <>
                        <Modal.Header closeButton>
                            <Modal.Title className="text-center modal-title">
                                {props.children}
                            </Modal.Title>
                        </Modal.Header>
                        {/* <Modal.Body>
                        </Modal.Body> */}
                    </>
                }
                <Modal.Footer>
                    <Button className="modal-btn" onClick={props.onHide}>Cancel</Button>
                    {
                        props.logout && <><Button className="modal-btn" variant="danger" onClick={handleLogout}>Logout</Button></>
                    }
                </Modal.Footer>
               
            </Modal >
            <AlertModal variant="success">Logout successfully!!!</AlertModal>
        </>
    );
};

export default VerticalModal;