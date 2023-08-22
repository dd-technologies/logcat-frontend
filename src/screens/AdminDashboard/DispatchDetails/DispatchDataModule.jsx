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
function DispatchDataModule() {
  const dispatchAllDetailsReducer = useSelector((state) => state.dispatchAllDetailsReducer);
  const { data } = dispatchAllDetailsReducer;
  const getDispatchData = data && data.data
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getdispatchDetailsAction(
      )
    )
  }, ([]))
  const navigate=useNavigate()
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
                  <img src={back} className={Style.backImage}/>
                </Link>
                <h4 className={Style.Header}>Dispatch Data</h4>
                
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
                          className={Style.insideOuterTable}
                        >
                          <div
                            className="d-flex"
                            style={{
                              justifyContent: "space-between",
                              padding: "20px",
                            }}
                          >
                            <div>
                              <h6 className={Style.insideHeadingData}>Device ID</h6>
                            </div>
                            <div>
                              <h6 className={Style.insideHeadingData}>Product Type</h6>
                            </div>
                            <div>
                              <h6 className={Style.insideHeadingData}>Serial No.</h6>
                            </div>
                            <div>
                              <h6 className={Style.insideHeadingData}>
                                Hospital Name
                              </h6>
                            </div>
                            <div>
                              <h6 className={Style.insideHeadingData}>Batch No.</h6>
                            </div>
                            <div>
                              <h6 className={Style.insideHeadingData}>Purpose</h6>
                            </div>
                            <div>
                              <h6 className={Style.insideHeadingData}>Action</h6>
                            </div>
                          </div>
                        </div>
                        {/* TABLE HERE */}
                        <div>
                          {getDispatchData &&
                            getDispatchData
                              .map((item1, _id) => {
                                return (
                                  <>
                                    <div className={Style.userDataDiv}>
                                      <div className={Style.userInsideData}>{item1.deviceId}</div>
                                      <div className={Style.userInsideData}>{item1.product_type}</div>
                                      <div className={Style.userInsideData}>{item1.serial_no}</div>
                                      <div className={Style.userInsideData}>{item1.hospital_name}</div>
                                      <div className={Style.userInsideData}>{item1.batch_no}</div>
                                      <div className={Style.userInsideData}>{item1.purpose}</div>
                                      <div className={Style.viewBtnDiv}>
                                        <button className={Style.viewBtn} 
                                        onClick={
                                          ()=>{
                                            navigate("/dispatchModel")
                                            localStorage.setItem("dispatchDeviceId",item1.deviceId)
                                          }
                                        }>View</button>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                        </div>
                      </section>
                      {/* PAGINATION */}
                    </>
                  </TableCard1>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default DispatchDataModule