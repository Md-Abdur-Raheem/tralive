import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import useAuth from '../../../hooks/useAuth';
import './AlertModal.css';


const AlertModal = (props) => {
    const { AlertModalShow, setAlertModalShow } = useAuth();
    const { variant } = props;
    return (
        <Modal
        {...props}
        show={AlertModalShow}
        onHide={() => setAlertModalShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Body className="alert-modal">
                <Alert variant={variant}>
                    {props.children}
                </Alert>
            </Modal.Body>
        </Modal>
    );
};

export default AlertModal;