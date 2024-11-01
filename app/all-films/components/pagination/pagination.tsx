import React from 'react';
import styles from './pagination.module.scss';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => (
  <nav aria-label="Page navigation" className={`d-flex justify-content-center mt-3 ${styles.content}`}>
    <ul className={`pagination ${styles.paginationCustom}`}>
      <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => setCurrentPage(currentPage - 1)}
          aria-label="Previous"
          disabled={currentPage === 0}
        >
          &laquo; Previous
        </button>
      </li>
      {[...Array(totalPages)].map((_, index) => (
        <li key={index} className={`page-item ${currentPage === index ? 'active' : ''}`}>
          <button
            className="page-link"
            onClick={() => setCurrentPage(index)}
          >
            {index + 1}
          </button>
        </li>
      ))}
      <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => setCurrentPage(currentPage + 1)}
          aria-label="Next"
          disabled={currentPage === totalPages - 1}
        >
          Next &raquo;
        </button>
      </li>
    </ul>
  </nav>
);

export default Pagination;
