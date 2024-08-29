import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-3 py-1 mx-1 border rounded">
        Previous
      </button>
      <span className="mx-2">
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-3 py-1 mx-1 border rounded">
        Next
      </button>
    </div>
  );
};

export default Pagination;
