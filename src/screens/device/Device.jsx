/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Style from "../../css/DevicePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import SpinnerCustom from "../../container/SpinnerCustom";
import {
  deviceAction,
  getRegisteredDetailsById,
  getSingleDeviceIdByUser,
  getSingleDeviceIdDetails,
} from "../../store/action/DeviceAction";
import { Navbar } from "../../utils/NavBar";
import SideBar from "../../utils/Sidebar";
import { ThemeContext } from "../../utils/ThemeContext";
import EditDetailsModal from "./model/EditDetailsModal";
import UpdateDetailsModal from "./model/UpdateDetailsModal"
import back from "../../assets/images/back.png";
import download from "../../assets/images/download.png";

export default function Device() {
  const [query, setQuery] = useState("");
  const { theme } = React.useContext(ThemeContext);
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;
  const userType = adminInfo && adminInfo.data && adminInfo.data.userType
  const userId = adminInfo && adminInfo.data && adminInfo.data._id
  const deviceReducer = useSelector((state) => state.deviceReducer);
  const { loading, data } = deviceReducer;

  const deviceAssignDataByUserId = useSelector((state) => state.deviceAssignDataByUserId);
  const { data: assignDeviceData } = deviceAssignDataByUserId
  const getRegisteredDetailsReducer = useSelector(
    (state) => state.getRegisteredDetailsReducer
  );
  const { data12 } = getRegisteredDetailsReducer;
  let regDetail = data12;
  const [allData, setAllData] = useState()

  useEffect(() => {
    if (userType === "User") {
      setAllData(assignDeviceData && assignDeviceData.data && assignDeviceData.data.Assigned_Devices)
    }
    else {
      setAllData(data && data.data && data.data.data)
    }
  }, [])
  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 20;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allData && allData.slice(firstIndex, lastIndex);
  console.log("records", records)
  const npage = Math.ceil(allData && allData.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)
  useEffect(() => {
    dispatch(getRegisteredDetailsById(code));
  }, []);
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const projectName = urlParams.get("name");
  useEffect(() => {
    if (userType == "User") {
      dispatch(getSingleDeviceIdByUser(userId));
    }
    else {
      dispatch(deviceAction({ page: 1, limit: recordsPerPage }));
    }
  }, [dispatch]);

  const handleClickSearch = () => {
    if (query && query.length > 0) {
      dispatch(deviceAction({ page: 1, limit: recordsPerPage, searchData: query }));
    }
  }
  const handleSearchChange = (e) => {
    setQuery(e.target.value.toLowerCase())
  }

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
          style={{ width: "100%" }}
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
                  <div className={Style.tableCard} borderRadius="20px">
                    <>
                      {/* SEARCH SECTION */}
                      <section className={Style.OuterTable}>
                        <div
                          className={Style.insideOuterTable}
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
                              <input
                                className="search_input"
                                type="text"
                                placeholder="Enter Device ID"
                                onChange={handleSearchChange}
                                style={{
                                  padding: "0.5rem",
                                  border: "0px",
                                  width: "100%",
                                }}
                              />
                              <button className={Style.searchBtn} onClick={handleClickSearch}>
                                <FontAwesomeIcon
                                  icon={faMagnifyingGlass}
                                  style={{
                                    color: "#ffff",
                                    padding: "0px 8px",
                                  }}
                                />
                              </button>
                            </div>
                            <div>
                              <img
                                src={download}
                                style={{ width: "2.5rem" }}
                              />
                            </div>
                          </div>
                          <div
                            className={Style.deviceDataText}
                          >
                            <div>
                              <span className={Style.deviceTextData}>Device ID</span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>Status</span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>Department</span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>
                                Hospital Name
                              </span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>Ward No.</span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>Doctor</span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>Bio-Med</span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>Actions</span>
                            </div>
                          </div>
                        </div>
                        {/* TABLE HERE */}
                        {userType == 'Admin' ?
                          (records && records.length > 0 ?
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
                                            <section
                                              className={Style.insideTextData}
                                            >
                                              {item.deviceId}
                                            </section>
                                            <section
                                              className={Style.insideTextData}
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
                                                        className={Style.insideTextData}
                                                      >
                                                        {item1.Department_Name}
                                                      </section>
                                                      <section
                                                        className={Style.insideTextData}
                                                      >
                                                        {item1.Hospital_Name}
                                                      </section>
                                                      <section
                                                        className={Style.insideTextData}
                                                      >
                                                        {item1.Ward_No}
                                                      </section>
                                                      <section
                                                        className={Style.insideTextData}
                                                      >
                                                        {item1.Doctor_Name}
                                                      </section>
                                                      <section
                                                        className={Style.insideTextData}
                                                      >
                                                        {item1.Bio_Med}
                                                      </section>
                                                      <section
                                                      >
                                                        {/* Update */}
                                                        {/* {regDetail && regDetail.data && regDetail.data.length > 0? */}

                                                        {adminInfo &&
                                                          adminInfo.data &&
                                                          adminInfo.data
                                                            .userType === "Admin"
                                                          ? <button
                                                            className={Style.moreBtn}
                                                            title='Edit'
                                                            onClick={(e) => {
                                                              setModalShow1(true);
                                                              dispatch(getSingleDeviceIdDetails(item1.DeviceId))
                                                              { localStorage.setItem('item1', JSON.stringify(item1)) }
                                                            }}
                                                          >
                                                            Edit
                                                          </button> : " "}
                                                        {/* : " "} */}
                                                        <UpdateDetailsModal
                                                          show={modalShow1}
                                                          onHide={() => setModalShow1(false)}
                                                          {...item1}
                                                          devicdId={item.deviceId}
                                                        />
                                                        <button
                                                          title="Next"
                                                          className={Style.moreBtn}
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
                                                        </button>

                                                      </section>
                                                    </React.Fragment>
                                                  );
                                                })}
                                            {/* Register Button */}
                                            {adminInfo &&
                                              adminInfo.data &&
                                              adminInfo.data.userType ===
                                              "Admin" ? (
                                              <>
                                                {regDetail && regDetail.data ?
                                                  <button
                                                    className={Style.regButton}
                                                    title="Register"
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
                                                  </button>
                                                  : " "}
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
                            :
                            <section style={{ width: '100%', height: '100%', marginTop: '10rem', marginBottom: '10rem' }}>
                              {records && records.length == 0 && (
                                <section className={Style.noDataFound}>
                                  <span>
                                    No Data Found
                                  </span>
                                </section>
                              )}
                            </section>)

                          :
                          (records && records.length > 0 ?
                            <section className={Style.alertTable}>
                              <div>
                                {records &&
                                  records
                                    .map((item, _id) => {
                                      return (
                                        <React.Fragment key={_id}>
                                          <section className={Style.tableBody}>
                                            <section
                                              className={Style.insideTextData}
                                            >
                                              {item.DeviceId}
                                            </section>
                                            <section
                                              className={Style.insideTextData}
                                            >
                                              {item.Status == "ACTIVE" ? (
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
                                              ) : item.Status == "INACTIVE" ? (
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
                                            <section
                                              className={Style.insideTextData}
                                            >
                                              {item.Department_Name}
                                            </section>
                                            <section
                                              className={Style.insideTextData}
                                            >
                                              {item.Hospital_Name}
                                            </section>
                                            <section
                                              className={Style.insideTextData}
                                            >
                                              {item.Ward_No}
                                            </section>
                                            <section
                                              className={Style.insideTextData}
                                            >
                                              {item.Doctor_Name}
                                            </section>
                                            <section
                                              className={Style.insideTextData}
                                            >
                                              {item.Bio_Med}
                                            </section>
                                            {/* Next Button */}
                                            <button
                                              title="Details"
                                              className={Style.moreBtn}
                                              onClick={() => {
                                                navigate(
                                                  `/deviceOverview?code=${code}&projectName=${projectName}&DeviceId=${item.DeviceId}`
                                                );
                                                {
                                                  item;
                                                }
                                                {
                                                  localStorage.setItem(
                                                    "item1",
                                                    JSON.stringify(
                                                      item
                                                    )
                                                  );
                                                }
                                                {
                                                  localStorage.setItem(
                                                    "message",
                                                    JSON.stringify(
                                                      item.Status
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
                                                      item.Department_Name
                                                    )
                                                  );
                                                }
                                                {
                                                  localStorage.setItem(
                                                    "Hospital_Name",
                                                    JSON.stringify(
                                                      item.Hospital_Name
                                                    )
                                                  );
                                                }
                                                {
                                                  localStorage.setItem(
                                                    "Doctor_Name",
                                                    JSON.stringify(
                                                      item.Doctor_Name
                                                    )
                                                  );
                                                }
                                                {
                                                  localStorage.setItem(
                                                    "Ward_No",
                                                    JSON.stringify(
                                                      item.Ward_No
                                                    )
                                                  );
                                                }
                                                {
                                                  localStorage.setItem(
                                                    "IMEI_NO",
                                                    JSON.stringify(
                                                      item.IMEI_NO
                                                    )
                                                  );
                                                }
                                                {
                                                  localStorage.setItem(
                                                    "Bio_Med",
                                                    JSON.stringify(
                                                      item.Bio_Med
                                                    )
                                                  );
                                                }
                                              }}
                                            >
                                              View
                                            </button>
                                          </section>
                                        </React.Fragment>
                                      );
                                    })}
                              </div>
                            </section>
                            :
                            <section style={{ width: '100%', height: '100%', marginTop: '10rem', marginBottom: '10rem' }}>
                              {records && records.length == 0 && (
                                <section className={Style.noDataFound}>
                                  <span>
                                    No Data Found
                                  </span>
                                </section>
                              )}
                            </section>)
                        }
                        {loading && <SpinnerCustom />}
                      </section>
                    </>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      <div
        className="left_arrow" style={{ display: "flex", justifyContent: "flex-end", margin: "2rem" }}
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
                {/* {recordsPerPage < 19 ?
                  <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
                  : ''} */}
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