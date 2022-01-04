import React, { useState, useEffect, useRef } from "react";
import CustomCard from "../../../../Container/CustomCard";
import BootstrapTable from "react-bootstrap-table-next";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faEllipsisV,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import Style from "./TableData.module.scss";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getProjectByCode } from "../../../../redux/action/ProjectAction";
import Spinner from "../../../../Container/Spinner";
import toast, { Toaster } from "react-hot-toast";
// import CustomeFilterTable from "./CustomeFilterTable";

const { SearchBar } = Search;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const { ExportCSVButton } = CSVExport;
var dt = {};

// function errorFormatter(cell, row) {
//   if (row.logType) {
//     return (
//       <span>
//         {cell === "error" ? (
//           <strong style={{ color: "red" }}>{cell.toUpperCase()}</strong>
//         ) : cell === "warn" ? (
//           <strong style={{ color: "violet" }}>{cell.toUpperCase()}</strong>
//         ) : cell === "info" ? (
//           <strong style={{ color: "blue" }}>{cell.toUpperCase()}</strong>
//         ) : cell === "verbose" ? (
//           <strong style={{ color: "green" }}>{cell.toUpperCase()}</strong>
//         ) : (
//           <strong style={{ color: "orange" }}>{cell.toUpperCase()}</strong>
//         )}
//       </span>
//     );
//   }

//   return <span>$ {cell} NTD</span>;
// }

// const defaultSorted = [
//   {
//     dataField: "name",
//     order: "desc",
//   },
// ];

// var queryAllSting = { value1: "at", value2: "" };

// const StackOptions = () => {
//   localStorage.setItem("queryAllSting", JSON.stringify(queryAllSting));
// };

// const columns = [
//   {
//     headerStyle: () => {
//       return {
//         backgroundColor: "#257d7c",
//         color: "#fff",
//       };
//     },
//     dataField: "did",
//     text: "Mac address",
//     sort: true,
//   },

//   {
//     dataField: "logMsg",
//     text: "Log Message",
//     headerAlign: "center",
//     headerStyle: () => {
//       return {
//         backgroundColor: "#257d7c",
//         color: "#fff",
//       };
//     },
//     formatter: (col, row) => {
//       // console.log("row id mil", row);
//       const newCode = urlParams.get("code");
//       const projectName = urlParams.get("name");
//       // const version = urlParams.get('version')
//       // const osArchitecture = urlParams.get('osArchitecture')
//       // console.log("now_code", newCode);
//       // console.log(`start ${dt.start} and end ${dt.end}`)
//       return (
//         <div
//           style={{
//             width: "250px",
//             height: "auto",
//             overflow: "hidden",
//           }}
//         >
//           <ReactReadMoreReadLess
//             charLimit={40}
//             readMoreText={"Read more ▼"}
//             readLessText={"Read less ▲"}
//           >
//             {col}
//           </ReactReadMoreReadLess>
//           <Link
//             to={`/analytics?code=${newCode}&name=${projectName}&col=${col}`}
//           >
//             <span className={Style.ViewButton}>
//               <FontAwesomeIcon icon={faCaretRight} />
//             </span>
//           </Link>
//         </div>
//       );
//     },

//     //  to={`/analytics?code=${code}&name=Stack Trace&id=${row._id}&allStacks=${row.logMsg}&macAddress=${row.did}&loggenrateddate=${row.logGeneratedDate}&modeltype=${row.device_types}&logtype=${row.logType}`}

//     // style: { backgroundColor: 'green' }
//   },
//   {
//     dataField: "logType",
//     text: "Log Type",
//     headerStyle: () => {
//       return {
//         backgroundColor: "#257d7c",
//         color: "#fff",
//       };
//     },
//     formatter: errorFormatter,
//     sort: true,
//   },
//   {
//     dataField: "logGeneratedDate",
//     text: "Log Generated At",
//     width: "20",
//     headerStyle: () => {
//       return {
//         backgroundColor: "#257d7c",
//         color: "#fff",
//       };
//     },
//     formatter: (cell) => cell.split("T")[0],
//     sort: true,
//   },

//   // {
//   //     dataField: 'logGeneratedDate',
//   //     text: 'Log Generated Time',
//   //   //   filter: textFilter(),
//   //     formatter: cell => cell.split("T")[1],
//   //     sort:true
//   //   },

//   {
//     dataField: "device_types",
//     text: "Device Code",
//     headerStyle: () => {
//       return {
//         backgroundColor: "#257d7c",
//         color: "#fff",
//       };
//     },
//     formatter: (cell) => cell.split("|")[0],

