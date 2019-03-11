import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../libs/ui/Modal';
import { deleteUser } from '../../actions';

const DeleteUserModal = ({ isOpen, onRequestClose, userId, deleteUser }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      {`Do you want delete user ${userId}?`}
      <button onClick={deleteUser.bind(null, userId)}>Yes</button>
      <button onClick={onRequestClose}>NO</button>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    isDeleting: false
  };
};

const mapDispatchToProps = {
  deleteUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteUserModal);
