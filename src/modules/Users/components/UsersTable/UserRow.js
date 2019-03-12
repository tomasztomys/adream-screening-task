import './user_row_styles.scss';

import React from 'react';
import classnames from 'classnames';

import { SortableElement } from 'react-sortable-hoc';

const UsersRow = SortableElement(({ user, openUserModal, openDeleteUserModal, disabledRow }) => {
  return (
    <tr className={classnames('user-row', { disabled: disabledRow })}>
      <td className="user-row__first-name">{user.firstName}</td>
      <td className="user-row__last-name">{user.lastName}</td>
      <td className="user-row__options">
        <button onClick={openUserModal.bind(null, user.id)}>Edit</button>
        <button onClick={openDeleteUserModal.bind(null, user.id)}>Delete</button>
      </td>
    </tr>
  );
});

export default UsersRow;
