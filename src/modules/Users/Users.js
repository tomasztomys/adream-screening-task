import './users.scss';

import React, { Component } from 'react';
import UserModal from './components/UserModal/UserModal';
import { connect } from 'react-redux';
import DeleteUserModal from './components/DeleteUserModal/DeleteUserModal';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserModalOpen: false,
      isDeleteUserModalOpen: false,
      userId: 0
    };
  }

  renderUserRow(user) {
    return (
      <tr key={user.id}>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>
          <button onClick={this.openUserModal.bind(null, user.id)}>Edytuj</button>
          <button onClick={this.openDeleteUserModal.bind(null, user.id)}>Usuń</button>
        </td>
      </tr>
    );
  }

  renderUsers() {
    const { data } = this.props;

    return (
      <tbody>
        {data.map(user => {
          return this.renderUserRow(user);
        })}
      </tbody>
    );
  }

  renderUsersTable() {
    return (
      <div className="users__table">
        <table>
          <thead>
            <tr>
              <td>Imię</td>
              <td>Nazwisko</td>
              <td>Opcje</td>
            </tr>
          </thead>
          {this.renderUsers()}
        </table>
      </div>
    );
  }

  openUserModal = userId => {
    this.setState({
      isUserModalOpen: true,
      userId
    });
  };

  closeUserModal = () => {
    this.setState({
      isUserModalOpen: false,
      userId: 0
    });
  };

  openDeleteUserModal = userId => {
    this.setState({
      isDeleteUserModalOpen: true,
      userId
    });
  };

  closeDeleteUserModal = () => {
    this.setState({
      isDeleteUserModalOpen: false,
      userId: 0
    });
  };

  render() {
    const { isUserModalOpen, isDeleteUserModalOpen, userId } = this.state;

    return (
      <section className="users">
        <UserModal isOpen={isUserModalOpen} userId={userId} onRequestClose={this.closeUserModal} />
        <DeleteUserModal
          isOpen={isDeleteUserModalOpen}
          userId={userId}
          onRequestClose={this.closeDeleteUserModal}
        />
        <h1>Users</h1>
        {this.renderUsersTable()}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.users.data
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
