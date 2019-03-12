import React from 'react';

import UserRow from './UserRow';
import { SortableContainer } from 'react-sortable-hoc';

const UsersBody = SortableContainer(({ items, openUserModal, openDeleteUserModal }) => {
  return (
    <tbody>
      {items.map((user, index)=> {
        return (
          <UserRow
            index={index}
            key={user.id}
            user={user}
            openUserModal={openUserModal}
            openDeleteUserModal={openDeleteUserModal}
          />
        );
      })}
    </tbody>
  );
});

export default UsersBody;
