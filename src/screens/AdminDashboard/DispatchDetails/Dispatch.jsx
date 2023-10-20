import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchDetailsAction } from '../../../store/action/DispatchDetailsAction'
import { Navbar } from '../../../utils/NavBar'
import SideBar from '../../../utils/Sidebar'
import Style from "../../../css/DispatchDetails.module.css"
import { Link } from 'react-router-dom'
import back from "../../../assets/images/back.png";
import { deviceAction } from '../../../store/action/DeviceAction'

function Dispatch() {
    const [dispatchDetails, setDispatchDetails] = useState({
        deviceId: "",
        product_type: "",
        serial_no: "",
        hospitalName: "",
        address: "",
        purpose: "",
        concerned_person: "",
        phone_number: "",
        date_of_dispatch: "",
        pincode: "",
        distributor_name: "",
        distributor_contact: "",
    })

    const deviceReducer = useSelector((state) => state.deviceReducer);
    const { data } = deviceReducer;
    const deviceIdData = data && data.data && data.data.data

    useEffect(() => {
        dispatch(deviceAction({ page: 1, limit: 99000 }))
    }, [])
    var phoneno = /^\d{10}$/
    var pinCode = /^\d{6}$/
    var purposeValid = "Select Purpose Type"
    var productValid = "Select Product Type"
    const dispatch = useDispatch()
    const dispatchHandler = () => {
        if (!dispatchDetails.deviceId) {
            toast.error("Enter Device Id")
        }
        else if (!dispatchDetails.product_type || dispatchDetails.purpose === productValid) {
            toast.error("Enter Product Type")
        }
        else if (!dispatchDetails.serial_no) {
            toast.error("Enter Serial No.")
        }
        else if (!dispatchDetails.hospitalName) {
            toast.error("Enter Hospital Name")
        }
        else if (!dispatchDetails.address) {
            toast.error("Enter Address")
        }
        else if (!dispatchDetails.purpose || dispatchDetails.purpose === purposeValid) {
            toast.error("Enter Purpose")
        }
        else if (!dispatchDetails.concerned_person) {
            toast.error("Enter Concerned Person")
        }
        else if (!dispatchDetails.phone_number) {
            toast.error("Enter Concerned Contact")
        }
        else if (!dispatchDetails.phone_number.match(phoneno)) {
            toast.error("Enter 10 digit Concerned Contact")
        }
        else if (!dispatchDetails.date_of_dispatch) {
            toast.error("Enter Date Of Dispatch")
        }
        else if (!dispatchDetails.pincode) {
            toast.error("Enter PIN Code")
        }
        else if (!dispatchDetails.pincode.match(pinCode)) {
            toast.error("Enter 6 digit PIN Code")
        }
        // else if (!dispatchDetails.distributor_contact.match(phoneno)) {
        //     toast.error("Enter 10 digit Distrbutor Contact")
        // }
        else if (dispatchDetails.deviceId && dispatchDetails.product_type && dispatchDetails.serial_no && dispatchDetails.address && dispatchDetails.purpose && dispatchDetails.concerned_person && dispatchDetails.phone_number && dispatchDetails.date_of_dispatch && dispatchDetails.pincode  ) {
            toast.success("Success")
            dispatch(dispatchDetailsAction({
                deviceId: dispatchDetails.deviceId,
                product_type: dispatchDetails.product_type,
                serial_no: dispatchDetails.serial_no,
                purpose: dispatchDetails.purpose,
                concerned_person: dispatchDetails.concerned_person,
                phone_number: dispatchDetails.phone_number,
                address: dispatchDetails.address,
                date_of_dispatch: dispatchDetails.date_of_dispatch,
                hospital_name: dispatchDetails.hospitalName,
                pincode: dispatchDetails.pincode,
                distributor_name: dispatchDetails.distributor_name,
                distributor_contact: dispatchDetails.distributor_contact,
            }))
            // setTimeout(() => {
            //     window.location.reload()
            // }, 500);
        }
    }
    const goBack = () => {
        window.history.go(-1)
    }
    return (
        <>
            <Toaster />
            <Navbar />
            <SideBar />
            <div className={Style.mainContainer}>
                <div className={Style.dispatchContainer}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft: '2rem' }}>
                        <Link onClick={goBack} style={{ display: 'block' }}>
                            <img src={back} style={{ width: "4rem", }} />
                        </Link>
                        <h5>Dispatch Details</h5>
                        <hr style={{ color: "#CB297B" }} />
                    </div>
                    <div className={Style.dispatchForm}>
                        <div className={Style.leftForm}>
                            <div className={Style.formItem}>
                                <span className="title">Device ID</span>
                                <div className={Style.textInpuDiv}>
                                    <input list='borow' className={Style.textInputDetails} onChange={(e) => setDispatchDetails({ ...dispatchDetails, deviceId: e.target.value })} value={dispatchDetails.deviceId} placeholder="Enter Device Id" />
                                    <datalist id='borow'>
                                        {deviceIdData && deviceIdData.map((item) => {
                                            return (
                                                <option value={item.deviceId}>{item.deviceId}</option>
                                            )
                                        })}
                                    </datalist>
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Product Type</span>
                                <div className={Style.textInpuDiv}>
                                    <select className={Style.textInputDetails} onChange={(e) => setDispatchDetails({ ...dispatchDetails, product_type: e.target.value })} value={dispatchDetails.product_type}>
                                        <option defaultChecked>{productValid}</option>
                                        <option>Agva Pro</option>
                                        <option>Insulin</option>
                                    </select>
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Product Serial Number</span>
                                <div className={Style.textInpuDiv}>
                                    <input className={Style.textInputDetails} onChange={(e) => setDispatchDetails({ ...dispatchDetails, serial_no: e.target.value })} value={dispatchDetails.serial_no} placeholder="Enter Serial Number" />
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Hospital Name</span>
                                <div className={Style.textInpuDiv}>
                                    <input className={Style.textInputDetails} onChange={(e) => setDispatchDetails({ ...dispatchDetails, hospitalName: e.target.value })} value={dispatchDetails.hospitalName} placeholder="Enter Hospital Name" />
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Purpose</span>
                                <div className={Style.textInpuDiv}>
                                    <select className={Style.textInputDetails} onChange={(e) => setDispatchDetails({ ...dispatchDetails, purpose: e.target.value })} value={dispatchDetails.purpose}>
                                        <option defaultChecked>{purposeValid}</option>
                                        <option>Sold</option>
                                        <option>Demo</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={Style.rightForm}>

                            <div className={Style.formItem}>
                                <span className="title">Concerned Person</span>
                                <div className={Style.textInpuDiv}>
                                    <input placeholder="Enter Name" onChange={(e) => setDispatchDetails({ ...dispatchDetails, concerned_person: e.target.value })} value={dispatchDetails.concerned_person} className={Style.textInputDetails} />
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Concerned Person Contact</span>
                                <div className={Style.textInpuDiv}>
                                    <input type="number" placeholder="Enter Contact " onChange={(e) => setDispatchDetails({ ...dispatchDetails, phone_number: e.target.value })} value={dispatchDetails.phone_number} className={Style.textInputDetails} />
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Date of Dispatch</span>
                                <div className={Style.textInpuDiv}>
                                    <input type="date" name="fromdate" placeholder="dd-mm-yyyy" onChange={(e) => setDispatchDetails({ ...dispatchDetails, date_of_dispatch: e.target.value })} value={dispatchDetails.date_of_dispatch} className={Style.textInputDetails} />
                                </div>
                            </div>

                            <div className={Style.formItem}>
                                <span className="title">Distrbuter Name</span>
                                <div className={Style.textInpuDiv}>
                                    <input className={Style.textInputDetails} placeholder="Enter Distrbuter Name" onChange={(e) => setDispatchDetails({ ...dispatchDetails, distributor_name: e.target.value })} value={dispatchDetails.distributor_name} />
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Distrbuter Contact</span>
                                <div className={Style.textInpuDiv}>
                                    <input type="number" placeholder="Enter Distrbuter Contact " onChange={(e) => setDispatchDetails({ ...dispatchDetails, distributor_contact: e.target.value })} value={dispatchDetails.distributor_contact} className={Style.textInputDetails} />
                                </div>
                            </div>
                        </div>
                        <div className={Style.rightForm}>
                            <div className={Style.formItem}>
                                <span className="title">PIN Code</span>
                                <div className={Style.textInpuDiv}>
                                    <input type='number' className={Style.textInputDetails} placeholder="Enter PIN Code" onChange={(e) => setDispatchDetails({ ...dispatchDetails, pincode: e.target.value })} value={dispatchDetails.pincode} />
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Address</span>
                                <div className={Style.textInpuDiv}>
                                    <input className={Style.textInputAddress} placeholder="Enter Dispatch Address" onChange={(e) => setDispatchDetails({ ...dispatchDetails, address: e.target.value })} value={dispatchDetails.address} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <hr style={{ color: "#707070" }} />
                        <div className={Style.buttonContainer}>
                            <button className={Style.continuebtn} onClick={dispatchHandler}>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dispatch