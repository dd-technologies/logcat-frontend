import React, { useEffect, useState } from 'react'
import { Navbar } from "../../../utils/NavBar";
import SideBar from "../../../utils/Sidebar";
import Style from "../../../css/Production.module.css"
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import {
    deviceAction,
    getDeviceIdBySerialNumber,
} from "../../../store/action/DeviceAction";
import { Button, Modal } from 'flowbite-react';
import shield from "../../../assets/icons/shield.png"
import { getAllHospitalData, getStoreSystem, putallStoreDataAction, getCPersonDetailsByNumber } from "../../../store/action/StoreSystem"
import { Link, useNavigate } from 'react-router-dom';
import back from "../../../assets/images/back.png";
import { verifyEmialForSuppport, verifyOtpForSuppport } from '../../../store/action/VerifiedEmail';
import Otpinput from '../../auth/OtpInput';
function ServiceEngForm() {
    const [dispatchDetails, setDispatchDetails] = useState({
        service_engineer: "",
        issue: "",
        concerned_p_contact: "",
        priority: "",
        pincode: '',
        department: '',
        emailConcernedPerson: '',
        nameConcernedPerson: '',
        serialNumber: '',
        tagName: ''
    })
    const [state, setState] = useState({
        otp: null,
    });
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };
    const [verifyBtn, setVerifyBtn] = useState('Verify')

    // const deviceReducer = useSelector((state) => state.deviceReducer);
    // const { data } = deviceReducer;
    // const deviceIdData = data && data.data && data.data.data

    const getDeviceIdBySerialNumberReducer = useSelector((state) => state.getDeviceIdBySerialNumberReducer);
    const { data: serialNoData } = getDeviceIdBySerialNumberReducer;

    const storeSystemReducer = useSelector((state) => state.storeSystemReducer);
    const { data: data121 } = storeSystemReducer;
    const serviceEngName = data121 && data121.data

    const verifyOtpReducer = useSelector(
        (state) => state.verifyOtpReducer
    );
    const { data: dataa , message:msg,error} = verifyOtpReducer;

    console.log('696969',dataa,msg,error,dataa && dataa.message)
    const verifyEmailReducer = useSelector((state) => state.verifyEmailReducer);
    const { loading, data, message } = verifyEmailReducer;
    console.log('data', loading, data, message)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(deviceAction({ page: 1, limit: 99000 }))
    }, [])

    // email verified
    const email = dispatchDetails.emailConcernedPerson
    useEffect(() => {
        dispatch(verifyEmialForSuppport(email))
    }, [email])

    useEffect(() => {
        dispatch(getStoreSystem())
    }, [])
    useEffect(() => {
        dispatch(getAllHospitalData())
    }, [dispatch])
    const navigate = useNavigate()
    const allDataFromDeviceId = `Device Id: ${serialNoData && serialNoData.deviceId},
    Concerned Person Name: ${dispatchDetails && dispatchDetails.concerned_p_name}, 
    Concerned Person Email: ${dispatchDetails && dispatchDetails.concerned_p_email},
    Concerned Person Contact: ${dispatchDetails && dispatchDetails.concerned_p_contact},
    Hospital Name: ${serialNoData && serialNoData.hospitalName},
    Warrenty Status: ${serialNoData && serialNoData.dateOfWarranty},
    Sim Number: ${serialNoData && serialNoData.simNumber},
    Batch Number : ${serialNoData && serialNoData.batchNumber},
    Manufacturing : ${serialNoData && serialNoData.manufacturingDate},
    Dispatch Date: ${serialNoData && serialNoData.dispatchDate},
    Product Type:${serialNoData && serialNoData.productType},
    Address:${serialNoData && serialNoData.addresse},`
    var phoneno = /^\d{10}$/
    var pinCode = /^\d{6}$/
    let priuorityValid = "Select Priority"
    let tagValid = "Select Tag"
    const dispatchHandler = () => {
        let regEx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
        if (!dispatchDetails.serialNumber) {
            toast.error('Enter Serial Number')
        }
        else if (!dispatchDetails.service_engineer) {
            toast.error("Enter Service Engineer Name")
        }
        else if (!dispatchDetails.issue) {
            toast.error("Enter Issues")
        }
        else if (!dispatchDetails.concerned_p_contact) {
            toast.error("Enter Concerned Person Contact")
        }
        else if (!dispatchDetails.concerned_p_contact.match(phoneno)) {
            toast.error("Enter 10 digit Number")
        }
        else if (!allDataFromDeviceId) {
            toast.error("Enter Details")
        }
        else if (!dispatchDetails.priority) {
            toast.error("Select Priority")
        }
        else if (!dispatchDetails.pincode) {
            toast.error('enter PinCode')
        }
        else if (!dispatchDetails.pincode.match(pinCode)) {
            toast.error("Enter 6 digit PIN Code")
        }
        else if (!dispatchDetails.department) {
            toast.error('enter Department')
        }
        else if (dispatchDetails.tagName === tagValid) {
            toast.error('Select Tag Name')
        }
        else if (!dispatchDetails.nameConcernedPerson) {
            toast.error('enetr Concerned Person Name')
        }
        else if (!dispatchDetails.emailConcernedPerson) {
            toast.error('Enter Concerned Person Email')
        }
        else if (verifyBtn === 'Verify') {
            toast.error('Please Verify Email')
        }
        else if (dispatchDetails.priority === priuorityValid) {
            toast.error("Select Priority")
        }
        else if (dispatchDetails.service_engineer && dispatchDetails.issue && allDataFromDeviceId && dispatchDetails.concerned_p_contact && dispatchDetails.priority && dispatchDetails.pincode && dispatchDetails.department && dispatchDetails.tagName && dispatchDetails.serialNumber && dispatchDetails.nameConcernedPerson && dispatchDetails.emailConcernedPerson) {
            toast.success("Success")
            dispatch(putallStoreDataAction({
                deviceId: serialNoData && serialNoData.deviceId,
                service_engineer: dispatchDetails.service_engineer,
                details: allDataFromDeviceId,
                concerned_p_contact: dispatchDetails.concerned_p_contact,
                issues: dispatchDetails.issue,
                priority: dispatchDetails.priority,
                pincode: dispatchDetails && dispatchDetails.pincode,
                dept_name: dispatchDetails && dispatchDetails.department,
                waranty_status: serialNoData && serialNoData.dateOfWarranty,
                concerned_p_name: dispatchDetails && dispatchDetails.nameConcernedPerson,
                concerned_p_email: dispatchDetails && dispatchDetails.emailConcernedPerson,
                serialNumber: dispatchDetails && dispatchDetails.serialNumber,
                tag: dispatchDetails && dispatchDetails.tagName,
                address:serialNoData && serialNoData.address
            }))
        }
    }
    const goBack = () => {
        window.history.go(-1)
    }
    const handleSubmitOtp = (e) => {
        e.preventDefault()
        const otp = state.otp
        console.log('otp',otp)
        if (!otp) {
            toast.error('Enter OTP')
        }
        else {
            dispatch(verifyOtpForSuppport(otp))
            if(data && data.statusCode == 200){
                toast.success(data && data.message)
                setVerifyBtn('Verified')
                setTimeout(() => {
                    props.setOpenModal(undefined)
                }, 500);
            }
            else if(error){
                toast.error(error)
            }
        }
    }

    const handleDhrFile = (e) => {
        e.preventDefault()
        let regEx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
        if (!dispatchDetails.emailConcernedPerson) {
            toast.error('Please Enter Email First')
        }
        else if (!regEx.test(dispatchDetails.emailConcernedPerson)) {
            toast.error('Enter Correct Email')
        }
        else if (regEx.test(dispatchDetails.emailConcernedPerson)) {
            const email = dispatchDetails.emailConcernedPerson.toLowerCase();
            dispatch(verifyEmialForSuppport(email))
            if (message) {
                toast.error(message)
                setVerifyBtn('Verified')
            }
            else {
                props.setOpenModal('pop-up')
               
            }
        }
    }

    const handleAddHospital = () => {
        navigate('/add_hospital')
    }
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    // This arrangement can be altered based on how we want the date's format to appear.
    const currentDate = `${year}-${month}-${day}`;
    const warrent_date = serialNoData && serialNoData.dateOfWarranty
    const warrentyDateCheck = serialNoData && serialNoData.dateOfWarranty
    return (
        <>
            <Navbar />
            <SideBar />
            <Toaster />
            <div className={Style.mainContainer}>
                <div className={Style.dispatchContainer}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                            <Link onClick={goBack} style={{ display: 'block' }}>
                                <img src={back} style={{ width: "3rem", }} />
                            </Link>
                            <h1 class="text-2xl font-extrabold">Assign<small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Tickets</small></h1>
                            <hr style={{ color: "#CB297B" }} />
                        </div>
                        <button onClick={handleAddHospital} style={{ backgroundColor: '#cb297b' }} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Hospital</button>
                    </div>
                    <form >
                        <div class="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                            <div>
                                <label for="first_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Serial Number</label>
                                <input id='arrow' onChange={(e) => {
                                    setDispatchDetails({ ...dispatchDetails, serialNumber: e.target.value })
                                    const serialNumber = e.target.value
                                    dispatch(getDeviceIdBySerialNumber(serialNumber))
                                }}
                                    value={dispatchDetails.serialNumber}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Serial Number" required />
                            </div>
                            <div>
                                <label for="first_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Device ID</label>
                                <div style={(serialNoData && serialNoData.deviceId && serialNoData.deviceId.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    {serialNoData && serialNoData.deviceId}
                                </div>
                            </div>
                            {/* select service enginner */}
                            <div >
                                <label for="first_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Service Engineer</label>
                                <input list="nameList" onChange={(e) => setDispatchDetails({ ...dispatchDetails, service_engineer: e.target.value })} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Service Enginner Name" required />
                                <datalist id='nameList' onChange={(e) => setDispatchDetails({ ...dispatchDetails, service_engineer: e.target.value })} value={dispatchDetails.service_engineer}>
                                    {serviceEngName && serviceEngName.map((item) => {
                                        return (
                                            <option value={item.email}>{item.firstName}</option>
                                        )
                                    })}
                                </datalist>
                            </div>
                            {/* tag name */}
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Select Tag Name</label>
                                <select onChange={(e) => setDispatchDetails({ ...dispatchDetails, tagName: e.target.value })}
                                    value={dispatchDetails.tagName} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" >
                                    <option>Select Tag</option>
                                    <option value='Installation'>Installation</option>
                                    <option value='Service'>Service</option>
                                </select>
                            </div>
                            {/* issues */}
                            <div>
                                <label for="first_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Issues</label>
                                <textarea list="nameList" onChange={(e) => setDispatchDetails({ ...dispatchDetails, issue: e.target.value })}
                                    value={dispatchDetails.issue}
                                    id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Service Enginner Name" required />
                            </div>
                            {/* pin code */}
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Pin Code</label>
                                <input type="number" onChange={(e) => setDispatchDetails({ ...dispatchDetails, pincode: e.target.value })}
                                    value={dispatchDetails.pincode} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter PinCode" required />
                            </div>
                            {/* Department */}
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Department</label>
                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, department: e.target.value })}
                                    value={dispatchDetails.department} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Department" required />
                            </div>
                            {/* Warrenty Status */}
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Warrenty Status</label>
                                <div style={(serialNoData && serialNoData.dateOfWarranty && serialNoData.dateOfWarranty.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    {warrentyDateCheck >= currentDate ? 'ACTIVE' : warrentyDateCheck >= currentDate ? 'INACTIVE' : ''}
                                </div>
                            </div>
                            {/* nameConcernedPerson */}
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Concerned Person Name</label>
                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, nameConcernedPerson: e.target.value })}
                                    value={dispatchDetails.nameConcernedPerson} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Concerned Person Name" required />
                            </div>
                            {/* concerned person email */}
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Concerned Person Email</label>
                                <div class="flex items-center">
                                    <input type="text" onChange={(e) => {
                                        setDispatchDetails({ ...dispatchDetails, emailConcernedPerson: e.target.value })
                                        dispatchDetails && dispatchDetails.emailConcernedPerson === '' ? setVerifyBtn('Verify') : setVerifyBtn('Verify')
                                    }
                                    }
                                        value={dispatchDetails.emailConcernedPerson} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Concerned Person Email" required />
                                    <button onClick={handleDhrFile} class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        {verifyBtn}
                                    </button>
                                </div>
                                {dispatchDetails && dispatchDetails.emailConcernedPerson && dispatchDetails.emailConcernedPerson.length > 0 ?
                                    <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                                        <Modal.Header />
                                        <Modal.Body>
                                            <div className="text-center">
                                                <div class="mb-6">
                                                    <img src={shield} style={{ height: '3rem', display: 'block', margin: '10px auto' }} />
                                                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP Code</label>
                                                    <div class="flex items-center" style={{ gap: '20px' }}>
                                                        {/* <input type="number" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    <input type="number" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    <input type="number" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    <input type="number" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}
                                                        <Otpinput setState={setState} state={state} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center gap-4">
                                                    <Button onClick={handleSubmitOtp} color="failure"
                                                    // onClick={() => props.setOpenModal(undefined)}
                                                    >
                                                        Verify OTP
                                                    </Button>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                    :
                                    ''}
                            </div>
                            {/* concerned person number */}
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Concerned Person Contact</label>
                                <input type="text" onChange={(e) => {
                                    setDispatchDetails({ ...dispatchDetails, concerned_p_contact: e.target.value })
                                    dispatch(getCPersonDetailsByNumber({ phone: e.target.value }))
                                }
                                }
                                    value={dispatchDetails.concerned_p_contact} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Concerned Person Contact" required />
                            </div>
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Priority</label>
                                <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" onChange={(e) => setDispatchDetails({ ...dispatchDetails, priority: e.target.value })} value={dispatchDetails.priority}>
                                    <option>Select Priority</option>
                                    <option value='Medium'>Medium</option>
                                    <option value='Critical'>Critical</option>
                                </select>
                            </div>
                        </div>
                        <div className={Style.rightForm}>
                            <div className={Style.formItem}>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Concerned Person Details</label>
                                <div class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    <div contenteditable="false" className='innerDiv' onChange={(e) => setDispatchDetails({ ...dispatchDetails, deviceIdDetails: e.target.value })} value={dispatchDetails.deviceIdDetails}>
                                        Device Id: {serialNoData && serialNoData.deviceId}
                                        <br />
                                        Concerned Person Name: {dispatchDetails && dispatchDetails.nameConcernedPerson}
                                        <br />
                                        Concerned Person Email: {dispatchDetails && dispatchDetails.emailConcernedPerson}
                                        <br />
                                        Concerned Person Contact: {dispatchDetails && dispatchDetails.concerned_p_contact}
                                        <br />
                                        Hospital Name: {serialNoData && serialNoData.hospitalName}
                                        <br />
                                        Warrenty Status: {serialNoData && serialNoData.dateOfWarranty}
                                        <br />
                                        Sim Number: {serialNoData && serialNoData.simNumber}
                                        <br />
                                        Batch Number : {serialNoData && serialNoData.batchNumber}
                                        <br />
                                        Manufacturing date : {serialNoData && serialNoData.manufacturingDate}
                                        <br />
                                        Dispatch date : {serialNoData && serialNoData.dispatchDate}
                                        <br />
                                        Product Type: {serialNoData && serialNoData.productType}
                                        <br />
                                        Address: {serialNoData && serialNoData.address}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div>
                        <hr style={{ color: "#707070" }} />
                        <div className={Style.buttonContainer} >
                            <button className={Style.continuebtn} onClick={dispatchHandler}>Assign Ticket</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default ServiceEngForm