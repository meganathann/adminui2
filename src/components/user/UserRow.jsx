import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles.css";

const UserRow = ({
  user,
  isSelected,
  onRowClick,
  onSelectUser,
  onDeleteUser,
  onEditUserInfo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedRole, setEditedRole] = useState(user.role);

  const handleCheckboxChange = () => {
    onSelectUser(user.id);
  };

  const handleRowSelection = () => {
    if (onRowClick) {
      onRowClick(user.id);
    }
  };

  const handleDeleteClick = () => {
    onDeleteUser(user.id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedUser = {
      ...user,
      name: editedName,
      email: editedEmail,
      role: editedRole,
    };
    onEditUserInfo(user.id, updatedUser);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditedRole(user.role);
  };

  return (
    <tr
      className={isSelected ? "selected-row" : ""}
      onClick={handleRowSelection}
    >
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>{user.id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="form-control"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          user.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="form-control"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
        ) : (
          user.email
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="form-control"
            value={editedRole}
            onChange={(e) => setEditedRole(e.target.value)}
          />
        ) : (
          user.role
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button
              className="btn btn-success btn-sm"
              onClick={handleSaveClick}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button
              className="btn btn-danger btn-sm ml-2"
              onClick={handleCancelClick}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleEditClick}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={handleDeleteClick}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
