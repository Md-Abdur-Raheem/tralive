import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
// import useAuth from '../../../hooks/useAuth';
import './AlertModal.css'


const AlertModal = (props) => {
    const { variant } = props;
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
                <Alert variant={variant}>{props.children}</Alert>
        </Modal>
    );
};

export default AlertModal;