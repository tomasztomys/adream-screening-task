import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import Modal from '../../../../libs/ui/Modal';
import { selectUsers } from '../../selectors';
import { editUser } from '../../actions';

class UserModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: props.user.firstName,
      lastName: props.user.lastName
    };
  }

  onSubmit = (e) => {
    const { user, editUser, onRequestClose } = this.props;
    const { firstName, lastName } = this.state;

    e.preventDefault();
    e.stopPropagation();

    new Promise((resolve, reject) => {
      editUser(
        {
          ...user,
          firstName,
          lastName
        },
        resolve,
        reject
      );
    })
      .then(() => {
        onRequestClose();
        toastr.success('Edit user success.');
      })
      .catch(error => {
        toastr.error('Edit user failure.');
      });
  };

  onFirstNameChange = e => {
    this.setState({
      firstName: e.target.value
    });
  };

  onLastNameChange = e => {
    this.setState({
      lastName: e.target.value
    });
  };

  render() {
    const { isOpen, onRequestClose, user, isEditing } = this.props;
    const { firstName, lastName } = this.state;

    return (
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <h2>UserModal</h2>
        <img src={user.avatar} alt="user avatar" />
        <form onSubmit={e => this.onSubmit()}>
        <input type="text" value={firstName} onChange={this.onFirstNameChange} />
        <input type="text" value={lastName} onChange={this.onLastNameChange} />
        <button onClick={this.onSubmit} disabled={isEditing}>
          Save
        </button>
        {isEditing && <span>Editing</span>}
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: selectUsers(state, props.userId),
    isEditing: state.users.statuses.isEditing
  };
};

const mapDispatchToProps = {
  editUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserModal);
