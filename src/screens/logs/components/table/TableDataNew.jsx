import React, { useEffect, useReducer, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortDown,
  faSortUp,
  faDownload,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { getProjectByCode } from "../../../../store/action/ProjectAction";
import TableCard from "../../../../container/TableCard";
import Style from "./TableDataNew.module.css";
import CustomCard from "../../../../container/CustomCard";
import { ThemeContext } from "../../../../utils/ThemeContext";
import toast from "react-hot-toast";
import SpinnerCustom from "../../../../container/SpinnerCustom";
import CustomPaginationTableData from "../../../../common/CustomPaginationTableData";
import { checkBoxReducer } from "./store/Reducer";
import {
  SEARCH_FIELD,
  SELECT_PAGE_NO,
  DATE_SELECTION,
  STATUS_SELECTION,
  COUNT_PER_PAGE,
  RECORDS,
  LOGTYPE,
  SORT_ICON_FILTER,
  ALL_CHECKBOX_SELECTED,
} from "./store/Type";

export default function TableDataN(props) {
  // ALL CHECKED BOX CHECK STATE
  // const [allCheckBox, setAllCheckBox] = useState(false);
  const { theme } = React.useContext(ThemeContext);
  const code = props.code;
  let filedate = new Date();

  // ======================================Reduder from Redux===================================
  // ===========================================================================================
  // ===========================================================================================

  const getAllLogByCodeReducer = useSelector(
    (state) => state.getAllLogByCodeReducer
  );
  const { loading, data, error } = getAllLogByCodeReducer;
  // ============================================
  const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
  const { data: typeWiseDate } = getModelCodeReducer;
  const dispatch = useDispatch();

  // ======================================New State manangement================================
  // ===========================================================================================
  // ===========================================================================================
  // @@  STATE MANAGEMENT WITH USE REDUCER STARTS ------
  /*
  useReducer --> to manage single checkbox and all checkbox state and export data by conditionally
  initailState == checbox selection state, pageno state, date state, countperpage state
  
  */
  const initailState = {
    singleCheckbox: false,
    multiCheckbx: false,
    pageNo: 1,
    dateSection: true,
    statusSection: false,
    countPerPage: false,
    logType: {
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
    },
    sortIconFilter: {
      LM: false,
      AD: false,
      LT: false,
      DA: false,
      TI: false,
    },
    record: localStorage.getItem("selected_record")
      ? JSON.parse(localStorage.getItem("selected_record"))
      : 25,

    dateState: {
      start: JSON.parse(localStorage.getItem("selected_date")).start,
      end: JSON.parse(localStorage.getItem("selected_date")).end,
    },
    searchField: null,
    allCheckBox: false,
  };

  const [currentStateTableData, dispatchTableData] = useReducer(
    checkBoxReducer,
    initailState
  );

  console.log("currentStateTableData", currentStateTableData);

  // CHECKBOX STATE MANAGEMENT WITH USEREDUCER END ---------------------------------------------
  // ===========================================================================================
  // ===========================================================================================
  // ===========================================================================================

  const hadnleMulteDispatch = (type, data) => {
    // console.log("data here", type, data);
    return dispatchTableData({ type: type, data: data });
  };

  // SHOW DATE SECTION FUNCTION
  const handleShowDate = () => {
    hadnleMulteDispatch(DATE_SELECTION, true);
  };
  // SHOW STATUS CODE SECTION FUNCTION
  const handleShowStatus = () => {
    hadnleMulteDispatch(STATUS_SELECTION, true);
  };

  // SHOW PAGE PER COUNT SECTION FUNCTION
  const handleShowPerPage = () => {
    hadnleMulteDispatch(COUNT_PER_PAGE, true);
  };

  // =============================================================================
  // =============================================================================
  // =============================================================================

  var date = {
    start: currentStateTableData.dateState.start,
    end: currentStateTableData.dateState.end,
  };

  var startDate, endDate;
  endDate = filedate.toISOString().slice(0, 10);
  filedate.setDate(filedate.getDate() - props.diffDate);
  startDate = filedate.toISOString().slice(0, 10);

  // project code to analytics screen
  const projectCodeAnalytics =
    (data &&
      data.data &&
      data.data.logs &&
      data.data.logs[0] &&
      data.data.logs[0].type) ||
    [];

  // PROJECT CODE
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

  let projectCodeType = typeWiseDate && typeWiseDate.modelList[0].typeCode;

  // DOWNLOAD CSV FILE FUNCTION
  const downloadCSVFun = ({ data, fileName, fileType }) => {
    // console.log("file details", data, fileName, fileType);
    var allData = [];
    data.forEach((o) => {
      allData.push(`\n ${o._id}`);
    });

    // console.log("alldata", allData);

    const blob = new Blob([allData], { type: fileType });
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  // RESET FILTER FUNCTION
  const resetFilter = () => {
    // multy dispatch for resetfilter
    const multpleDispatch = (type, data) => {
      // console.log("data here", type, data);

      return dispatchTableData(type, data);
    };

    multpleDispatch(RECORDS, currentStateTableData.record);
    multpleDispatch(SELECT_PAGE_NO, 1);
    multpleDispatch(SELECT_PAGE_NO, 1);

    // setActiveRecord({
    //   record10: false,
    //   record25: false,
    //   record50: false,
    //   record100: false,
    // }); ----------------******

    localStorage.removeItem("selected_log");
    localStorage.removeItem("selected_date");
    localStorage.removeItem("selected_record");

    multpleDispatch(LOGTYPE, {
      error: null,
      info: null,
      warn: null,
      debug: null,
      verbose: null,
    });

    props.setShowTableField(false);
    dispatch(
      getProjectByCode(
        code,
        currentStateTableData.date,
        null,
        null,
        currentStateTableData.record,
        projectCode.code
      )
    );
    toast.success("Filter has been reset");
  };

  // STATUS LOG TYPE CHIPS

  const chipsArray = ["info", "warn", "error", "debug", "verbose"];

  const chipsSection = chipsArray.map((items, index) => (
    <section className={Style.chip}>
      <p style={{ color: "#fff" }}>{items.toUpperCase()}</p>
      <FontAwesomeIcon
        icon={faWindowClose}
        onClick={() => closeChips(items, index)}
      />
    </section>
  ));

  // close chips
  const closeChips = (items, index) => {
    // setLogType({ ...currentStateTableData.logType, [items]: false }) ----------------*****;
    dispatch(
      getProjectByCode(
        code,
        currentStateTableData.date,
        { ...currentStateTableData.logType, [items]: false },
        currentStateTableData.pageNo,
        currentStateTableData.record,
        projectCode.code
      )
    );
    localStorage.setItem(
      "selected_log",
      JSON.stringify({ ...currentStateTableData.logType, [items]: false })
    );
  };

  // DATE CHIPS
  const DateChipsArray = [
    currentStateTableData.dateState.start,
    currentStateTableData.dateState.end,
  ];
  const dateChips = DateChipsArray.map((items, index) => (
    <section className={Style.chip}>
      <p style={{ color: "#fff" }}>{items}</p>
      <FontAwesomeIcon
        icon={faWindowClose}
        // onClick={() => closeDateChip(items, index)}
      />
    </section>
  ));

  // SAVE SEARCH FUNCTION
  const saveSearch = () => {
    // LOG TYPE
    if (currentStateTableData.logType.info) {
      localStorage.setItem(
        "selected_log",
        JSON.stringify({ ...currentStateTableData.logType, info: true })
      );
    }
    if (currentStateTableData.logType.error) {
      localStorage.setItem(
        "selected_log",
        JSON.stringify({ ...currentStateTableData.logType, error: true })
      );
    }
    if (currentStateTableData.logType.warn) {
      localStorage.setItem(
        "selected_log",
        JSON.stringify({ ...currentStateTableData.logType, warn: true })
      );
    }
    if (currentStateTableData.logType.debug) {
      localStorage.setItem(
        "selected_log",
        JSON.stringify({ ...currentStateTableData.logType, debug: true })
      );
    }
    if (currentStateTableData.logType.verbos) {
      localStorage.setItem(
        "selected_log",
        JSON.stringify({ ...currentStateTableData.logType, verbos: true })
      );
    }

    localStorage.setItem("page_no", 1);

    // DATE CHIPS
    dateChipFun();

    localStorage.setItem(
      "selected_record",
      JSON.stringify(currentStateTableData.record)
    );
    if (
      currentStateTableData.logType.info ||
      currentStateTableData.logType.error ||
      currentStateTableData.logType.warn ||
      currentStateTableData.logType.verbose ||
      currentStateTableData.logType.debug
    ) {
      dispatch(
        getProjectByCode(
          code,
          currentStateTableData.date,
          currentStateTableData.logType,
          currentStateTableData.pageNo,
          currentStateTableData.record,
          projectCode.code
        )
      );
    } else {
      dispatch(
        getProjectByCode(
          code,
          currentStateTableData.date,
          currentStateTableData.logType,
          currentStateTableData.pageNo,
          currentStateTableData.record,
          projectCode.code
        )
      );
    }

    toast.success("Filter saved");
    props.setShowTableField(false);
  };

  let dateChipFun = () => {
    if (currentStateTableData.dateState.start) {
      localStorage.setItem(
        "selected_date",
        JSON.stringify({
          ...currentStateTableData.dateState,
          start: currentStateTableData.dateState.start,
        })
      );
    }
    if (currentStateTableData.dateState.end) {
      localStorage.setItem(
        "selected_date",
        JSON.stringify({
          ...currentStateTableData.dateState,
          end: currentStateTableData.dateState.end,
        })
      );
    }
  };

  // ========================================

  const callBackfunctionDispatchGetAllData = (sortType) => {
    return dispatch(
      getProjectByCode(
        code,
        date,
        currentStateTableData.logType,
        currentStateTableData.pageNo,
        currentStateTableData.record,
        projectCode.code,
        sortType
      )
    );
  };

  // SORTING FUNCTION
  // multple dispatch function for sorting

  const multpleDispatchSort = (type, data) => {
    return dispatchTableData({
      type: type,
      data: data,
    });
  };

  const sortTableFunLM = (callbackDispatchAllData) => {
    // LM -- log message
    if (currentStateTableData.sortIconFilter.LM) {
      return callbackDispatchAllData("-log.message");
    } else if (!currentStateTableData.sortIconFilter.LM) {
      multpleDispatchSort(SORT_ICON_FILTER, {
        LM: true,
        AD: false,
        LT: false,
        DA: false,
        TI: false,
      });

      return callbackDispatchAllData("log.message");
    }
  };

  const sortTableFunAD = (callbackDispatchAllData) => {
    // AD-- mac address
    if (currentStateTableData.sortIconFilter.AD) {
      return callbackDispatchAllData("-device.did");
    } else if (!currentStateTableData.sortIconFilter.AD) {
      multpleDispatchSort(SORT_ICON_FILTER, {
        LM: false,
        AD: true,
        LT: false,
        DA: false,
        TI: false,
      });
      return callbackDispatchAllData("device.did");
    }
  };

  const sortTableFunLT = (callbackDispatchAllData) => {
    // LT -- logotype
    if (currentStateTableData.sortIconFilter.LT) {
      return callbackDispatchAllData("-log.type");
    } else if (!currentStateTableData.sortIconFilter.LT) {
      multpleDispatchSort(SORT_ICON_FILTER, {
        LM: false,
        AD: false,
        LT: true,
        DA: false,
        TI: false,
      });
      return callbackDispatchAllData("log.type");
    }
  };

  const sortTableFunDT = (callbackDispatchAllData) => {
    // DT -- date TI-- time
    if (
      currentStateTableData.sortIconFilter.DA ||
      currentStateTableData.sortIconFilter.TI
    ) {
      return callbackDispatchAllData("-log.date");
    } else if (
      !currentStateTableData.sortIconFilter.DA ||
      !currentStateTableData.sortIconFilter.TI
    ) {
      multpleDispatchSort(SORT_ICON_FILTER, {
        LM: false,
        AD: false,
        LT: false,
        DA: true,
        TI: true,
      });
      return callbackDispatchAllData("log.date");
    }
  };

  // @@ SEARCH MECHANISMS IMPLEMENTATION  STARTS HERE -----
  const handleSearchFunc = (event) => {
    dispatchTableData({
      type: SEARCH_FIELD,
      data: event.target.value,
    });
  };
  let tableData = data && data.data && data.data.logs;

  let search =
    (currentStateTableData.searchField &&
      currentStateTableData.searchField.trim() &&
      currentStateTableData.searchField.trim().toLowerCase()) ||
    "";
  if (search.length > 0) {
    tableData = tableData.filter(function (item) {
      return (
        item.log.date.split("T")[0].toLowerCase().match(search) ||
        item.log.date.split("T")[1].toLowerCase().match(search) ||
        item.log.file.toLowerCase().match(search) ||
        item.log.message.toLowerCase().match(search) ||
        item.log.type.toLowerCase().match(search) ||
        item.device.did.toLowerCase().match(search) ||
        item.type.toLowerCase().match(search) ||
        item.version.match(search)
      );
    });
  }

  const allCheckBoxFun = () => {
    // @@ FOR SELECTION ITEMS IS TRITE AS THE EVENT  items == e
    dispatchTableData(ALL_CHECKBOX_SELECTED, true);
  };

  // @@ DOWNLOAD FUNCTION
  const handleDownload = (row) => {
    // console.log("download function", row);

    var a = document.createElement("a");
    a.target = "_blank";
    a.href = `https://0942-2401-4900-1f39-34dc-385b-1069-1819-5282.in.ngrok.io/${row.log.filePath}`;
    a.setAttribute("download", row.log.filePath);
    a.click();
  };
  // @@ first dispatch of table data
  useEffect(() => {
    dispatch(
      getProjectByCode(
        code,
        date,
        currentStateTableData.logType,
        currentStateTableData.pageNo,
        currentStateTableData.record,
        projectCode.code
      )
    );
  }, [currentStateTableData.pageNo, startDate, endDate]);

  useEffect(() => {
    dispatch(getProjectByCode(props.code, null, null, null, null, projectCode));
  }, []);
  useEffect(() => {
    // Providing data to the type-dropdown
    props.tableDataStateFun(
      code,
      currentStateTableData.date,
      currentStateTableData.logType,
      currentStateTableData.pageNo,
      currentStateTableData.record,
      projectCodeType
    );
  }, []);
  useEffect(() => {
    date.start = startDate;
    date.end = endDate;
    // setDate({ start: startDate, end: endDate }); ----**
  }, [props.diffDate]);

  return (
    <TableCard height="100%" borderRadius="10px">
      <section>
        {/*SEARCH SECTION  */}
        <section className={Style.searchSection}>
          <input
            type="text"
            placeholder="Search..."
            value={currentStateTableData.searchField}
            onChange={handleSearchFunc}
          />
          {/* Chips section */}
          <section className={Style.chipOuter}>
            {currentStateTableData.logType.info && chipsSection[0]}
            {currentStateTableData.logType.warn && chipsSection[1]}
            {currentStateTableData.logType.error && chipsSection[2]}
            {currentStateTableData.logType.debug && chipsSection[3]}
            {currentStateTableData.logType.verbose && chipsSection[4]}

            {/* DATE CHIPS */}
            {currentStateTableData.dateState.start && dateChips[0]}
            {currentStateTableData.dateState.end && dateChips[1]}
          </section>
          <section
            style={{
              opacity: currentStateTableData.allCheckBox ? "100%" : "30%",
              cursor: currentStateTableData.allCheckBox
                ? "pointer"
                : "not-allowed",
            }}
            onClick={() =>
              currentStateTableData.allCheckBox &&
              downloadCSVFun({
                data: currentStateTableData.allCheckBox ? tableData : [],
                fileName: `${props.code}.csv`,
                fileType: "text/csv;charset=utf-8;",
              })
            }
          >
            <section className={Style.filterGraphFirstSction}>
              <FontAwesomeIcon icon={faDownload} />
            </section>
          </section>
        </section>

        {/* BOOTSTRAP TABLE */}

        <Table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  id="all-check"
                  onChange={(e) => allCheckBoxFun(e)}
                />
              </th>
              <th>
                <section
                  className={Style.sortIcons}
                  onClick={() =>
                    sortTableFunLM(callBackfunctionDispatchGetAllData)
                  }
                >
                  Log Message
                  <span className="ps-2">
                    {currentStateTableData.sortIconFilter.LM ? (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortDown}
                        onClick={() => {
                          // setSortIconFilter({ ...sortIconFilter, LM: false });
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortUp}
                        onClick={() => {
                          // setSortIconFilter({ ...sortIconFilter, LM: true });
                        }}
                      />
                    )}
                  </span>
                </section>
              </th>
              <th>
                <section
                  className={Style.sortIcons}
                  onClick={() =>
                    sortTableFunAD(callBackfunctionDispatchGetAllData)
                  }
                >
                  Mac Address
                  <span className="ps-2">
                    {currentStateTableData.sortIconFilter.AD ? (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortDown}
                        onClick={() => {
                          // setSortIconFilter({ ...sortIconFilter, AD: false });
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortUp}
                        onClick={() => {
                          // setSortIconFilter({ ...sortIconFilter, AD: true });
                        }}
                      />
                    )}
                  </span>
                </section>
              </th>
              <th>
                <section
                  className={Style.sortIcons}
                  onClick={() =>
                    sortTableFunLT(callBackfunctionDispatchGetAllData)
                  }
                >
                  Log Type
                  <span className="ps-2">
                    {currentStateTableData.sortIconFilter.LT ? (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortDown}
                        onClick={() => {
                          // setSortIconFilter({ ...sortIconFilter, LT: false });
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortUp}
                        onClick={() => {
                          // setSortIconFilter({ ...sortIconFilter, LT: true });
                        }}
                      />
                    )}
                  </span>
                </section>
              </th>
              <th>
                <section
                  className={Style.sortIcons}
                  onClick={() =>
                    sortTableFunDT(callBackfunctionDispatchGetAllData)
                  }
                >
                  Date
                  <span className="ps-2">
                    {currentStateTableData.sortIconFilter.DA ? (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortDown}
                        onClick={() => {
                          // setSortIconFilter({ ...sortIconFilter, DA: false });
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortUp}
                        onClick={() => {
                          // setSortIconFilter({ ...sortIconFilter, DA: true });
                        }}
                      />
                    )}
                  </span>
                </section>
              </th>
              <th>
                <section
                  className={Style.sortIcons}
                  onClick={() =>
                    sortTableFunDT(callBackfunctionDispatchGetAllData)
                  }
                >
                  Time
                  <span className="ps-2">
                    {currentStateTableData.sortIconFilter.TI ? (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortDown}
                        onClick={() => {
                          // setSortIconFilter({ ...sortIconFilter, TI: false });
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortUp}
                        onClick={() => {
                          // setSortIconFilter({ ...sortIconFilter, TI: true });
                        }}
                      />
                    )}
                  </span>
                </section>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData &&
              tableData.map((item, index) => {
                return (
                  <>
                    <tr>
                      <td>
                        <input
                          id={item._id}
                          type="checkbox"
                          checked={
                            currentStateTableData.allCheckBox ? "checked" : null
                          }
                        />
                      </td>
                      <td>
                        {item && item.log && item.log.filePath ? (
                          <section
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <p style={{ cursor: "not-allowed" }}>
                              {item.log.file}
                            </p>
                            <section
                              style={{
                                backgroundColor: "#0099A4",
                                padding: "3px 5px",
                                color: "#fff",
                                borderRadius: "5px",
                              }}
                              onClick={() => handleDownload(item)}
                            >
                              <FontAwesomeIcon icon={faDownload} />
                            </section>
                          </section>
                        ) : (
                          <a
                            style={{
                              color:
                                theme == "light-theme" ? "#7D7A8C" : "#fff",
                            }}
                            className={Style.LinkSection}
                            href={`/analytics?code=SBXMH&name=Ventilator&col=${item.log.message}&rowlogGeneratedDate=${item.log.date}&version=${item.version}&osArchitecture=${item.device.os.name}&modelName=${item.device.name}&pagename=analytics&projectCodeAnalytics=${projectCodeAnalytics}`}
                          >
                            {/* {console.log("item", item.log.message)} */}

                            {item.log.filePath
                              ? item.log.file
                              : item.log.message.includes("at ")
                              ? item.log.message.split("at ")[0]
                              : item.log.message.includes(":")
                              ? item.log.message.split(": ")[0]
                              : item.log.message}
                          </a>
                        )}
                      </td>
                      <td>{item.device.did}</td>
                      <td>
                        {item.log.type == "error" && (
                          <span style={{ color: "red" }}>
                            {item.log.type.toUpperCase()}
                          </span>
                        )}
                        {item.log.type == "info" && (
                          <span style={{ color: "blue" }}>
                            {item.log.type.toUpperCase()}
                          </span>
                        )}
                        {item.log.type == "warn" && (
                          <span style={{ color: "violet" }}>
                            {item.log.type.toUpperCase()}
                          </span>
                        )}
                        {item.log.type == "debug" && (
                          <span style={{ color: "green" }}>
                            {item.log.type.toUpperCase()}
                          </span>
                        )}
                      </td>
                      <td>{item.log.date.split("T")[0]}</td>
                      <td>{item.log.date.split("T")[1].split(".")[0]}</td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </Table>

        {/* DROPDOWN FILTER */}
        <section>
          {props.showTableField ? (
            <CustomCard
              position="absolute"
              height="auto"
              width="450px"
              top="0%"
              right="0%"
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
                    <section className={`m-2`}>
                      <p
                        className={
                          currentStateTableData.dateSection
                            ? `${Style.ActiveOption} mt-2`
                            : `${Style.DefaultOption} mt-2`
                        }
                        onClick={handleShowDate}
                      >
                        Date
                      </p>
                      <p
                        className={
                          currentStateTableData.statusSection
                            ? `${Style.ActiveOption} mt-2`
                            : `${Style.DefaultOption} mt-2`
                        }
                        onClick={handleShowStatus}
                      >
                        Select Log Type
                      </p>
                      <p
                        className={
                          currentStateTableData.countPerPage
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
                  {currentStateTableData.dateSection ? (
                    <Col xl={6} md={6} sm={6}>
                      <section className={Style.DateSection}>
                        <input
                          type="date"
                          min={date.start}
                          max={date.end}
                          value={
                            currentStateTableData.dateState &&
                            currentStateTableData.dateState.start
                              ? currentStateTableData.dateState.start
                              : localStorage.getItem("selected_date") &&
                                JSON.parse(
                                  localStorage.getItem("selected_date")
                                ).start
                          }
                          onChange={(e) => {
                            // setDate({
                            //   ...currentStateTableData.dateState,
                            //   start: e.target.value,
                            // });------****
                            date.start = e.target.value;
                          }}
                        />
                        <input
                          type="date"
                          min={date.start}
                          max={date.end}
                          value={
                            currentStateTableData.dateState &&
                            currentStateTableData.dateState.end
                              ? currentStateTableData.dateState.end
                              : localStorage.getItem("selected_date") &&
                                JSON.parse(
                                  localStorage.getItem("selected_date")
                                ).end
                          }
                          onChange={(e) => {
                            // setDate({
                            //   ...currentStateTableData.dateState,
                            //   end: e.target.value,
                            // }); ------****
                            currentStateTableData.date.end = e.target.value;
                          }}
                        />
                      </section>
                    </Col>
                  ) : null}

                  {/* STATUS CODE SECTION START HERE */}
                  {currentStateTableData.statusSection ? (
                    <Col xl={6} md={6} sm={6}>
                      <section className={Style.StatusSection}>
                        <section className={Style.StatusInnerSecion}>
                          <label
                            className="darkModeColor"
                            for="exampleFormControlFile1"
                          >
                            Info
                          </label>
                          <input
                            type="checkbox"
                            checked={currentStateTableData.logType.info}
                            onClick={(e) => {
                              // setLogType({
                              //   ...currentStateTableData.logType,
                              //   info: !logType.info,
                              // }); -------****
                            }}
                          />
                        </section>
                        <section className={Style.StatusInnerSecion}>
                          <label
                            className="darkModeColor"
                            for="exampleFormControlFile1"
                          >
                            Warn
                          </label>
                          <input
                            type="checkbox"
                            checked={currentStateTableData.logType.warn}
                            onClick={(e) => {
                              // setLogType({
                              //   ...currentStateTableData.logType,
                              //   warn: !logType.warn,
                              // }); -----****
                            }}
                          />
                        </section>
                        <section className={Style.StatusInnerSecion}>
                          <label
                            className="darkModeColor"
                            for="exampleFormControlFile1"
                          >
                            Error
                          </label>
                          <input
                            type="checkbox"
                            checked={currentStateTableData.logType.error}
                            onClick={(e) => {
                              // setLogType({
                              //   ...currentStateTableData.logType,
                              //   error: !logType.error,
                              // }); -------**
                            }}
                          />
                        </section>
                        <section className={Style.StatusInnerSecion}>
                          <label
                            className="darkModeColor"
                            for="exampleFormControlFile1"
                          >
                            Debug
                          </label>
                          <input
                            type="checkbox"
                            checked={currentStateTableData.logType.debug}
                            // onClick={(e) => {
                            //   setLogType({
                            //     ...currentStateTableData.logType,
                            //     debug: !logType.debug,
                            //   });
                            // }} -------****
                          />
                        </section>
                        <section className={Style.StatusInnerSecion}>
                          <label
                            className="darkModeColor"
                            for="exampleFormControlFile1"
                          >
                            Verbose
                          </label>
                          <input
                            type="checkbox"
                            checked={currentStateTableData.logType.verbose}
                            // onClick={(e) => {
                            //   setLogType({
                            //     ...currentStateTableData.logType,
                            //     verbose: !logType.verbose,
                            //   });
                            // }} ------****
                          />
                        </section>
                      </section>
                    </Col>
                  ) : null}

                  {/* COUNT PER PAGE SECTION START FOM HERE   */}
                  {currentStateTableData.countPerPage ? (
                    <Col xl={6} md={6} sm={6}>
                      <section className={Style.perPageOuter}>
                        <p
                          className={
                            currentStateTableData.activeRecord.record10
                              ? `${Style.perPagesectionInnerActive} darkModeColor`
                              : `${Style.perPagesectionInner} darkModeColor`
                          }
                          onClick={() => {
                            // setRecords(10);
                            // setActiveRecord({
                            //   record10: true,
                            // });--------*****
                          }}
                        >
                          10
                        </p>
                        <p
                          className={
                            currentStateTableData.activeRecord.record25 ||
                            currentStateTableData.record == 25
                              ? `${Style.perPagesectionInnerActive} darkModeColor`
                              : `${Style.perPagesectionInner} darkModeColor`
                          }
                          onClick={() => {
                            // setRecords(25);
                            // setActiveRecord({
                            //   record25: true,
                            // }); --------****
                          }}
                        >
                          25
                        </p>
                        <p
                          className={
                            currentStateTableData.activeRecord.record50
                              ? `${Style.perPagesectionInnerActive}darkModeColor`
                              : `${Style.perPagesectionInner} darkModeColor`
                          }
                          onClick={() => {
                            // setRecords(50);
                            // setActiveRecord({
                            //   record50: true,
                            // }); ----****
                          }}
                        >
                          50
                        </p>
                        <p
                          className={
                            currentStateTableData.activeRecord.record100
                              ? `${Style.perPagesectionInnerActive} darkModeColor`
                              : `${Style.perPagesectionInner} darkModeColor`
                          }
                          onClick={() => {
                            // setRecords(100);
                            // setActiveRecord({
                            //   record100: true,
                            // });------***
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

        {loading && <SpinnerCustom height="200px" />}
        {error && (
          <section className={Style.noDataFound}>
            <p>No Data Found</p>
          </section>
        )}
        {tableData && (
          <section className="p-2">
            <CustomPaginationTableData
              data={data && data.data && data.data.count}
              code={code}
              date={currentStateTableData.date}
              logType={currentStateTableData.logType}
              record={currentStateTableData.record}
              projectType={projectCode.code}
            />
          </section>
        )}
      </section>
    </TableCard>
  );
}
