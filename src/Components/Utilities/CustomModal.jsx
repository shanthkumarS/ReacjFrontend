import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import EditUser from '../Forms/EditUser';


const CustomModal = ({ user, openModal, setOpenModal }) => {

    const toggle = () => setOpenModal(!openModal);
    const closeBtn = <button size="md" style={{ color: 'white', height: '25px', width: '25px' }} className="bg-dark" onClick={toggle}>X</button>;
    
    return (
        <div>
            <Modal centered isOpen={openModal} toggle={toggle} className="modal-container">
                <ModalHeader style={{ width: '100%' }} close={closeBtn} className="bg-dark">
                    <p style={{ color: 'white' }}>Edit User</p>
                </ModalHeader>
                <ModalBody>
                    <EditUser user={user}/>
                </ModalBody>
            </Modal>
        </div >
    )
}

export default CustomModal;