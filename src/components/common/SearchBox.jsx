import React from "react";
import "../../styles.css"; // Adjust the import path based on the directory structure

const SearchBox = ({ searchQuery, onSearchChange }) => {
  const handleInputChange = (event) => {
    const query = event.target.value;
    onSearchChange(query);
  };

  return (
    <div className="search-box bg-dark text-white py-3">
      <div className="container">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
    </div>
  );
};

export default SearchBox;
