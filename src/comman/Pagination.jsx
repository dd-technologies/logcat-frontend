import React from "react";
import ReactPaginate from "react-paginate";

export default function Pagination({
  data,
  record,
  handlePageClick,
}) {
  return (
    <ReactPaginate
      breakLabel=". . ."
      nextLabel="Next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={4}
      pageCount={Math.ceil(data / record)}
      renderOnZeroPageCount={null}
      containerClassName={"pagination"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      nextClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  );
}
