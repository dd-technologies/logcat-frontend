import React, { useEffect, useState } from 'react'
import { Navbar } from '../../utils/NavBar'
import SideBar from '../../utils/Sidebar'
import back from "../../assets/images/back.png";
import { Link } from "react-router-dom";
import Style from "../../css/ServiceRecords.module.css";
import { Row, Col } from "react-bootstrap";
import TableCard1 from "../../container/TableCard1";
import { useDispatch, useSelector } from 'react-redux';
import { getServiceRecordsById } from "../../store/action/DeviceAction"
import { ThemeContext } from '../../../src/utils/ThemeContext';
import ReactReadMoreReadLess from "react-read-more-read-less";
function Services() {
  const { theme } = React.useContext(ThemeContext);
  const getAllServiceRecordsDetails = useSelector((state) => state.getAllServiceRecordsDetails);
  const { loading, data } = getAllServiceRecordsDetails;
  console.log("data", data)
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const did = urlParams.get('DeviceId')
  const code = urlParams.get('code');

  let calibrationFilter = data;
  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getServiceRecordsById(
        { data ,did, code, page: 1, limit: recordsPerPage }
      )
    )
  }, ([]))
  const goBack = () => {
    window.history.go(-1)
  }
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = calibrationFilter && calibrationFilter.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data && data.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)
  return (
    <div>
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
            <Link onClick={goBack}>
              <img src={back} style={{ width: "3rem" }} />
            </Link>
            <h4 className={Style.Header}>Service Records</h4>
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
                          padding: "10px",
                          justifyContent: 'space-around'
                        }}
                      >
                        <div>
                          <h6 className={Style.UpperTextData}>Device Id</h6>
                        </div>
                        <div style={{ width: '40%' }}>
                          <h6 className={Style.UpperTextData} style={{ textAlign: 'center' }}>Message</h6>
                        </div>
                        <div>
                          <h6 className={Style.UpperTextData}>Serial No.</h6>
                        </div>
                        <div>
                          <h6 className={Style.UpperTextData}>Time</h6>
                        </div>
                      </div>
                    </div>
                    {/* TABLE HERE */}
                    <div
                      className={Style.lowerData}
                    >
                      {records && records.length > 0 ?
                        <div className={Style.tableBody}>
                          {records && records.map((item, _id) => {
                            return (
                              <React.Fragment key={_id}>
                                <div className={Style.insideTableBody}>
                                  <div
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',

                                    }}
                                  >
                                    <h6>{item.deviceId}</h6>
                                  </div>
                                  <div
                                    style={{ width: '40%' }}
                                  >
                                    <h6>
                                      <ReactReadMoreReadLess
                                        charLimit={200}
                                        readMoreText={"Read more ▼"}
                                        readLessText={"Read less ▲"}
                                      >
                                        {item.message}
                                      </ReactReadMoreReadLess>
                                    </h6>
                                  </div>
                                  <div
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',

                                    }}
                                  >

                                    <h6>{item.serialNo}</h6>
                                  </div>
                                  <div
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',

                                    }}
                                  >
                                    <h6>{item.date.split('T')[0]}</h6>
                                  </div>
                                </div>
                              </React.Fragment>
                            )
                          })}
                           <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-end" style={{ display: "flex", alignItems: 'center' }}>
                      {incPage > 1 ?
                        <button onClick={prePage} style={{ border: "0px", backgroundColor: "white" }}>
                          <img src={back} style={{ width: "3rem" }} />
                        </button>
                        : " "}
                      {numbers.map((n, i) => (
                        <li key={i} class={`page-item ${incPage == n ? 'active' : ""}`}><a style={{ borderRadius: "100px", margin: "5px" }} class="page-link" href="#" onClick={() => changeCPage(n)}>{n}</a></li>
                      ))}
                      {incPage !== totalPage ?
                        <button onClick={nextPage} style={{ border: "0px", backgroundColor: "white" }}>
                          {recordsPerPage > 6 ? 
                          <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
                          : ''}
                        </button>
                        : " "}
                    </ul>
                  </nav>
                        </div>
                        :
                        <div style={{ width: '100%', height: '100%', marginTop: '10rem', marginBottom: '10rem' }}>
                          {records && records.length == 0 && (
                            <div className={Style.noDataFound}>
                              <span>
                                No Data Found
                              </span>
                            </div>
                          )}
                          {loading && <span style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', fontSize: 20 }}>Loading...</span>}
                        </div>
                      }
                    </div>
                  </section>
                 
                </>
              </TableCard1>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
  function prePage() {
    dispatch(getServiceRecordsById({ page: incPage - 1, limit: recordsPerPage }))
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    dispatch(getServiceRecordsById({ page: incPage + 1, limit: recordsPerPage }))
  }
}
export default Services