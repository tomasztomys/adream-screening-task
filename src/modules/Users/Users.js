import './users.scss';

import React, { Component } from 'react';
import UserModal from './components/UserModal/UserModal';
import { connect } from 'react-redux';
import DeleteUserModal from './components/DeleteUserModal/DeleteUserModal';
import UsersTable from './components/UsersTable/UsersTable';
import { arrayMove } from 'react-sortable-hoc';
import { find, sortBy } from 'lodash';
import { editUser, setEditUserRequest } from './actions';
import { selectUsers } from './selectors';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserModalOpen: false,
      isDeleteUserModalOpen: false,
      userId: 0,
      order: props.data.map(user => user.id)
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.length !== this.props.data.length) {
      this.setState({
        order: this.props.data.map(user => user.id)
      });
    }
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

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { order } = this.state;

    const newOrder = arrayMove(order, oldIndex, newIndex);
    this.setState({
      order: newOrder
    });

    Promise.all(
      newOrder.map((userId, index) => {
        const user = find(this.props.data, user => user.id === userId);
        return new Promise((resolve, reject) => {
          this.props.setEditUserRequest(user);
          setTimeout(() => {
            this.props.editUser({ ...user, position: index }, resolve, reject);
          }, index * 100);
        });
      })
    );
  };

  render() {
    const { isUserModalOpen, isDeleteUserModalOpen, userId } = this.state;
    const { data, isEditing } = this.props;

    return (
      <section className="users">
        {isUserModalOpen && (
          <UserModal isOpen userId={userId} onRequestClose={this.closeUserModal} />
        )}
        {isDeleteUserModalOpen && (
          <DeleteUserModal isOpen userId={userId} onRequestClose={this.closeDeleteUserModal} />
        )}
        <h1>Users</h1>
        <UsersTable
          data={sortBy(data, user => this.state.order.indexOf(user.id))}
          openUserModal={this.openUserModal}
          openDeleteUserModal={this.openDeleteUserModal}
          onSortEnd={this.onSortEnd}
          isEditing={isEditing}
        />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: selectUsers(state),
    isEditing: !!state.users.statuses.isEditing.length
  };
};

const mapDispatchToProps = {
  editUser,
  setEditUserRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
