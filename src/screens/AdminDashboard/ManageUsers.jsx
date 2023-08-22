import React, { useState } from "react";
import { Navbar } from "../../utils/NavBar";
import SideBar from "../../utils/Sidebar";
import back from "../../assets/images/back.png";
import { Link } from "react-router-dom";
import Style from "../../css/ManagerUsers.module.css";
import { Row, Col} from "react-bootstrap";
import TableCard1 from "../../container/TableCard1";
import { getAllUsersDetalisById, updateAllUsersDetailsById } from "../../store/action/AdminDashboard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { toast, Toaster } from "react-hot-toast";
function ManageUsers() {
  const allUsersDetailsReducer = useSelector(
    (state) => state.allUsersDetailsReducer
  );
  const { data } = allUsersDetailsReducer;
  const rohan = data && data.data;
  console.log("rohan", rohan)
  console.log("data", data)
  const dispatch = useDispatch();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)
  console.log("totalPages", totalPage)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data && data.data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data && data.data.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)
  console.log("npage", npage)
  console.log("currentPage", currentPage)

  useEffect(() => {
    dispatch(getAllUsersDetalisById({ page: 1, limit: recordsPerPage }));
  }, [dispatch]);

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
                        <div style={{ width: "100%" }}>
                          {records &&
                            records.map((item1, _id) => {
                              var firstname = item1.firstName
                              var name = firstname + " " + item1.lastName
                              return (
                                <React.Fragment key={_id}>
                                  <div className={Style.tableBody}>
                                    <div className={Style.insideTableBody}>{name}</div>
                                    <div className={Style.insideTableBody}>{item1.email}</div>
                                    <div className={Style.insideTableBody}>{!item1.department ? "--" : item1.department}</div>
                                    <div className={Style.insideTableBody}>{!item1.resourse ? "--" : item1.department}</div>
                                    <div className={Style.insideTableBody}>{item1.hospitalName}</div>
                                    <div style={{ display: "flex" }}>
                                      <select style={{ padding: "5px", padding: "9px", borderRadius: "8px", border: "0px", backgroundColor: "#cb297b", color: "white" }} onChange={(e) => { dispatch(updateAllUsersDetailsById({ userType: e.target.value, _id: item1._id })) }}>
                                        <option >{item1.userType}</option>
                                        <option value="Admin">Admin</option>
                                        <option value="User">User</option>
                                        <option value="Dispatch">Dispatch</option>
                                      </select>
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

export default ManageUsers;