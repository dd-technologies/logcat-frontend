import React from "react";
import { Navbar } from "../../utils/NavBar";
import SideBar from "../../utils/Sidebar";
import back from "../../assets/images/back.png";
import { Link } from "react-router-dom";
import Style from "../../css/ManagerUsers.module.css";
import { Row, Col, Button } from "react-bootstrap";
import TableCard1 from "../../container/TableCard1";
import { getAllUsersDetalisById , updateAllUsersDetailsById} from "../../store/action/AdminDashboard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2/src/sweetalert2.js'

// import { toast, Toaster } from "react-hot-toast";
function ManageUsers() {
  const allUsersDetailsReducer = useSelector(
    (state) => state.allUsersDetailsReducer
  );
  const { data } = allUsersDetailsReducer;
  const rohan = data && data.data;
  console.log("rohan", rohan);
  const dispatch = useDispatch();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  useEffect(() => {
    dispatch(getAllUsersDetalisById(code));
  }, []);
  return (
    <>
      <Navbar />
      <SideBar />
      <div
        className=""
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
          <div
            className={Style.deviceSummary}
          >
            <Link to="/adminDashboard">
              <img src={back} style={{ width: "3rem" }} />
            </Link>
            <h4 className={Style.Header}>Manage User's</h4>
          </div>
        </div>
        <div className={Style.Container}>
          {/* Events  */}
          <Row className="mt-0">
            <Col>
              <TableCard1 borderRadius="20px">
                <>
                  <section className={`${Style.OuterTable} `}>
                    <div
                    className={Style.upperData}
                    >
                      <div
                        className="d-flex"
                        style={{
                          gap: "10rem",
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
                          <h6 className={Style.UpperTextData}>Department</h6>
                        </div>
                        <div>
                          <h6 className={Style.UpperTextData}>Resources</h6>
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

                    <div
                    className={Style.lowerData}
                    >
                      <div
                        className="d-flex"
                      >
                        <div style={{width:"100%"}}>
                          {rohan &&
                            rohan.map((item1, _id) => {
                              var firstname=item1.firstName
                              var name=firstname +" "+ item1.lastName
                              return (
                                <React.Fragment key={_id}>
                                  <div className={Style.tableBody}>
                                    <div className={Style.insideTableBody}>{name}</div>
                                    <div className={Style.insideTableBody}>{item1.email}</div>
                                    <div className={Style.insideTableBody}>{!item1.department?"--":item1.department}</div>
                                    <div className={Style.insideTableBody}>{!item1.resourse?"--":item1.department}</div>
                                    <div className={Style.insideTableBody}>{item1.hospitalName}</div>
                                    <div>
                                      {item1.userType=="User"?<>
                                      <button className={Style.adminbtn}
                            onClick={()=>{
                              Swal.fire({
                                title: 'Are you sure?',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, make it Admin!'
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  return (dispatch(updateAllUsersDetailsById("Admin",item1._id)))
                                }
                              })
                            }}
                          >
                            Admin
                          </button></>:
                                    <Button
                            style={{
                              marginLeft: "13px",
                              width: "5rem",
                              marginLeft: "13px",
                              background: "#FFFFFF 0% 0% no-repeat padding-box",
                              boxShadow: "0px 0px 10px #00000029",
                              borderRadius: "5px",
                              color: "#CB297B",
                              fontSize: "0.8rem",
                            }}
                            onClick={()=>{
                               return (dispatch(updateAllUsersDetailsById("User",item1._id)))
                              }
                            }
                          >
                            Remove
                          </Button>}
                                    </div>
                                  </div>
                                </React.Fragment>
                              );
                            })}
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

export default ManageUsers;
