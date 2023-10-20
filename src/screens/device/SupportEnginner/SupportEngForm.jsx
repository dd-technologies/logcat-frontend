import React, { useEffect, useState } from 'react'
import { Navbar } from "../../../utils/NavBar";
import SideBar from "../../../utils/Sidebar";
import Style from "../../../css/Production.module.css"
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import {
    deviceAction,
    getSingleDeviceIdDetails
} from "../../../store/action/DeviceAction";
import { getAllHospitalData, getStoreSystem, putallStoreDataAction } from "../../../store/action/StoreSystem"
import { Link } from 'react-router-dom';
import back from "../../../assets/images/back.png";
function ServiceEngForm() {
    const [dispatchDetails, setDispatchDetails] = useState({
        deviceId: "",
        service_engineer: "",
        iopr: "",
        deviceIdDetails: "",
        concerned_p_contact: "",
        priority: "",
        hospitalName: "",
    })
    const deviceReducer = useSelector((state) => state.deviceReducer);
    const { data } = deviceReducer;
    const deviceIdData = data && data.data && data.data.data
    const storeSystemReducer = useSelector((state) => state.storeSystemReducer);
    const { data: data121 } = storeSystemReducer;
    const serviceEngName = data121 && data121.data
    const getAllSectionByDeviceId = useSelector(
        (state) => state.getAllSectionByDeviceId
    );
    const { data: dataa } = getAllSectionByDeviceId;
    const getAllDataFromDeviceId = dataa && dataa.data
    const dispatch = useDispatch()
    // useEffce of get all deviceId
    const DeviceId = dispatchDetails && dispatchDetails.deviceId
    useEffect(() => {
        dispatch(deviceAction({ page: 1, limit: 99000 }))
    }, [])
    useEffect(() => {
        dispatch(getSingleDeviceIdDetails(DeviceId))
    }, [dispatch])
    useEffect(() => {
        dispatch(getStoreSystem())
    }, [])
    useEffect(() => {
        dispatch(getAllHospitalData())
    }, [dispatch])
    // const allHospitalDataReducer = useSelector(
    //     (state) => state.allHospitalDataReducer
    // );
    const allHospitalDataReducer = useSelector((state) => state.allHospitalDataReducer);
    const { data: hospitaldata } = allHospitalDataReducer;
    console.log('Hospital', hospitaldata)
    const allDataFromDeviceId = `Device Id: ${getAllDataFromDeviceId && getAllDataFromDeviceId.DeviceId},
    Hospital Name: ${getAllDataFromDeviceId && getAllDataFromDeviceId.Hospital_Name}, 
    Bio Med: ${getAllDataFromDeviceId && getAllDataFromDeviceId.Bio_Med},
    Department Name: ${getAllDataFromDeviceId && getAllDataFromDeviceId.Department_Name},
    Department Name: ${getAllDataFromDeviceId && getAllDataFromDeviceId.Department_Name},
    IMEI No: ${getAllDataFromDeviceId && getAllDataFromDeviceId.IMEI_NO},
    Ward No: ${getAllDataFromDeviceId && getAllDataFromDeviceId.Ward_No},
    address : ${getAllDataFromDeviceId && getAllDataFromDeviceId.address},
    Health : ${getAllDataFromDeviceId && getAllDataFromDeviceId.health},
    Doctor Name: ${getAllDataFromDeviceId && getAllDataFromDeviceId.Doctor_Name}`
    // (e=>JSON.stringify(e).replace(/{|}/g,''));
    var phoneno = /^\d{10}$/
    let priuorityValid = "Select Priority"
    const dispatchHandler = () => {
        if (!dispatchDetails.deviceId) {
            toast.error("Enter Device Id")
        }
        else if (!dispatchDetails.service_engineer) {
            toast.error("Enter Service Engineer Name")
        }
        else if (!dispatchDetails.iopr) {
            toast.error("Enter Issues")
        }
        else if (!dispatchDetails.concerned_p_contact) {
            toast.error("Enter Sim Number")
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
        else if (dispatchDetails.priority === priuorityValid) {
            toast.error("Select Priority")

        }
        else if (dispatchDetails.deviceId && dispatchDetails.service_engineer && dispatchDetails.iopr && allDataFromDeviceId && dispatchDetails.concerned_p_contact && dispatchDetails.priority) {
            toast.success("Success")
            dispatch(putallStoreDataAction({
                deviceId: dispatchDetails.deviceId,
                service_engineer: dispatchDetails.service_engineer,
                details: allDataFromDeviceId,
                concerned_p_contact: dispatchDetails.concerned_p_contact,
                issues: dispatchDetails.iopr,
                address: getAllDataFromDeviceId && getAllDataFromDeviceId.address,
                priority: dispatchDetails.priority,
                hospital_name: getAllDataFromDeviceId && getAllDataFromDeviceId.Hospital_Name
            }))
        }
    }
    const goBack = () => {
        window.history.go(-1)
    }
    return (
        <>
            <Navbar />
            <SideBar />
            <Toaster />
            <div className={Style.mainContainer}>
                <div className={Style.dispatchContainer}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft: '2rem' }}>
                        <Link onClick={goBack} style={{ display: 'block' }}>
                            <img src={back} style={{ width: "4rem", }} />
                        </Link>
                        <h5>Assign Ticket</h5>
                        <hr style={{ color: "#CB297B" }} />
                    </div>
                    <div className={Style.dispatchForm}>
                        <div className={Style.leftForm}>
                            <div className={Style.formItem}>
                                <span className="title">Device ID</span>
                                <div className={Style.textInpuDiv}>
                                    <input list="borow" style={{ padding: '0.8rem', width: '20rem' }} placeholder='Search Device Id'
                                        onChange={(e) => {
                                            setDispatchDetails({...dispatchDetails, deviceId: e.target.value })
                                            const DeviceId=dispatchDetails.deviceId
                                            dispatch(getSingleDeviceIdDetails(DeviceId))
                                        }}
                                    />
                                    <datalist id='borow' className={Style.textInputDetails} onChange={(e) => {
                                        setDispatchDetails({ ...dispatchDetails, deviceId: e.target.value })
                                    }} value={dispatchDetails.deviceId}>
                                        {deviceIdData && deviceIdData.map((item) => {
                                            return (
                                                <option>{item.deviceId}</option>
                                            )
                                        })}
                                    </datalist>
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Service Enginner</span>
                                <div className={Style.textInpuDiv}>
                                    <input list="nameList" style={{ padding: '0.8rem', width: '20rem' }} placeholder='Service Enter Name' onChange={(e) => setDispatchDetails({ ...dispatchDetails, service_engineer: e.target.value })} />
                                    <datalist id='nameList' className={Style.textInputDetails} onChange={(e) => setDispatchDetails({ ...dispatchDetails, service_engineer: e.target.value })} value={dispatchDetails.service_engineer}>
                                        {serviceEngName && serviceEngName.map((item) => {
                                            return (
                                                <option value={item.email}>{item.firstName}</option>
                                            )
                                        })}
                                    </datalist>
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Issues</span>
                                <div className={Style.textInpuDiv}>
                                    <textarea rows="1" cols="30" className={Style.textInputAddress} placeholder="Enter Issue to address" onChange={(e) => setDispatchDetails({ ...dispatchDetails, iopr: e.target.value })} value={dispatchDetails.iopr} />
                                </div>
                            </div>
                        </div>
                        <div className={Style.rightForm}>
                            <div className={Style.formItem}>
                                <span className="title">Details</span>
                                <div className={Style.textInpuDiv}>
                                    <div contenteditable="false" className='innerDiv' onChange={(e) => setDispatchDetails({ ...dispatchDetails, deviceIdDetails: e.target.value })} value={dispatchDetails.deviceIdDetails} style={{ padding: '1rem' }}>
                                        Device Id: {getAllDataFromDeviceId && getAllDataFromDeviceId.DeviceId}
                                        <br />
                                        Hospital Name: {getAllDataFromDeviceId && getAllDataFromDeviceId.Hospital_Name}
                                        <br />
                                        Bio Med: {getAllDataFromDeviceId && getAllDataFromDeviceId.Bio_Med}
                                        <br />
                                        Department Name: {getAllDataFromDeviceId && getAllDataFromDeviceId.Department_Name}
                                        <br />
                                        IMEI No: {getAllDataFromDeviceId && getAllDataFromDeviceId.IMEI_NO}
                                        <br />
                                        Ward No: {getAllDataFromDeviceId && getAllDataFromDeviceId.Ward_No}
                                        <br />
                                        address : {getAllDataFromDeviceId && getAllDataFromDeviceId.address}
                                        <br />
                                        Health : {getAllDataFromDeviceId && getAllDataFromDeviceId.health}
                                        <br />
                                        Doctor Name: {getAllDataFromDeviceId && getAllDataFromDeviceId.Doctor_Name}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={Style.rightForm}>
                            <div className={Style.formItem}>
                                <span className="title">Concerned Person Contact</span>
                                <div className={Style.textInpuDiv}>
                                    <input type='number' className={Style.textInputDetails} placeholder="Enter Concerned Person Contact " onChange={(e) => setDispatchDetails({ ...dispatchDetails, concerned_p_contact: e.target.value })} value={dispatchDetails.concerned_p_contact} />
                                </div>
                            </div>
                            {/* <div className={Style.formItem}>
                                <span className="title">Address</span>
                                <div className={Style.textInpuDiv}>
                                    <input className={Style.textInputAddress} placeholder="Enter Address" onChange={(e) => setDispatchDetails({ ...dispatchDetails, address: e.target.value })} value={dispatchDetails.address} />
                                </div>
                            </div> */}
                            <div className={Style.formItem}>
                                <span className="title">Priority</span>
                                <select className={Style.textInpuDiv} style={{ border: '0px', padding: '7px' }} onChange={(e) => setDispatchDetails({ ...dispatchDetails, priority: e.target.value })} value={dispatchDetails.priority}>
                                    <option>Select Priority</option>
                                    <option value='Medium'>Medium</option>
                                    <option value='Critical'>Critical</option>
                                </select>
                            </div>

                        </div>
                    </div>
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