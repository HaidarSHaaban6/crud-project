import React from "react";
import prevIcon from "./../../assets/Prev.svg";
import nextIcon from "./../../assets/Next.svg";

interface Item {
  id: number;
  name: string;
  price: string;
  image_url: string;
}

type PaginationProps = {
  dataArray: Item[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
  dataArray,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}) => {
  const totalPages = Math.ceil(dataArray.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPaginationButtons = () => {
    const paginationButtons = [];

    if (totalPages <= 4) {
      for (let index = 1; index <= totalPages; index++) {
        paginationButtons.push(
          <span
            key={index}
            onClick={() => handlePageChange(index)}
            className={`lg:w-[60px] lg:h-[60px] sm:w-12 sm:h-12 w-9 h-9 rounded-full flex justify-center items-center border hover:cursor-pointer ${
              currentPage === index ? "bg-main-theme-color-100 text-white" : ""
            }`}
          >
            {index}
          </span>
        );
      }
    } else {
      paginationButtons.push(
        <span
          key={1}
          onClick={() => handlePageChange(1)}
          className={`lg:w-[60px] lg:h-[60px] sm:w-12 sm:h-12 w-9 h-9 rounded-full flex justify-center items-center border hover:cursor-pointer ${
            currentPage === 1 ? "bg-main-theme-color-100 text-white" : ""
          }`}
        >
          1
        </span>
      );

      if (currentPage > 3) {
        paginationButtons.push(<span key="start-dots">...</span>);
      }

      for (
        let index = Math.max(2, currentPage - 1);
        index <= Math.min(totalPages - 1, currentPage + 1);
        index++
      ) {
        paginationButtons.push(
          <span
            key={index}
            onClick={() => handlePageChange(index)}
            className={`lg:w-[60px] lg:h-[60px] sm:w-12 sm:h-12 w-9 h-9 rounded-full flex justify-center items-center border hover:cursor-pointer ${
              currentPage === index ? "bg-main-theme-color-100 text-white" : ""
            }`}
          >
            {index}
          </span>
        );
      }

      if (currentPage < totalPages - 2) {
        paginationButtons.push(<span key="end-dots">...</span>);
      }

      paginationButtons.push(
        <span
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`lg:w-[60px] lg:h-[60px] sm:w-12 sm:h-12 w-9 h-9 rounded-full flex justify-center items-center border hover:cursor-pointer ${
            currentPage === totalPages
              ? "bg-main-theme-color-100 text-white"
              : ""
          }`}
        >
          {totalPages}
        </span>
      );
    }

    return paginationButtons;
  };

  return (
    <div className="flex items-center gap-1">
      <span
        onClick={() => handlePageChange(currentPage - 1)}
        className="lg:w-[60px] lg:h-[60px] sm:w-12 sm:h-12 w-9 h-9 rounded-full flex justify-center items-center border hover:cursor-pointer hover:bg-main-theme-color-100"
      >
        <img src={prevIcon} alt="Previous" />
      </span>

      {renderPaginationButtons()}

      <span
        onClick={() => handlePageChange(currentPage + 1)}
        className="lg:w-[60px] lg:h-[60px] sm:w-12 sm:h-12 w-9 h-9 rounded-full flex justify-center items-center border hover:cursor-pointer hover:bg-main-theme-color-100"
      >
        <img src={nextIcon} alt="Next" />
      </span>
    </div>
  );
};

export default Pagination;
