import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Pagination, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortDown,
  faSortUp,
  faDownload,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { getProjectByCode } from "../../../../redux/action/ProjectAction";
import TableCard from "../../../../Container/TableCard";
import Style from "./TableDataN.module.css";
import CustomCard from "../../../../Container/CustomCard";
import { ThemeContext } from "../../../../utils/ThemeContext";
import toast from "react-hot-toast";
import SpinnerCustom from "../../../../Container/SpinnerCustom";
import CustomPaginationTableData from "../../../../common/CustomPaginationTableData";

export default function TableDataN(props) {
  // ALL CHECKED BOX CHECK STATE
  const [allCheckBox, setAllCheckBox] = useState(false);
  const { theme } = React.useContext(ThemeContext);
  const code = props.code;
  let filedate = new Date();
  const [dateSectionSelect, setDateSectionSelect] = useState(true);
  const [statusSectionSelect, setStatusSectionSelect] = useState(false);
  const [countPerPageSection, setCountPerPageSection] = useState(false);
  const [activeRecord, setActiveRecord] = useState({
    record10: false,
    record25: false,
    record50: false,
    record100: false,
  });

  const [pageNo, setPageNo] = useState(1);
  // localStorage.setItem("page_no", pageNo);

  // SHOW DATE SECTION FUNCTION
  const handleShowDate = () => {
    setDateSectionSelect(true);
    setStatusSectionSelect(false);
    setCountPerPageSection(false);
  };
  // SHOW STATUS CODE SECTION FUNCTION
  const handleShowStatus = () => {
    setDateSectionSelect(false);
    setStatusSectionSelect(true);
    setCountPerPageSection(false);
  };

  // SHOW PAGE PER COUNT SECTION FUNCTION
  const handleShowPerPage = () => {
    setDateSectionSelect(false);
    setStatusSectionSelect(false);
    setCountPerPageSection(true);
  };

  var startDate, endDate;

  const [dateState, setDate] = useState({
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
    setDate({ start: startDate, end: endDate });
  }, [props.diffDate]);

  const [record, setRecords] = useState(
    localStorage.getItem("selected_record")
      ? JSON.parse(localStorage.getItem("selected_record"))
      : 25
  );

  // const ref = useRef();

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

  // SORTING ICON STATE
  const [sortIconFilter, setSortIconFilter] = useState({
    LM: false,
    AD: false,
    LT: false,
    DA: false,
    TI: false,
  });

  const [checkBoxEnable, setCheckBoxEnable] = useState(false);

  // SEARCH INPUT STATE
  const [searchField, setSearchField] = useState();

  //   PROJECT TYPE
  const getAllLogByCodeReducer = useSelector(
    (state) => state.getAllLogByCodeReducer
  );
  const { loading, data, error } = getAllLogByCodeReducer;

  console.log("data", getAllLogByCodeReducer);

  // project code to analytics screen
  const projectCodeAnalytics =
    (data &&
      data.data &&
      data.data.logs &&
      data.data.logs[0] &&
      data.data.logs[0].type) ||
    [];

  const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
  const { data: typeWiseDate } = getModelCodeReducer;

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectByCode(props.code, null, null, null, null, projectCode));
  }, []);

  // @@ CHECKBOX FUNCTION -----
  // var ArrayOfDataItems = [];
  // var ArrayOFSelectedCheckBox = [];

  // const checkBoxFunc = (item, index) => {
  //   ArrayOfDataItems.push(item._id);
  //   ArrayOFSelectedCheckBox.push(item);

  //   // @@ IF THERE IS A DUPLICATE DATA PUSH INTO THE ARRAY NEED TO ERASE THE DATA
  //   if (ArrayOfDataItems.length) {
  //     setCheckBoxEnable(true);
  //   }
  //   // @@ items are referring here for including in array ---- ??
  // };

  // DOWNLOAD CSV FILE FUNCTION
  const downloadCSVFun = ({ data, fileName, fileType }) => {
    console.log("file details", data, fileName, fileType);
    var allData = [];
    data.forEach((o) => {
      allData.push(`\n ${o._id}`);
      // allData.push(`\n ${o.createdAt}`);
      // allData.push(o.log.message);
      // allData.push(o.log.type);
    });

    console.log("alldata", allData);

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
    setRecords(25);
    setPageNo(1);

    setActiveRecord({
      record10: false,
      record25: false,
      record50: false,
      record100: false,
    });

    localStorage.removeItem("selected_log");
    localStorage.removeItem("selected_date");
    localStorage.removeItem("selected_record");

    setLogType({
      error: "",
      info: "",
      warn: "",
      debug: "",
      verbose: "",
    });

    props.setShowTableField(false);
    dispatch(
      getProjectByCode(code, date, null, null, record, projectCode.code)
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

  // DATE CHIPS
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

  // CLOSE DATE CHIP FUNCTION
  // DATE CHIPS
  const closeDateChip = (index) => {
    if (index == 0) {
      setDate({
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
      setDate({
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

  // SAVE SEARCH FUNCTION
  const saveSearch = () => {
    // LOG TYPE
    logTypeFun();

    localStorage.setItem("page_no", 1);

    // DATE CHIPS
    dateChipFun();

    localStorage.setItem("selected_record", JSON.stringify(record));
    if (
      logType.info ||
      logType.error ||
      logType.warn ||
      logType.verbose ||
      logType.debug
    ) {
      dispatch(
        getProjectByCode(code, date, logType, pageNo, record, projectCode.code)
      );
    } else {
      dispatch(
        getProjectByCode(code, date, logType, pageNo, record, projectCode.code)
      );
    }

    toast.success("Filter saved");
    props.setShowTableField(false);
  };

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

  // SORTING FUNCTION
  const sortTableFunLM = () => {
    // LM -- log message
    if (sortIconFilter.LM) {
      return dispatch(
        getProjectByCode(
          code,
          date,
          logType,
          pageNo,
          record,
          projectCode.code,
          "-log.message"
        )
      );
    } else if (!sortIconFilter.LM) {
      setSortIconFilter({
        ...sortIconFilter,
        LM: true,
        AD: false,
        LT: false,
        DA: false,
        TI: false,
      });
      return dispatch(
        getProjectByCode(
          code,
          date,
          logType,
          pageNo,
          record,
          projectCode.code,
          "log.message"
        )
      );
    }
  };

  const sortTableFunAD = () => {
    // AD-- mac address
    if (sortIconFilter.AD) {
      return dispatch(
        getProjectByCode(
          code,
          date,
          logType,
          pageNo,
          record,
          projectCode.code,
          "-device.did"
        )
      );
    } else if (!sortIconFilter.AD) {
      setSortIconFilter({
        ...sortIconFilter,
        LM: false,
        AD: true,
        LT: false,
        DA: false,
        TI: false,
      });
      return dispatch(
        getProjectByCode(
          code,
          date,
          logType,
          pageNo,
          record,
          projectCode.code,
          "device.did"
        )
      );
    }
  };

  const sortTableFunLT = () => {
    // LT -- logotype
    if (sortIconFilter.LT) {
      return dispatch(
        getProjectByCode(
          code,
          date,
          logType,
          pageNo,
          record,
          projectCode.code,
          "-log.type"
        )
      );
    } else if (!sortIconFilter.LT) {
      setSortIconFilter({
        ...sortIconFilter,
        LM: false,
        AD: false,
        LT: true,
        DA: false,
        TI: false,
      });
      return dispatch(
        getProjectByCode(
          code,
          date,
          logType,
          pageNo,
          record,
          projectCode.code,
          "log.type"
        )
      );
    }
  };

  const sortTableFunDT = () => {
    // DT -- date TI-- time
    if (sortIconFilter.DA || sortIconFilter.TI) {
      return dispatch(
        getProjectByCode(
          code,
          date,
          logType,
          pageNo,
          record,
          projectCode.code,
          "-log.date"
        )
      );
    } else if (!sortIconFilter.DA || !sortIconFilter.TI) {
      setSortIconFilter({
        ...sortIconFilter,
        LM: true,
        AD: false,
        LT: false,
        DA: true,
        TI: true,
      });
      return dispatch(
        getProjectByCode(
          code,
          date,
          logType,
          pageNo,
          record,
          projectCode.code,
          "log.date"
        )
      );
    }
  };

  // @@ SEARCH MECHANISMS IMPLEMENTATION  STARTS HERE -----
  const handleSearchFunc = (event) => {
    setSearchField(event.target.value);
  };
  let tableData = data && data.data && data.data.logs;

  let search =
    (searchField && searchField.trim() && searchField.trim().toLowerCase()) ||
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

  // @@ first dispatch of table data
  useEffect(() => {
    dispatch(
      getProjectByCode(code, date, logType, pageNo, record, projectCode.code)
    );
  }, [pageNo, startDate, endDate]);

  useEffect(() => {
    // Providing data to the type-dropdown
    props.tableDataStateFun(
      code,
      date,
      logType,
      pageNo,
      record,
      projectCodeType
    );
  }, []);

  const allCheckBoxFun = (items = null, index = null) => {
    // @@ FOR SELECTION ITEMS IS TRITE AS THE EVENT  items == e
    var allCheckId = items && items.target && items.target.id;
    if (allCheckId) setAllCheckBox(true);
    else setAllCheckBox(false);

    // @@ FOR SINGLE CHECKBOX SELECTION
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

  return (
    <TableCard height="100%" borderRadius="10px">
      <section>
        {/*SEARCH SECTION  */}
        <section className={Style.searchSection}>
          <input
            type="text"
            placeholder="Search..."
            value={searchField}
            onChange={handleSearchFunc}
          />
          {/* Chips section */}
          <section className={Style.chipOuter}>
            {logType.info && chipsSection[0]}
            {logType.warn && chipsSection[1]}
            {logType.error && chipsSection[2]}
            {logType.debug && chipsSection[3]}
            {logType.verbose && chipsSection[4]}

            {/* DATE CHIPS */}
            {dateState.start && dateChips[0]}
            {dateState.end && dateChips[1]}
          </section>
          <section
            style={{
              opacity: allCheckBox ? "100%" : "30%",
              cursor: allCheckBox ? "pointer" : "not-allowed",
            }}
            onClick={() =>
              allCheckBox &&
              downloadCSVFun({
                data: allCheckBox ? tableData : [],
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
                <section className={Style.sortIcons} onClick={sortTableFunLM}>
                  Log Message
                  <span className="ps-2">
                    {sortIconFilter.LM ? (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortDown}
                        onClick={() => {
                          setSortIconFilter({ ...sortIconFilter, LM: false });
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortUp}
                        onClick={() => {
                          setSortIconFilter({ ...sortIconFilter, LM: true });
                        }}
                      />
                    )}
                  </span>
                </section>
              </th>
              <th>
                <section className={Style.sortIcons} onClick={sortTableFunAD}>
                  Mac Address
                  <span className="ps-2">
                    {sortIconFilter.AD ? (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortDown}
                        onClick={() => {
                          setSortIconFilter({ ...sortIconFilter, AD: false });
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortUp}
                        onClick={() => {
                          setSortIconFilter({ ...sortIconFilter, AD: true });
                        }}
                      />
                    )}
                  </span>
                </section>
              </th>
              <th>
                <section className={Style.sortIcons} onClick={sortTableFunLT}>
                  Log Type
                  <span className="ps-2">
                    {sortIconFilter.LT ? (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortDown}
                        onClick={() => {
                          setSortIconFilter({ ...sortIconFilter, LT: false });
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortUp}
                        onClick={() => {
                          setSortIconFilter({ ...sortIconFilter, LT: true });
                        }}
                      />
                    )}
                  </span>
                </section>
              </th>
              <th>
                <section className={Style.sortIcons} onClick={sortTableFunDT}>
                  Date
                  <span className="ps-2">
                    {sortIconFilter.DA ? (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortDown}
                        onClick={() => {
                          setSortIconFilter({ ...sortIconFilter, DA: false });
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortUp}
                        onClick={() => {
                          setSortIconFilter({ ...sortIconFilter, DA: true });
                        }}
                      />
                    )}
                  </span>
                </section>
              </th>
              <th>
                <section className={Style.sortIcons} onClick={sortTableFunDT}>
                  Time
                  <span className="ps-2">
                    {sortIconFilter.TI ? (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortDown}
                        onClick={() => {
                          setSortIconFilter({ ...sortIconFilter, TI: false });
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="ps-1"
                        icon={faSortUp}
                        onClick={() => {
                          setSortIconFilter({ ...sortIconFilter, TI: true });
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
                    {console.log("itmes", item)}
                    <tr>
                      <td>
                        <input
                          id={item._id}
                          type="checkbox"
                          checked={allCheckBox ? "checked" : null}
                          onChange={() => allCheckBoxFun(item, index)}
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
                            {console.log("item", item.log.message)}

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
                          statusSectionSelect
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
                              : localStorage.getItem("selected_date") &&
                                JSON.parse(
                                  localStorage.getItem("selected_date")
                                ).start
                          }
                          onChange={(e) => {
                            setDate({
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
                              : localStorage.getItem("selected_date") &&
                                JSON.parse(
                                  localStorage.getItem("selected_date")
                                ).end
                          }
                          onChange={(e) => {
                            setDate({
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
                  {statusSectionSelect ? (
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
                            checked={logType.info}
                            onClick={(e) => {
                              setLogType({
                                ...logType,
                                info: !logType.info,
                              });
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
                            checked={logType.warn}
                            onClick={(e) => {
                              setLogType({
                                ...logType,
                                warn: !logType.warn,
                              });
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
                            checked={logType.error}
                            onClick={(e) => {
                              setLogType({
                                ...logType,
                                error: !logType.error,
                              });
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
                            checked={logType.debug}
                            onClick={(e) => {
                              setLogType({
                                ...logType,
                                debug: !logType.debug,
                              });
                            }}
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
                          className={
                            activeRecord.record10
                              ? `${Style.perPagesectionInnerActive} darkModeColor`
                              : `${Style.perPagesectionInner} darkModeColor`
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
                          className={
                            activeRecord.record25 || record == 25
                              ? `${Style.perPagesectionInnerActive} darkModeColor`
                              : `${Style.perPagesectionInner} darkModeColor`
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
                          className={
                            activeRecord.record50
                              ? `${Style.perPagesectionInnerActive}darkModeColor`
                              : `${Style.perPagesectionInner} darkModeColor`
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
                          className={
                            activeRecord.record100
                              ? `${Style.perPagesectionInnerActive} darkModeColor`
                              : `${Style.perPagesectionInner} darkModeColor`
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
              date={date}
              logType={logType}
              record={record}
              projectType={projectCode.code}
            />
          </section>
        )}
      </section>
    </TableCard>
  );
}
