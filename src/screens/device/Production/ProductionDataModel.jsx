import React, { useEffect } from 'react'
import { Navbar } from '../../../utils/NavBar'
import SideBar from '../../../utils/Sidebar'
import Style from "../../../css/DeviceDispatchModule.module.css";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import back from "../../../assets/images/back.png";
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
                                {/* <h4 className={Style.Header}>Production Data</h4> */}
                                <h1 class="text-2xl font-extrabold">Production<small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Data</small></h1>

                            </div>
                        </div>
                        {/* Events  */}
                        {records && records.length > 0 ?
                            <>
                                <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{borderRadius:'1.5rem'}}>
                                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{backgroundColor:'#cb297b'}}>
                                                    Device ID
                                                </td>
                                                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{backgroundColor:'#cb297b'}}>
                                                    Product Type
                                                </td>
                                                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{backgroundColor:'#cb297b'}}>
                                                    Phone No.
                                                </td>
                                                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{backgroundColor:'#cb297b'}}>
                                                    Dispatch Date
                                                </td>
                                                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{backgroundColor:'#cb297b'}}>
                                                    Batch No.
                                                </td>
                                                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{backgroundColor:'#cb297b'}}>
                                                    Purpose
                                                </td>
                                                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{backgroundColor:'#cb297b'}}>
                                                    Manufacturing Date
                                                </td>
                                                {/* <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{backgroundColor:'#cb297b'}}>
                                                    Iospr
                                                </td> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {records && records.map((item1, index) => {
                                                return (
                                                    <tr class="bg-white border-b hover:bg-gray-50">
                                                        <th class="px-6 py-4 text-center">
                                                            {item1.deviceId}
                                                        </th>
                                                        <td class="px-6 py-4 text-center">
                                                            {item1.productType}
                                                        </td>
                                                        <td class="px-6 py-4 text-center">
                                                            {item1.simNumber}
                                                        </td>
                                                        <td class="px-6 py-4 text-center">
                                                            {item1.dispatchDate}
                                                        </td>
                                                        <td class="px-6 py-4 text-center">
                                                            {item1.batchNumber}
                                                        </td>
                                                        <td class="px-6 py-4 text-center">
                                                            {item1.purpose}
                                                        </td>
                                                        <td class="px-6 py-4 text-center">
                                                            {item1.manufacturingDate}
                                                        </td>
                                                        {/* <td class="px-6 py-4 text-center">
                                                            {item1.iopr}
                                                        </td> */}
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
                                {loading && <span style={{ position: 'absolute', top: '50%', right: '50%' }}> <div role="status">
                                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                    <span class="sr-only">Loading...</span>
                                </div></span>}
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