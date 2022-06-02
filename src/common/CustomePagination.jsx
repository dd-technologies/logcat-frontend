import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { alarmAction } from "../redux/action/AlarmAction";
import { getProjectByCode } from "../redux/action/ProjectAction";

export default function CustomPagination({
  // DATE USE FOR TWO PROPS TABLE = DATE = START & END , ALARM DATE = DATE DIFFERENCE

  itemsPerPage,
  items,
  pageCount,
  actionType,
  code,
  projectType,
  date = null,
  logType = null,
}) {
  console.log("items", items);

  const dispatch = useDispatch();

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    console.log("EVENT", event);

    if (actionType == "alarmAction") {
      dispatch(
        alarmAction(code, projectType, date, event.selected + 1, itemsPerPage)
      );
      localStorage.setItem("page_no", event.selected + 1);
    }
    if (actionType == "getProjectByCode") {
      dispatch(
        getProjectByCode(
          code,
          date,
          logType,
          event.selected + 1,
          itemsPerPage,
          projectType
        )
      );
      localStorage.setItem("page_no", event.selected + 1);
    }
  };

  return (
    <>
      {console.log("render pagination")}
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={<a href="">...</a>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(pageCount / itemsPerPage)}
        renderOnZeroPageCount={null}
        subContainerClassName={"pages pagination"}
        marginPagesDisplayed={2}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        disableInitialCallback={true}
        
      />
    </>
  );
}
