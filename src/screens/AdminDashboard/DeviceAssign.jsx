import React from "react";
import { Navbar } from "../../utils/NavBar";
import SideBar from "../../utils/Sidebar";
import back from "../../assets/images/back.png";
import { Link, useNavigate } from "react-router-dom";
import Style from "../../css/DeviceAssign.module.css";
import { Row, Col } from "react-bootstrap";
import TableCard1 from "../../container/TableCard1";
import { getAllUsersDetalisById } from "../../store/action/AdminDashboard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Model from "./Model";
import { Button, Modal } from 'flowbite-react';
import { Toaster, toast } from "react-hot-toast";
import { deviceAssignAction } from "../../store/action/AdminDashboard";
import { getRegisteredDetailsById } from "../../store/action/DeviceAction";
// import { toast, Toaster } from "react-hot-toast";
function DeviceAssign() {
  const [userId, setUserId] = useState("");
  const [openModal, setOpenModal] = useState()
  const props = { openModal, setOpenModal };

  const allUsersDetailsReducer = useSelector(
    (state) => state.allUsersDetailsReducer
  );
  const { data } = allUsersDetailsReducer;
  const registerUsers = data && data.data;
  const registerUsersId = registerUsers;

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  console.log("registerUsers", registerUsers)


  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = registerUsersId && registerUsersId.slice(firstIndex, lastIndex);
  const npage = Math.ceil(registerUsersId && registerUsersId.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)
  useEffect(() => {
    dispatch(getAllUsersDetalisById({ page: 1, limit: recordsPerPage }));
  }, []);

  const getRegisteredDetailsReducer = useSelector(
    (state) => state.getRegisteredDetailsReducer
  );
  const { data12 } = getRegisteredDetailsReducer;
  let regDetail = data12;
  const dispatch = useDispatch();
  const [selectId, setSelectId] = useState([]);
  const assignBtn = (e) => {
    if (!selectId.length) {
      toast.error("Select DeviceId");
    } else {
      dispatch(deviceAssignAction({  DeviceId: selectId }));
      toast.success("Success");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  useEffect(() => {
    dispatch(getRegisteredDetailsById());
  }, []);
  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Add the value to the array if the checkbox is checked
      setSelectId([...selectId, value]);
    } else {
      // Remove the value from the array if the checkbox is unchecked
      setSelectId(selectId.filter((item) => item !== value));
    }
  };
  return (
    <>
      <Navbar />
      <SideBar />
      <div
        className={Style.container}
        id="blur"
        style={{
          position: "relative",
          top: "6rem",
          marginLeft: "7%",
          width: "90%",
        }}
      >
        {/* Heading Section */}
        <div
          className="topHeading"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className={Style.deviceSummary}>
            <Link to="/adminDashboard">
              <img src={back} style={{ width: "3rem" }} />
            </Link>
            <h4 className={Style.Header}>Device Assign</h4>
          </div>
        </div>
        <div className={Style.content}>
          {/* Events  */}
          <Row className="mt-0">
            <Col>
              <TableCard1 borderRadius="20px">
                <>
                  <section className={`${Style.OuterTable} `}>
                    <div className={Style.upperData}>
                      <div
                        className="d-flex"
                        style={{
                          gap: "20rem",
                          padding: "10px",
                        }}
                      >
                        <div>
                          <h6 className={Style.UpperTextData}>User Name</h6>
                        </div>
                        <div>
                          <h6 className={Style.UpperTextData}>Email</h6>
                        </div>
                        <div>
                          <h6 className={Style.UpperTextData}>Hospital Name</h6>
                        </div>
                        <div>
                          <h6 className={Style.UpperTextData}>Actions</h6>
                        </div>
                      </div>
                    </div>
                    {/* TABLE HERE */}

                    <div className={Style.lowerData}>
                      <div className="d-flex">
                        <div style={{ width: "100%" }}>
                          {records &&
                            records.map((entry, index) => {
                              return {
                                entry: entry,
                                index: index,
                              };
                            })
                              .filter((proj) => {
                                return proj.entry.userType === "User";
                              })
                              .map((proj, _id) => {
                                var firstname = proj.entry.firstName;
                                var name = firstname + " " + proj.entry.lastName;
                                return (
                                  <React.Fragment key={_id}>
                                    <div className={Style.tableBody}>
                                      <div className={Style.insideTableBody}>
                                        {name}
                                      </div>
                                      <div className={Style.insideTableBody}>
                                        {proj.entry.email}
                                      </div>
                                      <div className={Style.insideTableBody}>
                                        {proj.entry.hospitalName}
                                      </div>
                                      <div style={{display:'flex',flexDirection:'column',gap:'2rem',alignItems:'center'}}>
                                        <button
                                          className={Style.adminbtn}
                                          onClick={() =>
                                            setIsOpen(true, setUserId(proj.entry._id))
                                          }
                                        >
                                          Assign
                                        </button>
                                        <button
                                          className={Style.viewbtn}
                                          onClick={() => {
                                            navigate(`/deleteAssignDevice?userId=${proj.entry._id}`)
                                          }

                                          }
                                        >
                                          View
                                        </button>
                                      </div>
                                    </div>
                                  </React.Fragment>
                                );
                              })}
                          <Model
                            _id={userId}
                            open={isOpen}
                            onClose={() => setIsOpen(false)}
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              </TableCard1>
            </Col>
          </Row>
          <div
            className="left_arrow" style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-end" style={{ display: "flex", alignItems: 'center' }}>
                {incPage > 1 ?
                  <Link onClick={prePage}>
                    <img src={back} style={{ width: "3rem" }} />
                  </Link>
                  : " "}
                {numbers.map((n, i) => (
                  <li key={i} class={`page-item ${incPage == n ? 'active' : ""}`}><a style={{ borderRadius: "100px", margin: "5px" }} class="page-link" href="#" onClick={() => changeCPage(n)}>{n}</a></li>
                ))}
                {incPage !== totalPage ?
                  <Link onClick={nextPage}>
                    <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
                  </Link>
                  : " "}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
  function prePage() {
    dispatch(getAllUsersDetalisById({ page: incPage - 1, limit: recordsPerPage }))
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    dispatch(getAllUsersDetalisById({ page: incPage + 1, limit: recordsPerPage }))
  }
}

export default DeviceAssign;
