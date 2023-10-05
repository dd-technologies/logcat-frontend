import React, { useEffect } from 'react'
import { Navbar } from '../../../utils/NavBar'
import SideBar from '../../../utils/Sidebar'
import Style from "../../../css/DeviceDispatchModule.module.css";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import back from "../../../assets/images/back.png";
import TableCard1 from "../../../container/TableCard1";
import { useDispatch, useSelector } from 'react-redux';
import { getproductionDetailsAction } from '../../../store/action/DispatchDetailsAction';
import { useState } from 'react';
function ProductionDataModule() {
    const productionAllDetailsReducer = useSelector((state) => state.productionAllDetailsReducer);
    const { loading, data } = productionAllDetailsReducer;
    const getDispatchData = data && data.data
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(
            getproductionDetailsAction({ page: 1, limit: recordsPerPage })
        )
    }, ([]))

    const incPage = parseInt(data && data.currentPage)
    const totalPage = parseInt(data && data.totalPages)
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = getDispatchData && getDispatchData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data && data.data.length / recordsPerPage)
    const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)
    console.log("getDispatchData", getDispatchData)
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
                                <Link to="/">
                                    <img src={back} className={Style.backImage} />
                                </Link>
                                <h4 className={Style.Header}>Production Data</h4>
                            </div>
                        </div>
                        {/* Events  */}
                        {records && records.length > 0 ?
                            <TableCard1 borderRadius="20px">
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
                                            <h6 className={Style.insideHeadingData}>Sim No.</h6>
                                        </div>
                                        <div>
                                            <h6 className={Style.insideHeadingData}>
                                                Dispatch Date
                                            </h6>
                                        </div>
                                        <div>
                                            <h6 className={Style.insideHeadingData}>Batch No.</h6>
                                        </div>
                                        <div>
                                            <h6 className={Style.insideHeadingData}>Purpose</h6>
                                        </div>
                                        <div>
                                            <h6 className={Style.insideHeadingData}>Manufacturing Date</h6>
                                        </div>
                                        <div>
                                            <h6 className={Style.insideHeadingData}>Iospr</h6>
                                        </div>
                                    </div>
                                </div>
                                {/* TABLE HERE */}
                                <div>
                                    {records &&
                                        records
                                            .map((item1, _id) => {
                                                return (
                                                    <>
                                                        <div className={Style.userDataDiv}>
                                                            <div className={Style.userInsideData}>{item1.deviceId}</div>
                                                            <div className={Style.userInsideData}>{item1.productType}</div>
                                                            <div className={Style.userInsideData}>{item1.simNumber}</div>
                                                            <div className={Style.userInsideData}>{item1.dispatchDate}</div>
                                                            <div className={Style.userInsideData}>{item1.batchNumber}</div>
                                                            <div className={Style.userInsideData}>{item1.purpose}</div>
                                                            <div className={Style.userInsideData}>{item1.manufacturingDate}</div>
                                                            <div className={Style.userInsideData}>{item1.iopr}</div>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                </div>
                                {/* PAGINATION */}
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
                            </TableCard1>
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
        dispatch(getproductionDetailsAction({ page: incPage - 1, limit: recordsPerPage }))
    }
    function changeCPage(id) {
        setCurrentPage(id)
    }
    function nextPage() {
        dispatch(getproductionDetailsAction({ page: incPage + 1, limit: recordsPerPage }))
    }
}

export default ProductionDataModule