import React, { useState, useRef, useEffect } from "react";

import {
  faCaretDown,
  faDatabase,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Navbar } from "../../utils/NavBar";
import SideBar from "../../utils/Sidebar";
import Style from "./Alarm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TypeDropDown from "../LogTable/components/Table/TypeDropDown";
import { useDispatch, useSelector } from "react-redux";
import DateIcons from "../../assets/icons/date.png";
import CustomeDropDown from "../../Container/DropDown";
import LogICon from "../../assets/icons/log.png";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import AlarmIcon from "../../assets/images/AlarmIcon.png";
import { alarmAction } from "../../redux/action/AlarmAction";
import SpinnerCustome from "../../Container/SpinnerCustome";
import TableCard from "../../Container/TableCard";
import ReactPaginate from "react-paginate";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { getProjectByCode } from "../../redux/action/ProjectAction";
import { ThemeContext } from "../../utils/ThemeContext";

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

export default function Alarm(props) {
  const { theme } = React.useContext(ThemeContext);
  const [tableDataState, setTableDataState] = useState({});
  const [diffDate, setDiffDate] = useState(
    localStorage.getItem("diffDate") || 90
  );
  const [disableButton, setDisableButton] = useState(false);

  let filedate = new Date();
  const [dateDropDown, setDateDropDown] = useState(false);
  // filter data fields with table
  const [showTableField, setShowTableField] = useState(false);

  const [record, setRecords] = useState(
    localStorage.getItem("selected_record")
      ? JSON.parse(localStorage.getItem("selected_record"))
      : 25
  );
  const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
  const { data: projectType } = getModelCodeReducer;
  // console.log("project type", projectType);

  const [projectCode, setProjectCode] = useState(
    localStorage.getItem("project_type")
      ? JSON.parse(localStorage.getItem("project_type")).typeCode
      : projectType &&
          projectType.modelList[0] &&
          projectType.modelList[0].typeCode
  );

  const bootstrapTableRef = useRef();

  const alarmReducer = useSelector((state) => state.alarmReducer);
  // console.log("first", alarmReducer);
  const { loading, data } = alarmReducer;
  // console.log("dataalarm", alarmReducer);

  const products = (data && data.data && data.data.alerts) || [];

  // console.log("first21", products);
  const dispatch = useDispatch();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const projectName = urlParams.get("name");

  const ref = useRef();

  // DATE FILTER
  // Filter crash free STATICS & Trend wrt to date
  const DateFilter = () => {
    setDateDropDown(true);
    if (dateDropDown) {
      setDateDropDown(false);
    }
  };

  let arrayOfObjectIndex = [];

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      var objOfRowIndex = { [rowIndex]: isSelect };

      arrayOfObjectIndex.push(objOfRowIndex);

      // looping object of an array
      for (var key in arrayOfObjectIndex) {
        var obj = arrayOfObjectIndex[key];
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            // console.log("first obj", prop + " = " + !obj[prop]);
            if (!obj[prop]) {
              arrayOfObjectIndex.pop();
            }
          }
        }
      }

      // console.log("first", arrayOfObjectIndex);

      if (
        bootstrapTableRef &&
        bootstrapTableRef.current &&
        bootstrapTableRef.current.selectionContext &&
        !bootstrapTableRef.current.selectionContext.selected
      ) {
        setDisableButton(true);
      } else {
        setDisableButton(false);
      }
    },
    onSelectAll: (row, isSelect, rowIndex, e) => {
      if (isSelect.length > 0) setDisableButton(false);
      if (!row) setDisableButton(true);
    },
    style: { backgroundColor: "#0099a4" },
  };

  // navigation
  const navdetails = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: faDatabase,
      linkName: "Logs",
      link: `/logtable?code=${code}&name=${projectName}&pagename=logpage`,
    },
    link2: {
      iconName: faDatabase,
      linkName: "Settings",
    },
  };

  const sidebarDetails = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: LogICon,
      linkName: "Logs",
      link: `/logtable?code=${code}&name=${projectName}&pagename=logpage`,
    },
    link2: {
      iconName: AlarmIcon,
      linkName: "Settings",
      link: `/settings?code=${code}&name=${projectName}&pagename=settings`,
    },
    link3: {
      iconName: AlarmIcon,
      linkName: "alarm",
      link: `/alarm?code=${code}&name=${projectName}&pagename=alarm`,
    },
  };

  // ALARM TABLE COLUMS
  const columns = [
    {
      dataField: "did",
      text: "MAC Address",
      sort: true,
    },

    {
      dataField: "ack.code",
      text: "Code",
      sort: true,
      headerStyle: () => {
        return {
          backgroundColor: "#257d7c",
          color: "#fff",
        };
      },
    },
    {
      dataField: "ack.msg",
      text: "Message",
      sort: true,
    },
    {
      dataField: `ack.date`,
      text: "Date",
      sort: true,
      formatter: (cell) => {
        cell = cell.split("T")[0];
        let day = cell.split("-")[2];
        let month = cell.split("-")[1];
        let year = cell.split("-")[0];
        cell = `${day}-${month}-${year}`;
        return cell.split("T")[0];
      },
    },
    {
      dataField: `ack.date`,
      text: "Time",
      headerStyle: () => {
        return {
          backgroundColor: "#257d7c",
          color: "#fff",
          width: "100px",
        };
      },
      formatter: (cell) => {
        // console.log(`Timme ${cell}`);
        cell = cell.split("T")[1];
        cell = cell.split(".")[0];
        let seconds = cell.split(":")[2];
        let minutes = cell.split(":")[1];
        let hours = cell.split(":")[0];
        cell =
          seconds !== "00" && hours !== "00" && minutes !== "00"
            ? `${hours}:${minutes}:${seconds}`
            : "N/A";
        return cell;
      },
      sort: true,
    },
  ];

  //   FIRST TIME ALARM ACTION DISPATCH
  useEffect(() => {
    // console.log("alarm error alarm useeffect ", projectCode);
    dispatch(alarmAction(code, projectCode, diffDate));
  }, [dispatch, projectCode, diffDate]);

  // HANDLE PAGE CLICK
  const handlePageClick = (data) => {
    // console.log("alarm error alarm handle page click ", projectCode);
    return dispatch(
      alarmAction(code, projectCode, diffDate, data.selected + 1, record)
    );
  };

  return (
    <div>
      <Row className="rowSection">
        <Col xl={2} lg={2} md={2} sm={2} className="noSidebar colSection">
          <SideBar
            sidebarDetails={sidebarDetails}
            className={Style.SideBarColume}
          />
        </Col>
        <Col
          xl={10}
          lg={10}
          md={10}
          sm={10}
          className={`${Style.NavbarColumn} colSection`}
        >
          <Navbar navdetails={navdetails} />
          <Container className={Style.mainContainer}>
            <h1 className=" darkModeColor">Alerts Summary</h1>
            <Row className="mt-4">
              <Col xl={10} md={9} sm={9}>
                <TypeDropDown
                  tableDataState={tableDataState}
                  diffDate={diffDate}
                  codeReducer={getModelCodeReducer}
                  setProjectCode={setProjectCode}
                />
              </Col>

              {/* DATE FILTER */}
              <Col xl={2} md={3} sm={3} className={Style.filterWithDate}>
                <section className={Style.filterwithDate} ref={ref}>
                  <section className={Style.datafilter} onClick={DateFilter}>
                    <Image src={DateIcons} />
                    <p
                      style={{ fontSize: ".9rem" }}
                      className="m-2 darkModeColor"
                    >
                      {diffDate == 10
                        ? `last 10 days`
                        : diffDate == 7
                        ? `last 7 days`
                        : diffDate == 15
                        ? `last 15 days`
                        : diffDate == 30
                        ? `last 30 days`
                        : diffDate == 45
                        ? `last 45 days`
                        : diffDate == 60
                        ? `last 60 days`
                        : diffDate == 90
                        ? `last 90 days`
                        : null}
                    </p>
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      color="#2A9AA4"
                      style={{
                        width: "10px",
                        height: "20px",
                        marginBottom: "2px",
                      }}
                    />
                  </section>

                  <section>
                    {dateDropDown ? (
                      <CustomeDropDown width="100%" zIndex="8">
                        <p
                          style={{ fontSize: ".8rem" }}
                          className={`${Style.productVersion} mt-1 darkModeColor `}
                          onClick={() => {
                            setDiffDate(7);
                            localStorage.setItem("diffDate", 7);
                            setDateDropDown(false);
                          }}
                        >
                          7 days
                        </p>
                        <p
                          style={{ fontSize: ".8rem" }}
                          className={`${Style.productVersion} mt-1 darkModeColor`}
                          onClick={() => {
                            setDiffDate(15);
                            localStorage.setItem("diffDate", 15);
                            setDateDropDown(false);
                          }}
                        >
                          15 days
                        </p>

                        <p
                          style={{ fontSize: ".8rem" }}
                          className={`${Style.productVersion} mt-1 darkModeColor`}
                          onClick={() => {
                            setDiffDate(30);
                            localStorage.setItem("diffDate", 30);
                            setDateDropDown(false);
                          }}
                        >
                          30 days
                        </p>
                        <p
                          style={{ fontSize: ".8rem" }}
                          className={`${Style.productVersion} mt-1 darkModeColor`}
                          onClick={() => {
                            setDiffDate(45);
                            localStorage.setItem("diffDate", 45);
                            setDateDropDown(false);
                          }}
                        >
                          45 days
                        </p>
                        <p
                          style={{ fontSize: ".8rem" }}
                          className={`${Style.productVersion} mt-1 darkModeColor`}
                          onClick={() => {
                            setDiffDate(60);
                            localStorage.setItem("diffDate", 60);
                            setDateDropDown(false);
                          }}
                        >
                          60 days
                        </p>
                        <p
                          style={{ fontSize: ".8rem" }}
                          className={`${Style.productVersion} mt-1 darkModeColor`}
                          onClick={() => {
                            setDiffDate(90);
                            localStorage.setItem("diffDate", 90);
                            setDateDropDown(false);
                          }}
                        >
                          90 days
                        </p>
                      </CustomeDropDown>
                    ) : null}
                  </section>
                </section>
              </Col>
            </Row>
            {/* Events  */}
            <Row className="mt-4">
              <Col>
                {/* Table with toolkit provider */}
                <TableCard borderRadius="10px">
                  {data && data.data && data.data.alerts.length > 0 && (
                    <>
                      <section className={`${Style.OuterTable} `}>
                        <ToolkitProvider
                          keyField="_id"
                          data={products}
                          columns={columns}
                          search
                          exportCSV={{
                            fileName: `Alert_${code}_${filedate.toISOString()}.csv`,
                            onlyExportSelection: true,
                            exportAll: true,
                          }}
                        >
                          {(toolkitProps) => (
                            <>
                              {/* {console.log("props searchbar", props.searchProps)} */}
                              <section className={Style.searchBar}>
                                <SearchBar
                                  placeholder="Search..."
                                  {...toolkitProps.searchProps}
                                />
                                {/* {console.log(
                                  `csv props ${toolkitProps.csvProps}`
                                )} */}
                                <ExportCSVButton
                                  {...toolkitProps.csvProps}
                                  disabled={!disableButton ? "disabled" : ""}
                                >
                                  <FontAwesomeIcon icon={faDownload} />
                                </ExportCSVButton>
                              </section>
                              <BootstrapTable
                                ref={bootstrapTableRef}
                                selectRow={selectRow}
                                {...toolkitProps.baseProps}
                              />
                            </>
                          )}
                        </ToolkitProvider>
                      </section>
                      <section className="p-2">
                        <ReactPaginate
                          breakLabel=". . ."
                          nextLabel="Next >"
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={4}
                          pageCount={
                            data && data.data && data.data.count / record
                          }
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
                      </section>
                    </>
                  )}

                  {data && data.data && data.data.alerts.length == 0 && (
                    <p
                      style={{
                        width: "100%",
                        height: "600%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "120px 0px",
                        fontSize: "1.7rem",
                        color: theme == "dark-content" ? `#fff` : `#000`,
                      }}
                    >
                      No data found
                    </p>
                  )}

                  {loading && <SpinnerCustome />}
                </TableCard>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
}