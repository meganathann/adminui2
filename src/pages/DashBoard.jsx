import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SearchBox from "../components/common/SearchBox";
import UserTable from "../components/table/UserTable";
import ApiService from "../services/ApiService";
import "../styles.css";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isAllUsersSelected, setIsAllUsersSelected] = useState(false);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const data = await ApiService.getUsers();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelectAllUsers = () => {
    if (isAllUsersSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(dataPerPage.map((user) => user.id));
    }
    setIsAllUsersSelected(!isAllUsersSelected);
  };

  const handleDeleteSelected = () => {
    // Remove selected users from userData
    const updatedData = userData.filter(
      (user) => !selectedUsers.includes(user.id)
    );
    setUserData(updatedData);

    // Clear selectedUsers array and uncheck "Select All" checkbox
    setSelectedUsers([]);
    setIsAllUsersSelected(false);
  };

  // Calculate dataPerPage here
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
    <div className="container">
      <Header />
      <SearchBox
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <UserTable
        userData={userData}
        searchQuery={searchQuery}
        selectedUsers={selectedUsers}
        onSelectUser={(userId) =>
          setSelectedUsers((prevSelected) => [...prevSelected, userId])
        }
        onDeselectUser={(userId) =>
          setSelectedUsers((prevSelected) =>
            prevSelected.filter((id) => id !== userId)
          )
        }
        onDeleteUser={(userId) =>
          setUserData((prevData) =>
            prevData.filter((user) => user.id !== userId)
          )
        }
        onEditUserInfo={(userId, updatedUser) => {
          setUserData((prevData) =>
            prevData.map((user) =>
              user.id === userId ? { ...user, ...updatedUser } : user
            )
          );
        }}
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        onSelectAllUsers={handleSelectAllUsers}
        isAllUsersSelected={isAllUsersSelected}
        dataPerPage={dataPerPage} 
      />
      <button className="btn btn-danger my-3" onClick={handleDeleteSelected}>
        Delete Selected
      </button>
      <Footer
        currentPage={currentPage}
        totalPage={Math.ceil(filteredData.length / usersPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Dashboard;
