import React from 'react';

import UsersBody from './UsersBody';

export default function UsersTable({ data, openUserModal, openDeleteUserModal, onSortEnd }) {
  if (!data?.length) return <div>Empty</div>;

  return (
    <div className="users__table">
      <table>
        <thead>
          <tr>
            <td>First name</td>
            <td>Last name</td>
            <td>Options</td>
          </tr>
        </thead>
        <UsersBody
          onSortEnd={onSortEnd}
          items={data}
          openUserModal={openUserModal}
          openDeleteUserModal={openDeleteUserModal}
        />
      </table>
    </div>
  );
}
