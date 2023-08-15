import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faStepForward,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles.css";

const Pagination = ({ currentPage, totalPage, onPageChange }) => {
  const handleFirstPageClick = () => {
    onPageChange(1);
  };

  const handleLastPageClick = () => {
    onPageChange(totalPage);
  };

  const handlePreviousPageClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPageClick = () => {
    onPageChange(currentPage + 1);
  };

  const generatePageButtons = () => {
    const buttons = [];
    for (let page = 1; page <= totalPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      );
    }
    return buttons;
  };

  return (
    <footer className="pagination">
      <button onClick={handleFirstPageClick} disabled={currentPage === 1}>
        <FontAwesomeIcon icon={faAngleDoubleLeft} size="xs" />
      </button>
      <button onClick={handlePreviousPageClick} disabled={currentPage === 1}>
        <FontAwesomeIcon icon={faStepBackward} size="xs" />
      </button>
      {generatePageButtons()}
      <button
        onClick={handleNextPageClick}
        disabled={currentPage === totalPage}
      >
        <FontAwesomeIcon icon={faStepForward} size="xs" />
      </button>
      <button
        onClick={handleLastPageClick}
        disabled={currentPage === totalPage}
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} size="xs" />
      </button>
    </footer>
  );
};

export default Pagination;
