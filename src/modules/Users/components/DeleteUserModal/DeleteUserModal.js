import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../libs/ui/Modal';
import { deleteUser } from '../../actions';
import { toastr } from 'react-redux-toastr';
import { selectUsers } from '../../selectors';

const DeleteUserModal = ({ isOpen, onRequestClose, userId, deleteUser, user, isDeleting }) => {
  const deleteUserRequest = userId => {
    new Promise((resolve, reject) => {
      deleteUser(userId, resolve, reject);
    })
      .then(() => {
        onRequestClose();
        toastr.success('Delete user success.');
      })
      .catch(() => {
        toastr.error('Delete user failure.');
      });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <span>{`Do you want delete user ${user?.firstName} ${user?.lastName}?`}</span>
      <button onClick={deleteUserRequest.bind(null, userId)} disabled={isDeleting}>
        Yes
      </button>
      <button onClick={onRequestClose} disabled={isDeleting}>
        NO
      </button>
      {isDeleting && <span>Deleting...</span>}
    </Modal>
  );
};

const mapStateToProps = (state, props) => {
  return {
    isDeleting: state.users.statuses.isDeleting,
    user: selectUsers(state, props.userId)
  };
};

const mapDispatchToProps = {
  deleteUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteUserModal);
