import {
  faCaretDown,
  faDatabase,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Navbar } from "../../utils/NavBar";
import { SideBar } from "../../utils/Sidebar";
import Style from "./Alarm.module.scss";
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
import BootstrapTable from "react-bootstrap-table-next/lib/src/bootstrap-table";
import AlarmIcon from "../../assets/images/AlarmIcon.png";
import { alarmAction } from "../../redux/action/AlarmAction";
import Spinner from "../../Container/Spinner";
import TableCard from "../../Container/TableCard";

export default function Alarm(props) {
  const [tableDataState, setTableDataState] = useState({});
  const [diffDate, setDiffDate] = useState(
    localStorage.getItem("diffDate") || 90
  );

  let filedate = new Date();
  const [dateDropDown, setDateDropDown] = useState(false);
  // filter data fields with table
  const [showTableField, setShowTableField] = useState(false);

  const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);

  const alarmReducer = useSelector((state) => state.alarmReducer);
  console.log("first", alarmReducer);
  const { loading, data } = alarmReducer;
  const products = data && data.data && data.data.alerts;
  console.log("first21", products);
  const dispatch = useDispatch();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const projectName = urlParams.get("name");

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  const ref = useRef();

  // DATE FILTER
  // Filter crash free STATICS & Trend wrt to date
  const DateFilter = () => {
    setDateDropDown(true);
    if (dateDropDown) {
      setDateDropDown(false);
    }
  };

  // navigation
  const navdetails = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: faDatabase,
      linkName: "Logs",
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
    },
    link2: {
      iconName: AlarmIcon,
      linkName: "alarm",
      link: `/alarm?code=${code}&name=${projectName}&pagename=settings`,
    },
  };

  // ALARM TABLE COLUMS
  const columns = [
    {
      dataField: "did",
      text: "Mac Address",
    },

    {
      dataField: "ack",
      text: "Mac Address",
      formatter: (cell) => {
        console.log("cell", cell);

        // Object.entries(cell).forEach(([key, value]) =>
        //   console.log("cell", key, value)
        // );
      },
    },
  ];

  const selectRow = {
    mode: "checkbox",
    // clickToSelect: true,

    style: { backgroundColor: "#0099a4" },
  };

  //   FIRST TIME ALRAM ACTION DISPATCH
  useEffect(() => {
    dispatch(alarmAction("001"));
  }, [dispatch]);

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
          <Container className={`${Style.mainContainer} container`}>
            <Row>
              <Col xl={10} md={9} sm={9}>
                <TypeDropDown
                  tableDataState={tableDataState}
                  diffDate={diffDate}
                  codeReducer={getModelCodeReducer}
                />
              </Col>

              {/* DATE FILTER */}
              <Col xl={2} md={3} sm={3} className={Style.filterWithDate}>
                <section className={Style.filterwithDate} ref={ref}>
                  <section className={Style.datafilter} onClick={DateFilter}>
                    <Image src={DateIcons} />
                    <p
                      style={{
                        fontSize: "1rem",
                      }}
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
                          style={{}}
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
                          style={{}}
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
                          style={{}}
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
                          style={{}}
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
                          style={{}}
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
                          style={{}}
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
                  <section className={`${Style.OuterTable} `}>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <ToolkitProvider
                        keyField="id"
                        data={products}
                        search
                        columns={columns}
                      >
                        {(props) => (
                          <div>
                            <ExportCSVButton {...props.csvProps}>
                              <FontAwesomeIcon icon={faDownload} />
                            </ExportCSVButton>
                            <BootstrapTable {...props.baseProps} />
                          </div>
                        )}
                      </ToolkitProvider>
                    )}
                  </section>
                </TableCard>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
