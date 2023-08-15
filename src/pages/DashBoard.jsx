import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SearchBox from "../components/common/SearchBox";
import UserTable from "../components/user/UserTable";
import ApiService from "../services/ApiService";
import "../styles.css";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
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

  const handleDeleteSelected = () => {
    // Remove selected users from userData
    const updatedData = userData.filter(
      (user) => !selectedUsers.includes(user.id)
    );
    setUserData(updatedData);

    // Clear selectedUsers array
    setSelectedUsers([]);
  };

  return (
    <div className="container">
      {" "}
      {/* Apply Bootstrap container class for responsive layout */}
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
        onPageChange={handlePageChange}
        currentPage={currentPage}
        usersPerPage={usersPerPage}
      />
      <button className="btn btn-danger my-3" onClick={handleDeleteSelected}>
        Delete Selected
      </button>
      <Footer
        currentPage={currentPage}
        totalPage={Math.ceil(userData.length / usersPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Dashboard;
