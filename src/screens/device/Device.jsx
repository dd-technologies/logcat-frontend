/* eslint-disable */
import React, { useRef, useEffect, useReducer, useMemo, useState } from "react";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import Style from "../../css/DevicePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import LogICon from "../../assets/icons/log.png";
import AlarmIcon from "../../assets/images/AlarmIcon.png";
import SpinnerCustom from "../../container/SpinnerCustom";
import TableCard1 from "../../container/TableCard1";
import {
  deviceAction,
  getRegisteredDetailsById,
} from "../../store/action/DeviceAction";
import { Navbar } from "../../utils/NavBar";
import SideBar from "../../utils/Sidebar";
import { ThemeContext } from "../../utils/ThemeContext";
import { deviceDataReducer } from "./store/Reducer";
import EditDetailsModal from "./model/EditDetailsModal";
import back from "../../assets/images/back.png";

import download from "../../assets/images/download.png";
import { SEARCH_FIELD } from "./store/Types";
import Pagination from "../../common/Pagination";

export default function Device() {
  const { theme } = React.useContext(ThemeContext);
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;
  const getAllDeviceLogsReducer = useSelector(
    (state) => state.getAllDeviceLogsReducer
  );
  const { data: DeviceId } = getAllDeviceLogsReducer;

  const deviceReducer = useSelector((state) => state.deviceReducer);
  const { loading, data } = deviceReducer;

  const getRegisteredDetailsReducer = useSelector(
    (state) => state.getRegisteredDetailsReducer
  );
  const { data12 } = getRegisteredDetailsReducer;
  let regDetail = data12;
  let deviceFilter = data && data.data && data.data.data;
  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 20;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data && data.data && data.data.data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data && data.data && data.data.data.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)

  useEffect(() => {
    dispatch(getRegisteredDetailsById(code));
  }, []);
  const dispatch = useDispatch();
  const initialState = {
    tableDataState: {},
    disableButton: false,
    dateDropDown: false,
    showTableField: false,

    record: localStorage.getItem("selected_record")
      ? JSON.parse(localStorage.getItem("selected_record"))
      : 25,

    DeviceId: localStorage.getItem("DeviceId")
      ? JSON.parse(localStorage.getItem("DeviceId"))
      : DeviceId,
    searchField: "",

    /**
     * @objectKey DI: Device Id,
     * @objectKey LOC: Device Location-------------,
     * @objectKey St: Error Type--------------,
     */
    sortIcons: {
      DI: false,
      LOC: false,
      St: false,
    },
    singleRowSelect: false,
    allRowSelect: false,
  };
  let navigate = useNavigate();

  const [currentStateDevices, dispatchDeviceData] = useReducer(
    deviceDataReducer,
    initialState
  );
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [checkedLogs, setCheckedLogs] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.data?.data.map((data) => data._id));
    setCheckedLogs(data?.data?.data);
    if (isCheckAll) {
      setIsCheck([]);
      setCheckedLogs([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked, name } = e.target;
    setIsCheck([...isCheck, id]);
    setCheckedLogs([...checkedLogs, JSON.parse(name)]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
      setCheckedLogs(
        checkedLogs.filter((item) => {
          return item._id !== id;
        })
      );
    }
  };

  useMemo(() => {
    const firstPageIndex = (currentPage - 1) * currentStateDevices.record;
    const lastPageIndex = firstPageIndex + currentStateDevices.record;
    return (
      data && data.data && data.data.data.slice(firstPageIndex, lastPageIndex)
    );
  }, [currentPage]);

  const ref = useRef();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const projectName = urlParams.get("name");

  //Navigation bar ==================================
  const navigation_details = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: faDatabase,
      linkName: "Logs",
      link: `/log_table?code=${code}&name=${projectName}`,
    },
    link2: {
      iconName: faDatabase,
      linkName: "Settings",
    },
    link3: {
      iconName: faDatabase,
      linkName: "Alarms",
    },
    link4: {
      iconName: faDatabase,
      linkName: "Events",
    },
  };

  const sidebar_details = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: LogICon,
      linkName: "Logs",
      link: `/log_table?code=${code}&name=${projectName}`,
    },
    link2: {
      iconName: AlarmIcon,
      linkName: "Settings",
      link: `/settings?code=${code}&name=${projectName}`,
    },
    link3: {
      iconName: AlarmIcon,
      linkName: "alarm",
      link: `/alarm?code=${code}&name=${projectName}`,
    },
    link4: {
      iconName: `/assets/images/AlarmIcon.png`,
      linkName: "Events",
      link: `/events?code=${code}&name=${projectName}`, //to do
    },
  };
  // @@ SEARCH MECHANISMS IMPLEMENTATION  STARTS HERE -----
  const handleSearchFunc = (event) => {
    dispatchDeviceData({
      type: SEARCH_FIELD,
      data: event.target.value,
    });
  };
  let search =
    (currentStateDevices.searchField &&
      currentStateDevices.searchField.trim() &&
      currentStateDevices.searchField.trim().toLowerCase()) ||
    "";

  if (search.length > 0) {
    deviceFilter = deviceFilter.filter((item) => {
      return item.deviceId.toLowerCase().includes(search);
      
      // item.ack.msg.toLowerCase().includes(search) ||
      // item.createdAt.toLowerCase().includes(search)
    });
  }

  useEffect(() => {
    dispatch(deviceAction({ page: 1, limit: recordsPerPage }));
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <SideBar />
      <Row className="rowSection">
        <Col
          xl={10}
          lg={10}
          md={10}
          sm={10}
          className={Style.NavbarColumn}
          style={{ width:"100%"}}
        >
          <div
            className=""
            style={{
              position: "relative",
              top: "3.5rem",
              marginLeft: "7%",
              width: "90%",
            }}
          >
            {/* Heading Section */}
            <div
              className="topHeading"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h3 className={Style.heading}>AgVa Pro</h3>
              <div
                className="deviceSummary"
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <Link to="/home">
                  <img src={back} style={{ width: "3rem" }} />
                </Link>
                <h4 className={Style.Header}>Device Summary</h4>
              </div>
            </div>
            <div className={Style.Container}>
              {/* Events  */}
              <Row className="mt-0">
                <Col>
                  <TableCard1 borderRadius="20px">
                    {data && data.data && data.data.data.length > 0 && (
                      <>
                        {/* SEARCH SECTION */}
                        <section className={`${Style.OuterTable}`}>
                          <div
                            className={Style.insideOuterTable}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "1rem",
                              width: "100%",
                              background:
                                " 0% 0% no-repeat padding-box #CB297B",
                              boxShadow: "0px 0px 50px #00000029",
                              borderRadius: "20px 20px 0px 0px",
                              height: "fit-content",
                              padding: "1rem",
                            }}
                          >
                            <div
                              className="search_section"
                              style={{ display: "flex", gap: "3rem" }}
                            >
                              <div
                                className="input_section"
                                style={{
                                  display: "flex",
                                  backgroundColor: "white",
                                  borderRadius: "10px",
                                  width: "90%",
                                  alignItems: "center",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faMagnifyingGlass}
                                  style={{
                                    color: "#707070",
                                    padding: "0px 8px",
                                  }}
                                />
                                <input
                                  className="search_input"
                                  type="text"
                                  placeholder="Enter Device ID"
                                  onChange={handleSearchFunc}
                                  style={{
                                    padding: "0.5rem",
                                    border: "0px",
                                    width: "100%",
                                  }}
                                />
                              </div>
                              <div>
                                <img
                                  src={download}
                                  style={{ width: "2.5rem" }}
                                />
                              </div>
                            </div>
                            <div
                              className="d-flex"
                              style={{
                                gap: "5rem",
                                padding: "10px",
                                marginLeft: "2.3rem",
                              }}
                            >
                              <div>
                                <h6 style={{ color: "white" }}>Device ID</h6>
                              </div>
                              <div>
                                <h6 style={{ color: "white" }}>Status</h6>
                              </div>
                              <div>
                                <h6 style={{ color: "white" }}>Department</h6>
                              </div>
                              <div>
                                <h6 style={{ color: "white" }}>
                                  Hospital Name
                                </h6>
                              </div>
                              <div>
                                <h6 style={{ color: "white" }}>Ward No.</h6>
                              </div>
                              <div>
                                <h6 style={{ color: "white" }}>Doctor</h6>
                              </div>
                              <div>
                                <h6 style={{ color: "white" }}>Bio-Med</h6>
                              </div>
                              <div>
                                <h6 style={{ color: "white" }}>Actions</h6>
                              </div>
                            </div>
                          </div>
                          {/* TABLE HERE */}

                          <section className={Style.alertTable}>
                            <div>
                              {records &&
                                records
                                  .filter(
                                    (item, index) =>
                                      records.findIndex(
                                        (obj) => obj.deviceId === item.deviceId
                                      ) === index
                                  )
                                  .map((item, _id) => {
                                    return (
                                      <React.Fragment key={_id}>
                                        <section className={Style.tableBody}>
                                          <section>
                                            <input
                                              type="checkbox"
                                              id={item._id}
                                              name={JSON.stringify(item)}
                                              onChange={handleClick}
                                              checked={isCheck.includes(
                                                item._id
                                              )}
                                            />
                                          </section>
                                          <section
                                            style={{
                                              color:
                                                theme == "light-theme"
                                                  ? ""
                                                  : "#fff",
                                            }}
                                          >
                                            {item.deviceId}
                                          </section>
                                          <section
                                            style={{
                                              color:
                                                theme == "light-theme"
                                                  ? ""
                                                  : "#fff",
                                            }}
                                          >
                                            {item.message == "ACTIVE" ? (
                                              <>
                                                <svg
                                                  width="40px"
                                                  height="35px"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  stroke="#11ac14"
                                                >
                                                  <g id="SVGRepo_iconCarrier">
                                                    <path
                                                      d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z"
                                                      fill="#11ac14"
                                                    ></path>
                                                  </g>
                                                </svg>
                                              </>
                                            ) : item.message == "INACTIVE" ? (
                                              <>
                                                <svg
                                                  width="40px"
                                                  height="40px"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  stroke="#ffbf00"
                                                >
                                                  <g
                                                    id="SVGRepo_bgCarrier"
                                                    stroke-width="0"
                                                  ></g>
                                                  <g
                                                    id="SVGRepo_tracerCarrier"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                  ></g>
                                                  <g id="SVGRepo_iconCarrier">
                                                    {" "}
                                                    <path
                                                      d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z"
                                                      fill="#ffbf00"
                                                    ></path>{" "}
                                                  </g>
                                                </svg>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </section>
                                          {regDetail &&
                                            regDetail.data
                                              .filter(
                                                (item1, index) =>
                                                  regDetail.data.findIndex(
                                                    (item1) =>
                                                      item.deviceId ===
                                                      item1.DeviceId
                                                  ) === index
                                              )
                                              .map((item1, _id) => {
                                                return (
                                                  <React.Fragment key={_id}>
                                                    <section
                                                      style={{
                                                        color:
                                                          theme == "light-theme"
                                                            ? ""
                                                            : "#fff",
                                                      }}
                                                    >
                                                      {item1.Department_Name}
                                                    </section>
                                                    <section
                                                      style={{
                                                        color:
                                                          theme == "light-theme"
                                                            ? ""
                                                            : "#fff",
                                                      }}
                                                    >
                                                      {item1.Hospital_Name}
                                                    </section>
                                                    <section
                                                      style={{
                                                        color:
                                                          theme == "light-theme"
                                                            ? ""
                                                            : "#fff",
                                                      }}
                                                    >
                                                      {item1.Ward_No}
                                                    </section>
                                                    <section
                                                      style={{
                                                        color:
                                                          theme == "light-theme"
                                                            ? ""
                                                            : "#fff",
                                                      }}
                                                    >
                                                      {item1.Doctor_Name}
                                                    </section>
                                                    <section
                                                      style={{
                                                        color:
                                                          theme == "light-theme"
                                                            ? ""
                                                            : "#fff",
                                                      }}
                                                    >
                                                      {item1.Bio_Med}
                                                    </section>
                                                    <section
                                                      className="d-flex"
                                                      style={{ gap: "5px" }}
                                                    >
                                                      {/* Update */}
                                                      {/* <Button title='Update'
                                                    onClick={() => {
                                                      setModalShow1(true);
                                                      { item1 }
                                                      { localStorage.setItem('item1', JSON.stringify(item1)) }
                                                      { localStorage.setItem('Department_Name', JSON.stringify(item1.Department_Name)) }
                                                    }}
                                                  >
                                                    {<Image width="20" height="20" src={editicon} className={Style.Image} />}
                                                  </Button>
                                                  <UpdateDetailsModal
                                                    show={modalShow1}
                                                    onHide={() => setModalShow1(false)}
                                                    {...item1}
                                                  /> */}
                                                      <Button
                                                        title="Next"
                                                        style={{
                                                          marginLeft: "13px",
                                                          width: "5rem",
                                                          marginLeft: "13px",
                                                          background:
                                                            "#FFFFFF 0% 0% no-repeat padding-box",
                                                          boxShadow:
                                                            "0px 0px 10px #00000029",
                                                          borderRadius: "5px",
                                                          color: "#CB297B",
                                                          fontSize: "0.8rem",
                                                        }}
                                                        onClick={() => {
                                                          navigate(
                                                            `/deviceOverview?code=${code}&projectName=${projectName}&DeviceId=${item.deviceId}`
                                                          );
                                                          {
                                                            item1;
                                                          }
                                                          {
                                                            localStorage.setItem(
                                                              "item1",
                                                              JSON.stringify(
                                                                item1
                                                              )
                                                            );
                                                          }
                                                          {
                                                            localStorage.setItem(
                                                              "message",
                                                              JSON.stringify(
                                                                item.message
                                                              )
                                                            );
                                                          }
                                                          {
                                                            localStorage.setItem(
                                                              "health",
                                                              JSON.stringify(
                                                                item.health
                                                              )
                                                            );
                                                          }
                                                          {
                                                            localStorage.setItem(
                                                              "address",
                                                              JSON.stringify(
                                                                item.address
                                                              )
                                                            );
                                                          }
                                                          {
                                                            localStorage.setItem(
                                                              "last_hours",
                                                              JSON.stringify(
                                                                item.last_hours
                                                              )
                                                            );
                                                          }
                                                          {
                                                            localStorage.setItem(
                                                              "total_hours",
                                                              JSON.stringify(
                                                                item.total_hours
                                                              )
                                                            );
                                                          }
                                                          {
                                                            localStorage.setItem(
                                                              "Department_Name",
                                                              JSON.stringify(
                                                                item1.Department_Name
                                                              )
                                                            );
                                                          }
                                                          {
                                                            localStorage.setItem(
                                                              "Hospital_Name",
                                                              JSON.stringify(
                                                                item1.Hospital_Name
                                                              )
                                                            );
                                                          }
                                                          {
                                                            localStorage.setItem(
                                                              "Doctor_Name",
                                                              JSON.stringify(
                                                                item1.Doctor_Name
                                                              )
                                                            );
                                                          }
                                                          {
                                                            localStorage.setItem(
                                                              "Ward_No",
                                                              JSON.stringify(
                                                                item1.Ward_No
                                                              )
                                                            );
                                                          }
                                                          {
                                                            localStorage.setItem(
                                                              "IMEI_NO",
                                                              JSON.stringify(
                                                                item1.IMEI_NO
                                                              )
                                                            );
                                                          }
                                                          {
                                                            localStorage.setItem(
                                                              "Bio_Med",
                                                              JSON.stringify(
                                                                item1.Bio_Med
                                                              )
                                                            );
                                                          }
                                                        }}
                                                      >
                                                        {adminInfo &&
                                                          adminInfo.data &&
                                                          adminInfo.data
                                                            .userType === "Admin"
                                                          ? "More"
                                                          : "View"}
                                                      </Button>
                                                    </section>
                                                  </React.Fragment>
                                                );
                                              })}
                                          {adminInfo &&
                                            adminInfo.data &&
                                            adminInfo.data.userType ===
                                            "Admin" ? (
                                            <>
                                              <Button
                                                title="Edit/Register"
                                                style={{
                                                  marginLeft: "13px",
                                                  width: "5rem",
                                                  marginLeft: "13px",
                                                  background:
                                                    "#FFFFFF 0% 0% no-repeat padding-box",
                                                  boxShadow:
                                                    "0px 0px 10px #00000029",
                                                  borderRadius: "5px",
                                                  color: "#CB297B",
                                                  padding: "0px",
                                                  fontSize: "0.8rem",
                                                }}
                                                onClick={() => {
                                                  setModalShow(true);
                                                  {
                                                    item;
                                                  }
                                                  localStorage.setItem(
                                                    "DeviceId",
                                                    JSON.stringify(
                                                      item.deviceId
                                                    )
                                                  );
                                                }}
                                              >
                                                Register
                                              </Button>
                                              <EditDetailsModal
                                                show={modalShow}
                                                onHide={() =>
                                                  setModalShow(false)
                                                }
                                                {...item}
                                                item={JSON.parse(
                                                  localStorage.getItem(
                                                    "DeviceId"
                                                  )
                                                )}
                                              />
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </section>
                                      </React.Fragment>
                                    );
                                  })}
                            </div>
                          </section>
                        </section>
                        {/* PAGINATION */}
                        <section className="p-2">
                          <Pagination
                            code={code}
                            projectType={currentStateDevices.projectCode}
                            currentPage={currentPage}
                            totalCount={
                              data?.data?.count ? data?.data?.count : 0
                            }
                            pageSize={currentStateDevices.record}
                            onPageChange={(page) => setCurrentPage(page)}
                          />
                        </section>
                      </>
                    )}
                    {regDetail && regDetail == 0 && (
                      <section className={Style.noDataFound}>
                        <p
                          style={{
                            color: theme == "light-theme" ? `#000` : `#fff`,
                          }}
                        >
                          No Data Found
                        </p>
                      </section>
                    )}
                    {loading && <SpinnerCustom />}
                  </TableCard1>
                </Col>
              </Row>
            </div>
          </div>
          </Col>
      </Row>
      <div
        className="left_arrow" style={{ display: "flex", justifyContent: "flex-end",margin:"2rem" }}
      >
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-end" style={{ display: "flex", alignItems: 'center' }}>
            {incPage > 1 ?
              <Link onClick={prePage} style={{ border: "0px", backgroundColor: "white" }}>
                <img src={back} style={{ width: "3rem" }} />
              </Link>
              : " "}
            {numbers.map((n, i) => (
              <li key={i} class={`page-item ${incPage == n ? 'active' : ""}`}><a style={{ borderRadius: "100px", margin: "5px" }} class="page-link" href="#" onClick={() => changeCPage(n)}>{n}</a></li>
            ))}
            {incPage !== totalPage ?
              <Link onClick={nextPage} style={{ border: "0px", backgroundColor: "white" }}>
                <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
              </Link>
              : " "}
          </ul>
        </nav>
      </div>
    </div>
  );
  function prePage() {
    dispatch(deviceAction({ page: incPage - 1, limit: recordsPerPage }))
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    dispatch(deviceAction({ page: incPage + 1, limit: recordsPerPage }))
  }
}
