import React from "react";
import { Navbar } from "../../utils/NavBar";
import SideBar from "../../utils/Sidebar";
import back from "../../assets/images/back.png";
import { Link, useNavigate } from "react-router-dom";
import Style from "../../css/DeviceAssign.module.css";
import { Row, Col, Button } from "react-bootstrap";
import TableCard1 from "../../container/TableCard1";
import {getAllUsersDetalisById } from "../../store/action/AdminDashboard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Model from "./Model";

// import { toast, Toaster } from "react-hot-toast";
function DeviceAssign() {
  const [userId, setUserId] = useState("");
  const allUsersDetailsReducer = useSelector(
    (state) => state.allUsersDetailsReducer
  );
  const { data } = allUsersDetailsReducer;
  const registerUsers = data && data.data;
  const registerUsersId = registerUsers;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsersDetalisById());
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate()
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
                          {registerUsers &&
                            registerUsers.map((item1, _id) => {
                              var firstname = item1.firstName;
                              var name = firstname + " " + item1.lastName;
                              return (
                                <React.Fragment key={_id}>
                                  <div className={Style.tableBody}>
                                    <div className={Style.insideTableBody}>
                                      {name}
                                    </div>
                                    <div className={Style.insideTableBody}>
                                      {item1.email}
                                    </div>
                                    <div className={Style.insideTableBody}>
                                      {item1.hospitalName}
                                    </div>
                                    <div>
                                      <button
                                        className={Style.adminbtn}
                                        onClick={() =>
                                          setIsOpen(true, setUserId(item1._id))
                                        }
                                      >
                                        Assign
                                      </button>
                                      <button
                                        className={Style.adminbtn}
                                        onClick={() =>
                                          {
                                            navigate(`/deleteAssignDevice?userId=${item1._id}`)
                                            // localStorage.setItem("userid",item1._id)
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
                          {/* <DeleteAssignDevice
                            _id={userId}
                            open={isViewOpen}
                            onClose={() => setIsViewOpen(false)}
                          /> */}
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              </TableCard1>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default DeviceAssign;
