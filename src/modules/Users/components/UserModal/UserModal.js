import React from 'react';
import Modal from "../../../../libs/ui/Modal";

const UserModal = ({isOpen, onRequestClose}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>UserModal</h2>
    </Modal>
  );
};

export default UserModal;