//     //   filter: textFilter(),
//     sort: true,
//   },
//   {
//     dataField: "device_types",
//     text: "Device Type",
//     headerStyle: () => {
//       return {
//         backgroundColor: "#257d7c",
//         color: "#fff",
//       };
//     },
//     formatter: (cell) => cell.split("|")[1],

//     //   filter: textFilter(),
//     sort: true,
//   },
// ];
// ************************************************************************************************************************
export default function TableData(props) {
  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  const code = props.code;

  const [dateSectionSelect, setDateSectionSelect] = useState(true);
  const [StatusSectionSeclect, setStatusSectionSeclect] = useState(false);
  const [countPerPageSection, setCountPerPageSection] = useState(false);

  const [pageNo, setPageNo] = useState(0);

  // SHOW DATE SECTION FUNCTION
  const handleShowDate = () => {
    setDateSectionSelect(true);
    setStatusSectionSeclect(false);
    setCountPerPageSection(false);
  };
  // SHOW STATUS CODE SECTION FUNCTION
  const handleShowStatus = () => {
    setDateSectionSelect(false);
    setStatusSectionSeclect(true);
    setCountPerPageSection(false);
  };

  // SHOW PAGE PER COUNT SECTION FUNCTION
  const handleShowPerPage = () => {
    setDateSectionSelect(false);
    setStatusSectionSeclect(false);
    setCountPerPageSection(true);
  };

  const [date, setdate] = useState({
    start: localStorage.getItem("selected_date")
      ? JSON.parse(localStorage.getItem("selected_date")).start
      : "",
    end: localStorage.getItem("selected_date")
      ? JSON.parse(localStorage.getItem("selected_date")).end
      : "",
  });

  // const [pageNo, setPageNo] = useState(0);
  const [record, setRecords] = useState(
    localStorage.getItem("selected_record")
      ? JSON.parse(localStorage.getItem("selected_record")).warn
      : 25
  );
  const [showStackView, setShowStackView] = useState(false);

  // filter data fields with table
  const [showTableField, setShowTableField] = useState(false);

  const [logType, setLogType] = useState({
    error: localStorage.getItem("selected_log")
      ? JSON.parse(localStorage.getItem("selected_log")).error
      : false,
    info: localStorage.getItem("selected_log")
      ? JSON.parse(localStorage.getItem("selected_log")).info
      : false,
    warn: localStorage.getItem("selected_log")
      ? JSON.parse(localStorage.getItem("selected_log")).warn
      : false,
    debug: localStorage.getItem("selected_log")
      ? JSON.parse(localStorage.getItem("selected_log")).debug
      : false,
    verbose: localStorage.getItem("selected_log")
      ? JSON.parse(localStorage.getItem("selected_log")).verbose
      : false,
  });

  const getAllLogByCodeReducer = useSelector(
    (state) => state.getAllLogByCodeReducer
  );
  const { loading, data } = getAllLogByCodeReducer;

  // console.log("getAllLogByCodeReducer", data);

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
  };

  const dispatch = useDispatch();

  const saveSearch = () => {
    // console.log("save searches");
    // localStorage.removeItem("name of localStorage variable you want to remove");
    localStorage.setItem("selected_log", JSON.stringify(logType));
    if (date.start.length > 0 || date.end.length > 0) {
      localStorage.setItem("selected_date", JSON.stringify(date));
    }
    if (record !== 25) {
      localStorage.setItem("selected_record", JSON.stringify(record));
    }
    toast.success("Filter saved", {
      icon: "👏",
      // style: {
      //   borderRadius: '10px',
      //   background: '#333',
      //   color: '#fff',
      // }
    });
  };

  const resetFilter = () => {
    // startDateRef.current.value = "";
    // endDatRef.current.value = "";
    setdate({
      start: "",
      end: "",
    });
    setRecords(25);
    setPageNo(1);
    setLogType({
      error: false,
      info: false,
      warn: false,
      debug: false,
      verbose: false,
    });

    localStorage.removeItem("selected_log");
    localStorage.removeItem("selected_date");
    localStorage.removeItem("selected_record");
    // setLogType({...logType})
    dispatch(getProjectByCode(code, record));
    toast.success(
      "Saved filter cleared!"
      // {
      // icon: '👏',
      // style: {
      //   borderRadius: '10px',
      //   background: '#333',
      //   color: '#fff',
      // }}
    );
  };

  const handlePageClick = (data) => {
    console.log(logType)
    if (
      logType.error ||
      logType.info ||
      logType.warn ||
      logType.debug ||
      logType.verbose
    ) {
      dispatch(getProjectByCode(code, null, logType, pageNo, record));
    }

    if (pageNo !== data.selected + 1) {
      setPageNo(data.selected + 1);
    }
    console.log("hndle page click")
    dispatch(getProjectByCode(code, null, null, pageNo, record));
  };

  const applyFilter = () => {
    // if (
    //   logType.error ||
    //   logType.info ||
    //   logType.warn ||
    //   logType.debug ||
    //   logType.verbose
    // ) {
    //   console.log("Logtype applied")
    //   return dispatch(getProjectByCode(code, date, logType, pageNo, record));
    // }
    // if (!date.start && !date.end) {
    //   setdate({
    //     start: "",
    //     end: "",
    //   });
    // }
    // if (date.start || data.end) {
    //   console.log("date applied")
    //   return dispatch(getProjectByCode(code, date, logType));
    // }
    // if (
    //   logType.error ||
    //   logType.info ||
    //   logType.warn ||
    //   logType.debug ||
    //   logType.verbose
    // ) {
    //   dispatch(getProjectByCode(code, null, logType, pageNo, record));
    // }
    // if (record && (!date.start || !data.end)) {
    //   return dispatch(getProjectByCode(code, null, null, null, record));
    // }
    console.log(date)
    console.log(record)
    console.log(logType)
    dispatch(getProjectByCode(code, date, logType,pageNo,record));
  };

  // code, date = null, filters = null, page = null, record = 25

  useEffect(() => {
    dt.start = date.start;
    dt.end = date.end;
    console.log(logType)
    if (
      logType.error ||
      logType.info ||
      logType.warn ||
      logType.debug ||
      logType.verbose
    ) {
      console.log("if useEffect executed");
      dispatch(getProjectByCode(code, date, logType, pageNo, record));
    }else{
      console.log("else useEffect click")
      console.log(`${date.start} ${date.end} ${pageNo} ${record}`)
      dispatch(getProjectByCode(code, date, null, pageNo, record));
    }
  }, [pageNo]);

  const showTableFieldFunc = () => {
    setShowTableField(!showTableField);
  };

  // columns *******************************
  function errorFormatter(cell, row) {
    if (row.logType) {
      return (
        <span>
          {cell === "error" ? (
            <strong style={{ color: "red" }}>{cell.toUpperCase()}</strong>
          ) : cell === "warn" ? (
            <strong style={{ color: "violet" }}>{cell.toUpperCase()}</strong>
          ) : cell === "info" ? (
            <strong style={{ color: "blue" }}>{cell.toUpperCase()}</strong>
          ) : cell === "verbose" ? (
            <strong style={{ color: "green" }}>{cell.toUpperCase()}</strong>
          ) : (
            <strong style={{ color: "orange" }}>{cell.toUpperCase()}</strong>
          )}
        </span>
      );
    }

    return <span>$ {cell} NTD</span>;
  }

  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];

  var queryAllSting = { value1: "at", value2: "" };

  const StackOptions = () => {
    localStorage.setItem("queryAllSting", JSON.stringify(queryAllSting));
  };

  const columns = [
    {
      headerStyle: () => {
        return {
          backgroundColor: "#257d7c",
          color: "#fff",
        };
      },
      dataField: "did",
      text: "MAC Address",
      sort: true,
    },

    {
      dataField: "logMsg",
      text: "Log Message",
      headerAlign: "center",
      width: "10",
      headerStyle: () => {
        return {
          backgroundColor: "#257d7c",
          color: "#fff",
        };
      },
      formatter: (col, row) => {
        // console.log("row id mil", col);
        // const newCode = urlParams.get("code");
        const projectName = urlParams.get("name");
        let version = row.version ? row.version : null;
        let osArchitecture = row.osArchitecture ? row.osArchitecture : null;
        let modelName = row.modelName ? row.modelName : null;
        // const version = urlParams.get('version')
        // const osArchitecture = urlParams.get('osArchitecture')
        // console.log("now_code", newCode);
        // console.log(`start ${dt.start} and end ${dt.end}`)
        return (
          <div className={Style.expandedRow}>
            <Link
              style={{
                textDecoration: "none",
                color: "#000",
              }}
              to={`/analytics?code=${props.code}&name=${props.projectName}&col=${col}&rowlogGeneratedDate=${row.logGeneratedDate}&version=${version}&osArchitecture=${osArchitecture}&modelName=${modelName}`}
            >
              {col.split(" at").map((items) => items)[0]
                ? col.split(" at").map((items) => items)[0]
                : col}
            </Link>
          </div>
        );
      },

      //  to={`/analytics?code=${code}&name=Stack Trace&id=${row._id}&allStacks=${row.logMsg}&macAddress=${row.did}&loggenrateddate=${row.logGeneratedDate}&modeltype=${row.device_types}&logtype=${row.logType}`}

      // style: { backgroundColor: 'green' }
    },
    {
      dataField: "logType",
      text: "Log Type",
      headerStyle: () => {
        return {
          backgroundColor: "#257d7c",
          color: "#fff",
        };
      },
      formatter: errorFormatter,
      sort: true,
    },
    {
      dataField: "logGeneratedDate",
      text: "Log Generated At",
      width: "20",
      headerStyle: () => {
        return {
          backgroundColor: "#257d7c",
          color: "#fff",
        };
      },

      formatter: (cell) => {
        cell = cell.split("T")[0];
        let day = cell.split("-")[2];
        let month = cell.split("-")[1];
        let year = cell.split("-")[0];
        cell = `${day}-${month}-${year}`;
        return cell.split("T")[0];
      },
      sort: true,
    },

    // {
    //     dataField: 'logGeneratedDate',
    //     text: 'Log Generated Time',
    //   //   filter: textFilter(),
    //     formatter: cell => cell.split("T")[1],
    //     sort:true
    //   },

    {
      dataField: "device_types",
      text: "Device Code",
      headerStyle: () => {
        return {
          backgroundColor: "#257d7c",
          color: "#fff",
        };
      },
      formatter: (cell) => cell.split("|")[0],

      //   filter: textFilter(),
      sort: true,
    },
    {
      dataField: "device_types",
      text: "Device Type",
      headerStyle: () => {
        return {
          backgroundColor: "#257d7c",
          color: "#fff",
        };
      },
      formatter: (cell) => cell.split("|")[1],

      //   filter: textFilter(),
      sort: true,
    },
  ];

  // // CHANGING STATE WITH CLICKING IN BODY
  // useEffect(() => {
  //   document.body.addEventListener("click", closeSidemenu);
  // }, []);

  // // event function
  // let closeSidemenu = () => {
  //   alert("close");
  // };

  return (
    <>
      <CustomCard>
        <Toaster />
        <section className={Style.OuterTable}>
          {data && data.data && data.data.logs ? (
            <ToolkitProvider
              keyField="_id"
              data={data.data.logs}
              columns={columns}
              search
              exportCSV={{ onlyExportSelection: true, exportAll: true }}
            >
              {(props) => (
                <>
                  <div className={Style.BootstrapTable}>
                    <SearchBar {...props.searchProps} />
                    <section className={Style.filterOptions}>
                      <ExportCSVButton {...props.csvProps}>
                        Export Table
                      </ExportCSVButton>
                      <section
                        className={Style.filterGraphFirstSction}
                        onClick={showTableFieldFunc}
                      >
                        <FontAwesomeIcon icon={faFilter} />
                      </section>
                      <section className="p-4">
                        {showTableField ? (
                          <CustomCard
                            position="absolute"
                            height="auto"
                            width="450px"
                            top="6%"
                            right="3%"
                            padding="10px"
                            boxShadow="0px 0px 4px -2px rgba(0,0,0,0.75)"
                          >
                            <section className={Style.TopButton}>
                              <Button className="m-2" onClick={resetFilter}>
                                Reset Filter
                              </Button>
                              <Button className="m-2" onClick={saveSearch}>
                                Save Filter
                              </Button>
                              <Button className="m-2" onClick={applyFilter}>
                                Apply Filter
                              </Button>
                            </section>
                            <section>
                              <Row>
                                <Col xl={6}>
                                  <section className="m-2">
                                    <p
                                      className={
                                        dateSectionSelect
                                          ? `${Style.ActiveOption} mt-2`
                                          : `${Style.DefaultOption} mt-2`
                                      }
                                      onClick={handleShowDate}
                                    >
                                      Date
                                    </p>
                                    <p
                                      className={
                                        StatusSectionSeclect
                                          ? `${Style.ActiveOption} mt-2`
                                          : `${Style.DefaultOption} mt-2`
                                      }
                                      onClick={handleShowStatus}
                                    >
                                      Select Log Type
                                    </p>
                                    <p
                                      className={
                                        countPerPageSection
                                          ? `${Style.ActiveOption} mt-2`
                                          : `${Style.DefaultOption} mt-2`
                                      }
                                      onClick={handleShowPerPage}
                                    >
                                      Record per page
                                    </p>
                                  </section>
                                </Col>

                                {/* DATA CHANGE SECTION START FROM HERE */}
                                {dateSectionSelect ? (
                                  <Col xl={6}>
                                    <section className={Style.DateSection}>
                                      <input
                                        type="date"
                                        value={date.start}
                                        onChange={(e) =>
                                          setdate({
                                            ...date,
                                            start: e.target.value,
                                          })
                                        }
                                      />
                                      <input
                                        type="date"
                                        value={date.end}
                                        onChange={(e) =>
                                          setdate({
                                            ...date,
                                            end: e.target.value,
                                          })
                                        }
                                      />
                                    </section>
                                  </Col>
                                ) : null}

                                {/* STATUS CODE SECTION START HERE */}
                                {StatusSectionSeclect ? (
                                  <Col xl={6}>
                                    <section className={Style.StatusSection}>
                                      <section
                                        className={Style.StatusInnerSecion}
                                      >
                                        <label for="exampleFormControlFile1">
                                          Info
                                        </label>
                                        <input
                                          type="checkbox"
                                          checked={logType.info}
                                          onClick={(e) => {
                                            setLogType({
                                              ...logType,
                                              info: !logType.info,
                                            });
                                          }}
                                        />
                                      </section>
                                      <section
                                        className={Style.StatusInnerSecion}
                                      >
                                        <label for="exampleFormControlFile1">
                                          Warn
                                        </label>
                                        <input
                                          type="checkbox"
                                          checked={logType.warn}
                                          onClick={(e) => {
                                            setLogType({
                                              ...logType,
                                              warn: !logType.warn,
                                            });
                                          }}
                                        />
                                      </section>
                                      <section
                                        className={Style.StatusInnerSecion}
                                      >
                                        <label for="exampleFormControlFile1">
                                          Error
                                        </label>
                                        <input
                                          type="checkbox"
                                          checked={logType.error}
                                          onClick={(e) => {
                                            setLogType({
                                              ...logType,
                                              error: !logType.error,
                                            });
                                          }}
                                        />
                                      </section>
                                      <section
                                        className={Style.StatusInnerSecion}
                                      >
                                        <label for="exampleFormControlFile1">
                                          Debug
                                        </label>
                                        <input
                                          type="checkbox"
                                          checked={logType.debug}
                                          onClick={(e) => {
                                            setLogType({
                                              ...logType,
                                              debug: !logType.debug,
                                            });
                                          }}
                                        />
                                      </section>
                                      <section
                                        className={Style.StatusInnerSecion}
                                      >
                                        <label for="exampleFormControlFile1">
                                          Verbose
                                        </label>
                                        <input
                                          type="checkbox"
                                          checked={logType.verbose}
                                          onClick={(e) => {
                                            setLogType({
                                              ...logType,
                                              verbose: !logType.verbose,
                                            });
                                          }}
                                        />
                                      </section>
                                    </section>
                                  </Col>
                                ) : null}

                                {/* COUNT PER PAGE SECTION START FOM HERE   */}
                                {countPerPageSection ? (
                                  <Col xl={6}>
                                    <section className={Style.perPageOuter}>
                                      <p
                                        className={Style.perPagesectionInner}
                                        onClick={() => setRecords(10)}
                                        style={record === 10 && {background:'#257D7C'}}
                                      >
                                        10
                                      </p>
                                      <p
                                        className={Style.perPagesectionInner}
                                        onClick={() => setRecords(25)}
                                        style={record === 25 && {background:'#257D7C'}}
                                      >
                                        25
                                      </p>
                                      <p
                                        className={Style.perPagesectionInner}
                                        onClick={() => setRecords(45)}
                                        style={record === 45 && {background:'#257D7C'}}
                                      >
                                        45
                                      </p>
                                      <p
                                        className={Style.perPagesectionInner}
                                        onClick={() => setRecords(50)}
                                        style={record === 50 && {background:'#257D7C'}}
                                      >
                                        50
                                      </p>
                                    </section>
                                  </Col>
                                ) : null}
                              </Row>
                            </section>
                          </CustomCard>
                        ) : null}
                      </section>
                    </section>
                  </div>
                  <BootstrapTable {...props.baseProps} selectRow={selectRow} />
                </>
              )}
            </ToolkitProvider>
          ) : loading ? (
            <Spinner height="400px" />
          ) : (
            <h3>No Logs Found</h3>
          )}
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={data && data.data && Math.ceil(data.data.count / record)}
            // previousLabel="< Previous"
            // initialPage={1}
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
          />
        </section>
      </CustomCard>
    </>
  );
}
