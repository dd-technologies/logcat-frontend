import SideBar from '../../../utils/Sidebar'
import { Navbar } from '../../../utils/NavBar'
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Style from "../../../css/DeviceDispatchModule.module.css";
import React, { useEffect } from 'react'
import TableCard1 from "../../../container/TableCard1";
import back from "../../../assets/images/back.png";
import { useDispatch, useSelector } from 'react-redux';
import { deleteStatusDataAction, getAllTicketsDataAction } from '../../../store/action/ServiceEngAction';
import ReactReadMoreReadLess from "react-read-more-read-less";
function SupportEngDatamODULE() {
    const getAllTicketsDataReducer = useSelector((state) => state.getAllTicketsDataReducer);
    const { data } = getAllTicketsDataReducer;
    const getAllTicket = data && data.data
    console.log('data', getAllTicket)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllTicketsDataAction())
    }, [])
    return (
        <>
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
                                <h4 className={Style.Header}>Assign Ticket Data</h4>
                            </div>
                        </div>
                        {/* Events  */}
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
                                        <h6 className={Style.insideHeadingData}>Hospital Name</h6>
                                    </div>
                                    <div>
                                        <h6 className={Style.insideHeadingData}>Concerned Person</h6>
                                    </div>
                                    <div>
                                        <h6 className={Style.insideHeadingData}>
                                            Service Enginner
                                        </h6>
                                    </div>
                                    <div>
                                        <h6 className={Style.insideHeadingData}>Issues</h6>
                                    </div>
                                    <div>
                                        <h6 className={Style.insideHeadingData}>Details</h6>
                                    </div>
                                    <div>
                                        <h6 className={Style.insideHeadingData}>Priority</h6>
                                    </div>
                                    <div>
                                        <h6 className={Style.insideHeadingData}>Action</h6>
                                    </div>
                                </div>
                            </div>
                            {/* TABLE HERE */}
                            <div>
                                {getAllTicket &&
                                    getAllTicket
                                        .map((item1, _id) => {
                                            return (
                                                <>
                                                    <div className={Style.userDataDiv}>
                                                        <div className={Style.userInsideData}>{item1.deviceId}</div>
                                                        <div className={Style.userInsideData}>{item1.hospital_name}</div>
                                                        <div className={Style.userInsideData}>{item1.concerned_p_contact}</div>
                                                        <div className={Style.userInsideData}>{item1.service_engineer}</div>
                                                        <div className={Style.userInsideData}>{item1.issues}</div>
                                                        <div className={Style.userInsideData}>
                                                            <ReactReadMoreReadLess
                                                                charLimit={20}
                                                                readMoreText={"Read more ▼"}
                                                                readLessText={"Read less ▲"}
                                                            >
                                                                {item1.details}
                                                            </ReactReadMoreReadLess>
                                                        </div>
                                                        <div className={Style.userInsideData}>{item1.priority}</div>
                                                        <div className={Style.userInsideData}>
                                                            <button onClick={()=>{dispatch(deleteStatusDataAction({id:item1._id}))}} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Delete</button>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        })}
                            </div>
                            {/* PAGINATION */}
                        </TableCard1>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default SupportEngDatamODULE