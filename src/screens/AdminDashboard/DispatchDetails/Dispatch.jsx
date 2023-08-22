import React, { useState } from 'react'
import { useReducer } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { dispatchDetailsAction } from '../../../store/action/DispatchDetailsAction'
import { Navbar } from '../../../utils/NavBar'
import SideBar from '../../../utils/Sidebar'
import Style from "../../../css/DispatchDetails.module.css"

function Dispatch() {
    const [dispatchDetails, setDispatchDetails] = useState({
        deviceId: "",
        product_type: "",
        serial_no: "",
        hospitalName: "",
        address: "",
        purpose: "",
        concerned_person: "",
        phone_number:"",
        date_of_manufacuring: "",
        date_of_dispatch: "",
        batch_no: ""
    })
    var phoneno=/^\d{10}$/
    var purposeValid="Select Purpose Type"
    var productValid="Select Product Type"
    const dispatch = useDispatch()
    const dispatchHandler = () => {
        if (!dispatchDetails.deviceId) {
            toast.error("Enter Device Id")
        }
        else if (!dispatchDetails.product_type || dispatchDetails.purpose===productValid) {
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
        else if (!dispatchDetails.purpose || dispatchDetails.purpose===purposeValid ) {
            toast.error("Enter Purpose")
        }
        else if (!dispatchDetails.batch_no) {
            toast.error("Enter Batch No.")
        }
        else if (!dispatchDetails.concerned_person) {
            toast.error("Enter Concerned Person")
        }
        else if(!dispatchDetails.phone_number.match(phoneno)){
            toast.error("Please Enter 10 digit number")
        }
        else if (!dispatchDetails.date_of_manufacuring) {
            toast.error("Enter Date Of Manufacturing")
        }
        else if (!dispatchDetails.date_of_dispatch) {
            toast.error("Enter Date Of Dispatch")
        }
        else if (dispatchDetails.deviceId && dispatchDetails.product_type && dispatchDetails.serial_no && dispatchDetails.address && dispatchDetails.purpose && dispatchDetails.batch_no && dispatchDetails.concerned_person && dispatchDetails.phone_number && dispatchDetails.date_of_manufacuring && dispatchDetails.date_of_dispatch) {
            toast.success("Success")
            dispatch(dispatchDetailsAction({
                deviceId: dispatchDetails.deviceId,
                product_type: dispatchDetails.product_type,
                serial_no: dispatchDetails.serial_no,
                purpose: dispatchDetails.purpose,
                concerned_person: dispatchDetails.concerned_person,
                phone_number:dispatchDetails.phone_number,
                batch_no: dispatchDetails.batch_no,
                date_of_manufacturing: dispatchDetails.date_of_manufacuring,
                address: dispatchDetails.address,
                date_of_dispatch: dispatchDetails.date_of_dispatch,
                hospital_name: dispatchDetails.hospitalName
            }))
            setTimeout(() => {
                window.location.reload()
            }, 500);
        }
    }
    return (
        <>
            <Toaster />
            <Navbar />
            <SideBar />
            <div className={Style.mainContainer}>
                <div className={Style.dispatchContainer}>
                    <div>
                        <h5>Dispatch Details</h5>
                        <hr style={{ color: "#CB297B" }} />
                    </div>
                    <div className={Style.dispatchForm}>
                        <div className={Style.leftForm}>
                            <div className={Style.formItem}>
                                <span className="title">Device ID</span>
                                <div className={Style.textInpuDiv}>
                                    <input className={Style.textInputDetails} onChange={(e) => setDispatchDetails({ ...dispatchDetails, deviceId: e.target.value })} value={dispatchDetails.deviceId} placeholder="Enter Device Id" />
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Product Type</span>
                                <div className={Style.textInpuDiv}>
                                    <select className={Style.textInputDetails} onChange={(e) => setDispatchDetails({ ...dispatchDetails, product_type: e.target.value })} value={dispatchDetails.product_type}>
                                        <option defaultChecked>{productValid}</option>
                                        <option>Agva Venti</option>
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
                                <span className="title">Address</span>
                                <div className={Style.textInpuDiv}>
                                    <input className={Style.textInputAddress} placeholder="Enter Dispatch Address" onChange={(e) => setDispatchDetails({ ...dispatchDetails, address: e.target.value })} value={dispatchDetails.address} />
                                </div>
                            </div>
                        </div>
                        <div className={Style.rightForm}>
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
                            <div className={Style.formItem}>
                                <span className="title">Batch No.</span>
                                <div className={Style.textInpuDiv}>
                                    <input className={Style.textInputDetails} placeholder="Enter batch no." onChange={(e) => setDispatchDetails({ ...dispatchDetails, batch_no: e.target.value })} value={dispatchDetails.batch_no} />
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Concerned Person</span>
                                <div className={Style.textInpuDiv}>
                                    <input placeholder="Enter Name" onChange={(e) => setDispatchDetails({ ...dispatchDetails, concerned_person: e.target.value })} value={dispatchDetails.concerned_person} className={Style.textInputDetails} />
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Phone Number</span>
                                <div className={Style.textInpuDiv}>
                                    <input type="number" placeholder="Enter Phone Number " onChange={(e) => setDispatchDetails({ ...dispatchDetails, phone_number: e.target.value })} value={dispatchDetails.phone_number} className={Style.textInputDetails} />
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Date of Manufacturing</span>
                                <div className={Style.textInpuDiv}>
                                    <input type="date" onChange={(e) => setDispatchDetails({ ...dispatchDetails, date_of_manufacuring: e.target.value })} value={dispatchDetails.date_of_manufacuring} className={Style.textInputDetails} />
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Date of Dispatch</span>
                                <div className={Style.textInpuDiv}>
                                    <input type="date" onChange={(e) => setDispatchDetails({ ...dispatchDetails, date_of_dispatch: e.target.value })} value={dispatchDetails.date_of_dispatch} className={Style.textInputDetails} />
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