import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectByCode } from "../../../../redux/action/ProjectAction";
import Style from "./TablePaginationN.module.css";

export default function TablePaginationN({ code, date, logType, record }) {
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);

  // PAGINATION DATA REDUCER
  const getAllLogByCodeReducer = useSelector(
    (state) => state.getAllLogByCodeReducer
  );
  const dispatch = useDispatch();

  const { loading, data } = getAllLogByCodeReducer;

  // DATA COUNT
  const dataCount = data && data.data && data.data.count;

  // DATA PER PAGE
  const totalPage = Math.ceil(dataCount / record);

  const startPage = 1;
  const endPage = totalPage;

  var startIndex = (currentPage - 1) * record;
  var endIndex = Math.min(startIndex + record - 1, dataCount - 1);
  // create an array of pages to ng-repeat in the pager control
  var pages = [...Array(endPage + 1 - currentPage).keys()].map(
    (i) => startPage + i
  );

  //   PAGE NO SELECTED FUNCTION
  const selectedPageFun = (index) => {
    setPage(index + 1);
    dispatch(getProjectByCode(code, date, logType, page, record, "001"));
  };

  const lastThreePages = pages.slice(-2);
  console.log(
    "data pagination",
    dataCount,
    record,
    totalPage,
    "prviosuepage",
    prevPage,
    nextPage,
    lastThreePages,
    pages,
    page
  );

  return (
    <section className={Style.PaginationOuter}>
      <section
        className={Style.Pages}
        onClick={() => setPrevPage(totalPage - 1)}
      >
        <p>Prev</p>
      </section>
      {/* PAGES  */}
      {/* FIRST 3 indexs */}
      {pages.map((item, index) => {
        return (
          <>
            {index < 2 && (
              <section
                className={Style.Pages}
                onClick={() => selectedPageFun(index)}
              >
                <p>{item}</p>
              </section>
            )}
          </>
        );
      })}
      {totalPage > 4 && (
        <section className={Style.Pages}>
          <p>....</p>
        </section>
      )}

      {/* last 3 index  if page greater than 8*/}
      {pages.length > 9 &&
        pages.map((item, index) => {
          return (
            <>
              <section
                className={Style.Pages}
                onClick={() => selectedPageFun(index)}
              >
                <p>{item}</p>
              </section>
            </>
          );
        })}

      <section
        className={Style.Pages}
        onClick={() => setNextPage(totalPage + 1)}
      >
        <p>next</p>
      </section>
    </section>
  );
}
