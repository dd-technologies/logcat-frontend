import SideBar from '../../../utils/Sidebar'
import { Navbar } from '../../../utils/NavBar'
import { Link, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Style from "../../../css/Support.module.css";
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'flowbite-react';
import back from "../../../assets/images/back.png";
import { useDispatch, useSelector } from 'react-redux';
import production from "../../../assets/icons/Production.png"
import { deleteStatusDataAction, getAllTicketsDataAction, postReAssignList } from '../../../store/action/ServiceEngAction';
import { getStoreSystem } from '../../../store/action/StoreSystem';
import { Toaster, toast } from 'react-hot-toast';
import CustomCard from '../../../container/CustomCard';
import ServiceModuleNavBar from '../ServiceEnginner/ServiceModuleNavBar';
function SupportEngDatamODULE() {
    const [openModal, setOpenModal] = useState();
    const [detailsData, setDetailsData] = useState()
    const [assignDetails, setAssignDetails] = useState()
    const [checkboxEmail, setCheckBoxEmail] = useState({ service_engineer: '', id: '' })
    const props = { openModal, setOpenModal };
    const getAllTicketsDataReducer = useSelector((state) => state.getAllTicketsDataReducer);
    const { loading, data, error } = getAllTicketsDataReducer;
    const getAllTicket = data && data.data
    const dispatch = useDispatch()
    const history = useNavigate()
    useEffect(() => {
        dispatch(getAllTicketsDataAction({ page: 1, limit: recordsPerPage }))
    }, [])
    const goBack = () => {
        window.history.go(-1)
    }

    const getTicketDetailsByNumberReducer = useSelector((state) => state.getTicketDetailsByNumberReducer);
    const { data: ticketData } = getTicketDetailsByNumberReducer;

    const [updateEmail, setUpdateEmail] = useState('')
    const incPage = parseInt(data && data.currentPage)
    const totalPage = parseInt(data && data.totalPages)
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = getAllTicket && getAllTicket.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data && data.data.length / recordsPerPage)
    const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)

    useEffect(() => {
        dispatch(getStoreSystem())
    }, [dispatch])

    const storeSystemReducer = useSelector((state) => state.storeSystemReducer);
    const { data: serviceEngData } = storeSystemReducer;
    const serviceEngDataa = serviceEngData && serviceEngData.data;


    console.log('checkboxEmail', checkboxEmail)
    const assignBtn = (e) => {
        if (checkboxEmail && checkboxEmail.service_engineer === '') {
            toast.error("Select Email");
        } else {
            const service_engineer = checkboxEmail.service_engineer;
            const id = checkboxEmail.id;
            dispatch(postReAssignList(service_engineer, id));
            toast.success("Success");
            props.setOpenModal(undefined)
            history('/Support_eng_data_module')
            console.log('checkboxEmail', checkboxEmail)
        }
    };
    useEffect(() => {
        postReAssignList()
    }, [])
    return (
        <>
            <Navbar />
            <SideBar />
            <Toaster />
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
                            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2%', flexWrap: 'wrap' }} className="rowSection">
                                <Col xl={4} lg={4} md={6} sm={6}>
                                    <CustomCard
                                        padding="15px"
                                        height="200px"
                                        boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
                                    >
                                        <Link
                                            to="/supportForm"
                                            style={{ textDecoration: "none" }}
                                        >
                                            <div
                                                className="project-cart"
                                                style={{
                                                    backgroundColor: "white",
                                                    padding: "2rem",
                                                    borderRadius: "5px",
                                                    width: "100%",
                                                }}
                                            >
                                                <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                                                    <img
                                                        src={production}
                                                        style={{ height: "6rem" }}
                                                        alt="AgvaVenti"
                                                    />
                                                    <div
                                                        className="d-flex"
                                                        style={{
                                                            gap: "1rem",
                                                            justifyContent: "center",
                                                            flexDirection: "column",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <div>
                                                            <h6 style={{ color: "#707070", fontSize: "1.5rem" }}>
                                                                Assign Ticket
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </CustomCard>

                                </Col>
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
                                                    Device ID
                                                </td>
                                                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                                    Ticket Number
                                                </td>
                                                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                                    Status
                                                </td>
                                                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                                    Concerned Person
                                                </td>
                                                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                                    Service Engineer
                                                </td>
                                                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                                    Tag Name
                                                </td>
                                                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                                    Issues
                                                </td>
                                                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                                    Details
                                                </td>
                                                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                                    Priority
                                                </td>
                                                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                                    Action
                                                </td>
                                                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                                    Feedback
                                                </td>
                                                <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                                                    Re-Assign
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {records && records.map((item1, index) => {
                                                return (
                                                    <tr class="bg-white border-b hover:bg-gray-50">
                                                        <td class="px-6 py-4 text-center font-semibold text-gray-900">
                                                            {item1.deviceId ? item1.deviceId : '---'}
                                                        </td>
                                                        <td class="px-6 py-4 text-center " style={{ cursor: 'pointer' }}>
                                                            <Link to={`/Ticket_details?ticket=${item1 && item1.ticket_number}`} style={{ textDecoration: "none" }}>
                                                                {item1.ticket_number ? item1.ticket_number : '- - -'}
                                                            </Link>
                                                        </td>
                                                        <td class="px-6 py-4 text-center "
                                                        >
                                                            <h6 style={item1.status === 'Completed' ? { backgroundColor: 'green', color: 'white', padding: '10px' } : item1.status == 'Pending' ? { backgroundColor: '#ffdf00', color: 'black', padding: '10px' } : { backgroundColor: 'red', color: 'white', padding: '10px' }}>
                                                                {item1.status ? item1.status : '---'}
                                                            </h6>
                                                        </td>
                                                        <td class="px-6 py-4 text-center ">
                                                            {item1.concerned_p_contact ? item1.concerned_p_contact : '---'}
                                                        </td>
                                                        <td class="px-6 py-4 text-center ">
                                                            {item1.service_engineer ? item1.service_engineer : '---'}
                                                        </td>
                                                        <td class="px-6 py-4 text-center ">
                                                            {item1.tag ? item1.tag : '- - -'}
                                                        </td>
                                                        <td class="px-6 py-4 text-center ">
                                                            <Button onClick={() => {
                                                                (props.setOpenModal('default'))
                                                                setDetailsData(item1.issues)
                                                            }
                                                            }>Issues</Button>
                                                        </td>
                                                        <td class="px-6 py-4 text-center ">
                                                            <Button onClick={() => {
                                                                (props.setOpenModal('default'))
                                                                setDetailsData(item1.details)
                                                            }
                                                            }>View</Button>
                                                            <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
                                                                <Modal.Header style={{ padding: '1rem' }}>Device Details</Modal.Header>
                                                                <Modal.Body>
                                                                    <div className="space-y-6">
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            {detailsData && detailsData.split(',')[0]}
                                                                        </p>
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            {detailsData && detailsData.split(',')[1]}
                                                                        </p>
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            {detailsData && detailsData.split(',')[2]}
                                                                        </p>
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            {detailsData && detailsData.split(',')[3]}
                                                                        </p>
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            {detailsData && detailsData.split(',')[4]}
                                                                        </p>
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            {detailsData && detailsData.split(',')[5]}
                                                                        </p>
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            {detailsData && detailsData.split(',')[6]}
                                                                        </p>
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            {detailsData && detailsData.split(',')[7]}
                                                                        </p>
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            {detailsData && detailsData.split(',')[8]}
                                                                        </p>
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            {detailsData && detailsData.split(',')[9]}
                                                                        </p>
                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                            {detailsData && detailsData.split(',')[10]}
                                                                        </p>
                                                                    </div>
                                                                </Modal.Body>
                                                            </Modal>
                                                        </td>
                                                        <td class="px-6 py-4 text-center ">
                                                            <select style={{ width: '7rem' }} onChange={(e) => {
                                                                dispatch(deleteStatusDataAction({ id: item1._id, priority: e.target.value }))
                                                                toast.success('Priority Changed')
                                                                history('/Support_eng_data_module')
                                                            }}
                                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" >
                                                                <option>{item1.priority}</option>
                                                                {item1.priority == 'Medium' ?
                                                                    <option value='Critical'>Critical</option>
                                                                    :
                                                                    <option value='Medium'>Medium</option>
                                                                }
                                                            </select>
                                                        </td>
                                                        <td class="px-6 py-4 text-center ">
                                                            <select style={{ width: '7rem' }} onChange={(e) => {
                                                                dispatch(deleteStatusDataAction({ id: item1._id, ticket_status: e.target.value }))
                                                                toast.success('Action Changed')
                                                                history('/Support_eng_data_module')
                                                            }
                                                            }
                                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" >
                                                                <option>{item1.ticket_status ? item1.ticket_status : 'Open'}</option>
                                                                {item1.ticket_status == 'Open' ?
                                                                    <>
                                                                        <option value='Re-Open'>Re-Open</option>
                                                                        <option value='Close'>Close</option>
                                                                    </>
                                                                    :
                                                                    item1.ticket_status == 'Re-Open' ?
                                                                        <option value='Close'>Close</option> :
                                                                        <option value='Re-Open'>Re-Open</option>
                                                                }
                                                            </select>
                                                        </td>
                                                        <td class="px-6 py-4 text-center ">
                                                            <select style={{ width: '10rem' }} onChange={(e) => { dispatch(deleteStatusDataAction({ id: item1._id, isFeedback: e.target.value })) }}
                                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" >
                                                                <option>{item1.isFeedback.toString()}</option>
                                                                <option value='Submitted'>Submited</option>
                                                                <option value='Not-Submitted,'>Not Submited</option>
                                                                <option value='Submitted-Without-Feedback'>Submited with feedback</option>
                                                            </select>
                                                        </td>
                                                        <td class="px-6 py-4 text-center ">
                                                            <Button onClick={() => {
                                                                (props.setOpenModal('defaultData'))
                                                                setAssignDetails(serviceEngDataa)
                                                                setCheckBoxEmail({ ...checkboxEmail, id: item1._id })

                                                            }
                                                            }>Re-Assign</Button>
                                                            <Modal show={props.openModal === 'defaultData'} onClose={() => props.setOpenModal(undefined)}>
                                                                <Modal.Header style={{ padding: '1rem' }}>Device Details</Modal.Header>
                                                                <Modal.Body>
                                                                    <div className="space-y-6" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                                                        <input list="nameList" onChange={(e) => setCheckBoxEmail({ ...checkboxEmail, service_engineer: e.target.value })} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Service Enginner Name" required />
                                                                        <datalist id='nameList' onChange={(e) => setCheckBoxEmail({ ...checkboxEmail, service_engineer: e.target.value })} value={checkboxEmail.service_engineer}>
                                                                            {assignDetails && assignDetails.map((item) => {
                                                                                return (
                                                                                    <option value={item.email}>{item.firstName}</option>
                                                                                )
                                                                            })}
                                                                        </datalist>
                                                                        <Button type='Button'
                                                                            onClick={assignBtn}>Re-Assign</Button>
                                                                    </div>
                                                                </Modal.Body>
                                                            </Modal>
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
                                        {incPage !== totalPage ?
                                            <button onClick={nextPage} style={{ border: "0px", backgroundColor: "white" }}>
                                                <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
                                            </button>
                                            : " "}
                                    </ul>
                                </nav>
                            </> :
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
        </>
    )
    function prePage() {
        dispatch(getAllTicketsDataAction({ page: incPage - 1, limit: recordsPerPage }))
    }
    function changeCPage(id) {
        setCurrentPage(id)
    }
    function nextPage() {
        dispatch(getAllTicketsDataAction({ page: incPage + 1, limit: recordsPerPage }))
    }
}

export default SupportEngDatamODULE