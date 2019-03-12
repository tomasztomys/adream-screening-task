import React from 'react';

import UsersBody from './UsersBody';

export default function UsersTable({
  data,
  openUserModal,
  openDeleteUserModal,
  onSortEnd,
  isEditing
}) {
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
          disabled={isEditing}
          onSortEnd={onSortEnd}
          items={data}
          openUserModal={openUserModal}
          openDeleteUserModal={openDeleteUserModal}
          lockAxis="y"
          lockToContainerEdges
        />
      </table>
    </div>
  );
}
