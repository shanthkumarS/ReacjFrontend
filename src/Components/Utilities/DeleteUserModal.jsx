import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const DeleteUserModal = ({ user, openModal, setOpenModal }) => {

    const toggle = () => setOpenModal(!openModal);
    const closeBtn = <button size="md" style={{ color: 'white', height: '25px', width: '25px' }} className="bg-dark" onClick={toggle}>X</button>;
    
    return (
        <div>
            <Modal centered isOpen={openModal} toggle={toggle} className="modal-container">
                <ModalHeader style={{ width: '100%' }} close={closeBtn} className="bg-alert">
                    <p style={{ color: 'white' }}>Are your sure, you want to delete the user ?</p>
                </ModalHeader>
                <ModalBody>
                    <button className='btn btn-alert'>YES</button>
                    <button className='btn btn-primary'>No</button>
                </ModalBody>
            </Modal>
        </div >
    )
}

export default DeleteUserModal;