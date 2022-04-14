import React, { useState, useEffect, useRef } from "react";
import CustomCard from "../../../../Container/CustomCard";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faWindowClose,
  faDownload,
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
import TableCard from "../../../../Container/TableCard";
import { useHistory } from "react-router-dom";

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

function TableData(props) {
  const code = props.code;
  let filedate = new Date();
  const [dateSectionSelect, setDateSectionSelect] = useState(true);
  const [StatusSectionSeclect, setStatusSectionSeclect] = useState(false);
  const [countPerPageSection, setCountPerPageSection] = useState(false);
  const [activeRecord, setActiveRecord] = useState({
    record10: false,
    record25: false,
    record50: false,
    record100: false,
  });

  const [pageNo, setPageNo] = useState(1);
  localStorage.setItem("page_no", pageNo);

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

  var startDate, endDate;

  const [dateState, setdate] = useState({
    start: JSON.parse(localStorage.getItem("selected_date")).start,
    end: JSON.parse(localStorage.getItem("selected_date")).end,
  });

  var date = {
    start: JSON.parse(localStorage.getItem("selected_date")).start,
    end: JSON.parse(localStorage.getItem("selected_date")).end,
  };

  endDate = filedate.toISOString().slice(0, 10);
  filedate.setDate(filedate.getDate() - props.diffDate);
  startDate = filedate.toISOString().slice(0, 10);
  useEffect(() => {
    date.start = startDate;
    date.end = endDate;
    setdate({ start: startDate, end: endDate });
  }, [props.diffDate]);

  // const [pageNo, setPageNo] = useState(0);
  const [record, setRecords] = useState(
    localStorage.getItem("selected_record")
      ? JSON.parse(localStorage.getItem("selected_record"))
      : 25
  );

  const ref = useRef();

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

  const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
  const { loading: loadingdata, data: typeWiseDate } = getModelCodeReducer;

  var projectCode = {
    code: localStorage.getItem("project_type")
      ? JSON.parse(localStorage.getItem("project_type")).typeCode
      : typeWiseDate &&
        typeWiseDate.modelList &&
        typeWiseDate.modelList[0].typeCode,
    name: localStorage.getItem("project_type")
      ? JSON.parse(localStorage.getItem("project_type")).typeName
      : typeWiseDate &&
        typeWiseDate.modelList &&
        typeWiseDate.modelList[0].typeName,
  };

  let porjectCodeType = typeWiseDate && typeWiseDate.modelList[0].typeCode;

  //  1)  DIRECTION PAGE TO NEW PAGE
  let history = useHistory();

  const getAllLogByCodeReducer = useSelector(
    (state) => state.getAllLogByCodeReducer
  );

  const { loading, data } = getAllLogByCodeReducer;

  // porject code to analytics screen
  const projectCodeAnalytics =
    (data &&
      data.data &&
      data.data.logs &&
      data.data.logs[0] &&
      data.data.logs[0].type) ||
    [];

  const selectRow = {
    mode: "checkbox",
    // clickToSelect: true,
    style: { backgroundColor: "#0099a4", color: "#fff" },
  };

  const dispatch = useDispatch();

  let logTypeFun = () => {
    if (logType.info) {
      localStorage.setItem(
        "selected_log",
        JSON.stringify({ ...logType, info: true })
      );
    }
    if (logType.error) {
      localStorage.setItem(
        "selected_log",
        JSON.stringify({ ...logType, error: true })
      );
    }
    if (logType.warn) {
      localStorage.setItem(
        "selected_log",
        JSON.stringify({ ...logType, warn: true })
      );
    }
    if (logType.debug) {
      localStorage.setItem(
        "selected_log",
        JSON.stringify({ ...logType, debug: true })
      );
    }
    if (logType.verbos) {
      localStorage.setItem(
        "selected_log",
        JSON.stringify({ ...logType, verbos: true })
      );
    }
  };

  let dateChipFun = () => {
    if (dateState.start) {
      localStorage.setItem(
        "selected_date",
        JSON.stringify({ ...dateState, start: dateState.start })
      );
    }
    if (dateState.end) {
      localStorage.setItem(
        "selected_date",
        JSON.stringify({ ...dateState, end: dateState.end })
      );
    }
  };

  const saveSearch = () => {
    // LOG TYPE
    logTypeFun();

    // DATE CHIPS
    dateChipFun();

    localStorage.setItem("selected_record", JSON.stringify(record));
    dispatch(
      getProjectByCode(code, date, logType, pageNo, record, projectCode.code)
    );
    toast.success("Filter saved");
    setShowTableField(false);
  };

  useEffect(() => {
    // LOG TYPE
    logTypeFun();

    // DATE CHIPS
    dateChipFun();
  }, [logType, date]);

  const resetFilter = () => {
    setdate({
      start: "",
      end: "",
    });
    date.start = "";
    date.end = "";
    setRecords(25);
    setPageNo(1);
    setLogType({
      error: false,
      info: false,
      warn: false,
      debug: false,
      verbose: false,
    });

    setActiveRecord({
      record10: false,
      record25: false,
      record50: false,
      record100: false,
    });

    localStorage.removeItem("selected_log");
    localStorage.removeItem("selected_date");
    localStorage.removeItem("selected_record");
    toast.success("Filter has been reset");
    setShowTableField(false);
    return dispatch(
      getProjectByCode(code, null, null, null, record, projectCode.code)
    );
  };

  const handlePageClick = (data) => {
    if (
      logType.error ||
      logType.info ||
      logType.warn ||
      logType.debug ||
      logType.verbose
    ) {
      setShowTableField(false);
      setPageNo(data.selected + 1);
      localStorage.setItem("page_no", data.selected + 1);
      return dispatch(
        getProjectByCode(
          code,
          null,
          logType,
          data.selected + 1,
          record,
          projectCode.code
        )
      );
    }

    setPageNo(data.selected + 1);
    localStorage.setItem("page_no", data.selected + 1);
    dispatch(
      getProjectByCode(
        code,
        null,
        null,
        data.selected + 1,
        record,
        projectCode.code
      )
    );
  };

  useEffect(() => {
    if (
      logType.error ||
      logType.info ||
      logType.warn ||
      logType.debug ||
      logType.verbose
    ) {
      dispatch(
        getProjectByCode(code, date, logType, pageNo, record, projectCode.code)
      );
    } else {
      dispatch(
        getProjectByCode(code, date, null, pageNo, record, projectCode.code)
      );
    }
  }, [pageNo, startDate, endDate, projectCode.code]);

  const showTableFieldFunc = () => {
    setShowTableField(!showTableField);
  };

  // Columns
  function errorFormatter(cell, row) {
    if (row.log.type) {
      return (
        <span>
          {cell === "error" ? (
            <p style={{ color: "red" }}>{cell.toUpperCase()}</p>
          ) : cell === "warn" ? (
            <p style={{ color: "violet" }}>{cell.toUpperCase()}</p>
          ) : cell === "info" ? (
            <p style={{ color: "blue" }}>{cell.toUpperCase()}</p>
          ) : cell === "verbose" ? (
            <p style={{ color: "green" }}>{cell.toUpperCase()}</p>
          ) : (
            <p style={{ color: "orange" }}>{cell.toUpperCase()}</p>
          )}
        </span>
      );
    }

    return <span>$ {cell} NTD</span>;
  }

  const tableRowEvents = {
    onClick: (e, row, rowIndex, col) => {
      let version = row.version ? row.version : null;
      history.push(
        `/analytics?code=${props.code}&name=${props.projectName}&col=${row.log.message}&rowlogGeneratedDate=${row.log.date}&version=${version}&osArchitecture=${row.device.os.name}&modelName=${row.device.name}&pagename=analytics&projectCodeAnalytics=${projectCodeAnalytics}`
      );
    },
  };

  const columns = [
    {
      dataField: "log.message",
      text: "Log Message",
      headerAlign: "center",
      headerStyle: () => {
        return {
          backgroundColor: "#257d7c",
          color: "#fff",
        };
      },
      formatter: (col, row, rowIndex) => {
        var title;
        var colData = col.split("at ");
        var colDataTOString = colData.toString();
        if (colData) {
          if (colDataTOString.includes("(")) {
            title = colData[0].split(")")[0].concat(")");
          } else {
            title = colData[0].split(")")[0];
          }
        }
        if (colDataTOString.includes("java.lang.RuntimeException")) {
          title = colData[1].split("(")[1].replace(":", " ").split(")")[0];
        } else {
          for (let key in colData) {
            if (colData[key].includes("Caused by:")) {
              title = colData[parseInt(key) + 1]
                .split("(")[1]
                .replace(":", " line ")
                .split(")")[0];
            }
          }
        }
        return (
          <div className={Style.expandedRow}>
            {title.indexOf(")") ? title.split(")")[0] : title}
          </div>
        );
      },
      sort: true,
    },
    {
      headerStyle: () => {
        return {
          backgroundColor: "#257d7c",
          color: "#fff",
        };
      },
      dataField: "device.did",
      text: "MAC Address",
      sort: true,
    },
    {
      dataField: "log.type",
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
      dataField: "log.date",
      text: "Date",
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
  ];

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showTableField && ref.current && !ref.current.contains(e.target)) {
        setShowTableField(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
      if (showTableField) {
        dispatch(
          getProjectByCode(
            code,
            date,
            logType,
            pageNo,
            record,
            projectCode.code
          )
        );
      }
    };
  }, [showTableField]);

  useEffect(() => {
    // 1) If record are 10 in localstorage
    if (localStorage.getItem("selected_record") == 10) {
      setRecords(10);
      setActiveRecord({
        ...activeRecord,
        record10: true,
      });
    }

    // 2) If record are 25 in localstorage
    if (localStorage.getItem("selected_record") == 25) {
      setRecords(25);
      setActiveRecord({
        ...activeRecord,
        record25: true,
      });
    }
    // 3) If record are 50 in localstorage
    if (localStorage.getItem("selected_record") == 50) {
      setRecords(50);
      setActiveRecord({
        ...activeRecord,
        record50: true,
      });
    }

    // 3) If record are 100 in localstorage
    if (localStorage.getItem("selected_record") == 100) {
      setRecords(100);
      setActiveRecord({
        ...activeRecord,
        record100: true,
      });
    }
  }, []);

  const closeChips = (items, index) => {
    setLogType({ ...logType, [items]: false });
    dispatch(
      getProjectByCode(
        code,
        date,
        { ...logType, [items]: false },
        pageNo,
        record,
        projectCode.code
      )
    );
    localStorage.setItem(
      "selected_log",
      JSON.stringify({ ...logType, [items]: false })
    );
  };

  // STATUS LOG TYPE CHIPS

  const chipsArray = ["info", "warn", "error", "debug", "verbose"];

  const chipsScetion = chipsArray.map((items, index) => (
    <section className={Style.chip}>
      <p style={{ color: "#fff" }}>{items.toUpperCase()}</p>
      <FontAwesomeIcon
        icon={faWindowClose}
        onClick={() => closeChips(items, index)}
      />
    </section>
  ));

  // DATE CHIPS
  const closeDateChip = (index) => {
    if (index == 0) {
      setdate({
        ...dateState,
        start: "",
      });
      date.start = "";
      localStorage.setItem(
        "selected_date",
        JSON.stringify({ ...dateState, start: "" })
      );
      dispatch(
        getProjectByCode({
          code: code,
          date: date,
          projectType: projectCodeAnalytics,
        })
      );
    }
    if (index === 1) {
      setdate({
        ...dateState,
        end: "",
      });
      date.end = "";
      localStorage.setItem(
        "selected_date",
        JSON.stringify({ ...dateState, end: "" })
      );
      dispatch(
        getProjectByCode({
          code: code,
          date: date,
          projectType: projectCodeAnalytics,
        })
      );
    }
  };

  const DateChipsArray = [dateState.start, dateState.end];
  const dateChips = DateChipsArray.map((items, index) => (
    <section className={Style.chip}>
      <p style={{ color: "#fff" }}>{items}</p>
      <FontAwesomeIcon
        icon={faWindowClose}
        onClick={() => closeDateChip(items, index)}
      />
    </section>
  ));

  useEffect(() => {
    // Providing data to the type-dropdown
    props.tableDataStateFun(
      code,
      date,
      logType,
      pageNo,
      record,
      porjectCodeType
    );
  }, []);

  return (
    <>
      <TableCard
        height={data && data.data && data.data.logs ? "100%" : "400px"}
        boxShadow={
          JSON.parse(localStorage.getItem("darkMood"))
            ? "1px 1px 10px 2px rgba(0,0,0,0.45)"
            : ""
        }
      >
        <Toaster />
        <section className={`${Style.OuterTable}`} ref={ref}>
          {data && data.data && data.data.logs ? (
            <ToolkitProvider
              keyField="_id"
              data={data.data.logs}
              columns={columns}
              search
              exportCSV={{
                fileName: `${code}_${filedate.toISOString()}.csv`,
                onlyExportSelection: true,
                exportAll: true,
              }}
            >
              {(props) => (
                <>
                  <div
                    className={Style.BootstrapTable}
                    style={{
                      backgroundColor: JSON.parse(
                        localStorage.getItem("darkMood")
                      )
                        ? "#202940"
                        : null,
                    }}
                  >
                    <section className={Style.searchbar}>
                      <SearchBar {...props.searchProps} />
                    </section>
                    {/* Chips section */}
                    <section className={Style.chipOuter}>
                      {logType.info && chipsScetion[0]}
                      {logType.warn && chipsScetion[1]}
                      {logType.error && chipsScetion[2]}
                      {logType.debug && chipsScetion[3]}
                      {logType.verbose && chipsScetion[4]}

                      {/* DATE CHIPS */}
                      {dateState.start && dateChips[0]}
                      {dateState.end && dateChips[1]}
                    </section>
                    <section className={Style.filterOptions}>
                      <section
                        className={Style.filterGraphFirstSction}
                        onClick={showTableFieldFunc}
                      >
                        <FontAwesomeIcon icon={faFilter} />
                      </section>
                      <ExportCSVButton {...props.csvProps}>
                        <FontAwesomeIcon icon={faDownload} />
                      </ExportCSVButton>
                      <section>
                        {showTableField ? (
                          <CustomCard
                            position="absolute"
                            height="auto"
                            width="450px"
                            top="5%"
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
                            </section>
                            <section>
                              <Row>
                                <Col xl={6} md={6} sm={6}>
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
                                  <Col xl={6} md={6} sm={6}>
                                    <section className={Style.DateSection}>
                                      <input
                                        type="date"
                                        min={date.start}
                                        max={date.end}
                                        value={
                                          dateState && dateState.start
                                            ? dateState.start
                                            : localStorage.getItem(
                                                "selected_date"
                                              ) &&
                                              JSON.parse(
                                                localStorage.getItem(
                                                  "selected_date"
                                                )
                                              ).start
                                        }
                                        onChange={(e) => {
                                          setdate({
                                            ...dateState,
                                            start: e.target.value,
                                          });
                                          date.start = e.target.value;
                                        }}
                                      />
                                      <input
                                        type="date"
                                        min={date.start}
                                        max={date.end}
                                        value={
                                          dateState && dateState.end
                                            ? dateState.end
                                            : localStorage.getItem(
                                                "selected_date"
                                              ) &&
                                              JSON.parse(
                                                localStorage.getItem(
                                                  "selected_date"
                                                )
                                              ).end
                                        }
                                        onChange={(e) => {
                                          setdate({
                                            ...dateState,
                                            end: e.target.value,
                                          });
                                          date.end = e.target.value;
                                        }}
                                      />
                                    </section>
                                  </Col>
                                ) : null}

                                {/* STATUS CODE SECTION START HERE */}
                                {StatusSectionSeclect ? (
                                  <Col xl={6} md={6} sm={6}>
                                    <section className={Style.StatusSection}>
                                      <section
                                        className={Style.StatusInnerSecion}
                                      >
                                        <label
                                          style={{
                                            color: JSON.parse(
                                              localStorage.getItem("darkMood")
                                            )
                                              ? "#fff"
                                              : null,
                                          }}
                                          for="exampleFormControlFile1"
                                        >
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
                                        <label
                                          style={{
                                            color: JSON.parse(
                                              localStorage.getItem("darkMood")
                                            )
                                              ? "#fff"
                                              : null,
                                          }}
                                          for="exampleFormControlFile1"
                                        >
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
                                        <label
                                          style={{
                                            color: JSON.parse(
                                              localStorage.getItem("darkMood")
                                            )
                                              ? "#fff"
                                              : null,
                                          }}
                                          for="exampleFormControlFile1"
                                        >
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
                                        <label
                                          style={{
                                            color: JSON.parse(
                                              localStorage.getItem("darkMood")
                                            )
                                              ? "#fff"
                                              : null,
                                          }}
                                          for="exampleFormControlFile1"
                                        >
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
                                        <label
                                          style={{
                                            color: JSON.parse(
                                              localStorage.getItem("darkMood")
                                            )
                                              ? "#fff"
                                              : null,
                                          }}
                                          for="exampleFormControlFile1"
                                        >
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
                                  <Col xl={6} md={6} sm={6}>
                                    <section className={Style.perPageOuter}>
                                      <p
                                        style={{
                                          color: JSON.parse(
                                            localStorage.getItem("darkMood")
                                          )
                                            ? "#fff"
                                            : null,
                                        }}
                                        className={
                                          activeRecord.record10
                                            ? `${Style.perPagesectionInnerActive}`
                                            : `${Style.perPagesectionInner}`
                                        }
                                        onClick={() => {
                                          setRecords(10);
                                          setActiveRecord({
                                            record10: true,
                                          });
                                        }}
                                      >
                                        10
                                      </p>
                                      <p
                                        style={{
                                          color: JSON.parse(
                                            localStorage.getItem("darkMood")
                                          )
                                            ? "#fff"
                                            : null,
                                        }}
                                        className={
                                          activeRecord.record25 || record == 25
                                            ? `${Style.perPagesectionInnerActive}`
                                            : `${Style.perPagesectionInner}`
                                        }
                                        onClick={() => {
                                          setRecords(25);
                                          setActiveRecord({
                                            record25: true,
                                          });
                                        }}
                                      >
                                        25
                                      </p>
                                      <p
                                        style={{
                                          color: JSON.parse(
                                            localStorage.getItem("darkMood")
                                          )
                                            ? "#fff"
                                            : null,
                                        }}
                                        className={
                                          activeRecord.record50
                                            ? `${Style.perPagesectionInnerActive}`
                                            : `${Style.perPagesectionInner}`
                                        }
                                        onClick={() => {
                                          setRecords(50);
                                          setActiveRecord({
                                            record50: true,
                                          });
                                        }}
                                      >
                                        50
                                      </p>
                                      <p
                                        style={{
                                          color: JSON.parse(
                                            localStorage.getItem("darkMood")
                                          )
                                            ? "#fff"
                                            : null,
                                        }}
                                        className={
                                          activeRecord.record100
                                            ? `${Style.perPagesectionInnerActive}`
                                            : `${Style.perPagesectionInner}`
                                        }
                                        onClick={() => {
                                          setRecords(100);
                                          setActiveRecord({
                                            record100: true,
                                          });
                                        }}
                                      >
                                        100
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

                  <BootstrapTable
                    {...props.baseProps}
                    selectRow={selectRow}
                    rowEvents={tableRowEvents}
                  />
                </>
              )}
            </ToolkitProvider>
          ) : loading ? (
            <Spinner height="400px" />
          ) : (
            <h3 className="p-2">No Logs Found</h3>
          )}

          <section className="p-2">
            <ReactPaginate
              breakLabel=". . ."
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={4}
              // pageCount={
              //   data && data.data && Math.ceil(data.data.count / record)
              // }
              pageCount={data && data.data && data.data.count / record}
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
        </section>
      </TableCard>
    </>
  );
}

export default TableData;
