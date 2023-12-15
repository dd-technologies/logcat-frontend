import React, { useEffect } from 'react'
import { Navbar } from '../../../utils/NavBar'
import SideBar from '../../../utils/Sidebar'
// import Style from "../../../css/DevicePage.module.css";
import Style from "../../../css/DeviceDispatchModule.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import back from "../../../assets/images/back.png";
import TableCard1 from "../../../container/TableCard1";
import { useDispatch, useSelector } from 'react-redux';
import { getdispatchDetailsAction } from '../../../store/action/DispatchDetailsAction';
import { useState } from 'react';
function DispatchDataModule() {
  const dispatchAllDetailsReducer = useSelector((state) => state.dispatchAllDetailsReducer);
  const { loading, data } = dispatchAllDetailsReducer;
  const getDispatchData = data && data.data
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getdispatchDetailsAction({ page: 1, limit: recordsPerPage })
    )
  }, ([]))

  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)
  console.log("incPage", incPage)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = getDispatchData && getDispatchData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data && data.data.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)
  console.log("getDispatchData", getDispatchData)
  const navigate = useNavigate()
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
            className={Style.mainDiv}
          >
            {/* Heading Section */}
            <div
              className={Style.topHeading}
            >
              <h3 className={Style.heading}>AgVa Pro</h3>
              <div
                className={Style.deviceSummary}
              >
                <Link to="/home">
                  <img src={back} className={Style.backImage} />
                </Link>
                <h1 class="text-2xl font-extrabold">Dispatched Device<small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Data</small></h1>
              </div>
            </div>
            {/* Events  */}
            {records && records.length > 0 ?
              <>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '1.5rem' }}>
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                          Serial No.
                        </td>
                        <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                          Device ID
                        </td>
                        <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                          Product Type
                        </td>
                        <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                          Hospital Name
                        </td>
                        <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                          Batch No.
                        </td>
                        <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                          Document Number
                        </td>
                        <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                          Purpose
                        </td>
                        <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                          Action
                        </td>
                        <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                          More
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {records && records.map((item1, index) => {
                        return (
                          <tr class="bg-white border-b hover:bg-gray-50">
                            <td class="px-6 py-4 text-center  font-semibold text-gray-900">
                              {item1.serial_no ? item1.serial_no : '---'}
                            </td>
                            <td class="px-6 py-4 text-center">
                              {item1.deviceId ? item1.deviceId : '---'}
                            </td>
                            <td class="px-6 py-4 text-center ">
                              {item1.product_type ? item1.product_type : '---'}
                            </td>

                            <td class="px-6 py-4 text-center ">
                              {item1.hospital_name ? item1.hospital_name : '---'}
                            </td>
                            <td class="px-6 py-4 text-center ">
                              {item1.batch_no ? item1.batch_no : '---'}
                            </td>
                            <td class="px-6 py-4 text-center ">
                              {item1.document_no ? item1.document_no : '---'}
                            </td>
                            <td class="px-6 py-4 text-center ">
                              {item1.purpose ? item1.purpose : '---'}
                            </td>
                            <td class="px-6 py-4 text-center ">
                              <button className={Style.viewBtn}
                                onClick={
                                  () => {
                                    navigate("/dispatchModel")
                                    localStorage.setItem("dispatchDeviceId", item1.deviceId)
                                  }
                                }>View</button>
                            </td>
                            <td class="px-6 py-4 text-center ">
                              <button className={Style.viewBtn}
                                onClick={
                                  () => {
                                    navigate(`/singleDispatchDataModule?deviceId=${item1.deviceId }`)
                                    localStorage.setItem("dispatchDeviceId", item1.deviceId)
                                  }
                                }>More</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
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
                        <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
                      </button>
                      : " "}
                  </ul>
                </nav>
              </>
              :
              <div style={{ height: '500px', backgroundColor: 'white', width: '100%', borderRadius: '20px', boxShadow: '0px 0px 50px #00000029', background: '#FFFFFF 0% 0% no-repeat padding-box' }}>
                {records && records.length == 0 && (
                  <section className={Style.noDataFound}>
                    <span>
                      No Data Found
                    </span>
                  </section>
                )}
                {loading && <span style={{ position: 'absolute', top: '50%', right: '50%' }}>Loading...</span>}
              </div>
            }
          </div>
        </Col>
      </Row>
    </div>
  )
  function prePage() {
    dispatch(getdispatchDetailsAction({ page: incPage - 1, limit: recordsPerPage }))
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    dispatch(getdispatchDetailsAction({ page: incPage + 1, limit: recordsPerPage }))
  }
}

export default DispatchDataModule