import React from "react";
import UserRow from "./UserRow";
import "../../styles.css";

const UserTable = ({
  userData,
  searchQuery,
  selectedUsers,
  onSelectUser,
  onDeselectUser,
  onDeleteUser,
  onEditUserInfo,
  currentPage,
  usersPerPage,
  onRowClick,
  onSelectAllUsers, // Add the new prop for selecting all users
  isAllUsersSelected, // Add the new prop for indicating if all users are selected
}) => {
  const filteredData = userData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const firstIndex = (currentPage - 1) * usersPerPage;
  const lastIndex = firstIndex + usersPerPage;
  const dataPerPage = filteredData.slice(firstIndex, lastIndex);

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllUsersSelected}
                onChange={onSelectAllUsers}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataPerPage.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              isSelected={selectedUsers.includes(user.id)}
              onSelectUser={onSelectUser}
              onDeselectUser={onDeselectUser}
              onDeleteUser={onDeleteUser}
              onEditUserInfo={onEditUserInfo}
              onRowClick={onRowClick}
              canDeselect={!selectedUsers.includes(user.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
