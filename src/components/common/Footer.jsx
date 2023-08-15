import React from "react";
import "../../styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

const Footer = ({ currentPage, totalPage, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPage) {
      onPageChange(page);
    }
  };

  const generatePageButtons = () => {
    const buttons = [];
    for (let page = 1; page <= totalPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`btn btn-secondary ${
            currentPage === page ? "active" : ""
          }`}
        >
          {page}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="pagination d-flex justify-content-center">
      <button
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
        className="btn btn-secondary"
      >
        <FontAwesomeIcon icon={faAngleDoubleLeft} className="small-icon" />
      </button>
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-secondary"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="small-icon" />
      </button>
      {generatePageButtons()}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPage}
        className="btn btn-secondary"
      >
        <FontAwesomeIcon icon={faArrowRight} className="small-icon" />
      </button>
      <button
        onClick={() => handlePageClick(totalPage)}
        disabled={currentPage === totalPage}
        className="btn btn-secondary"
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} className="small-icon" />
      </button>
    </div>
  );
};

export default Footer;
