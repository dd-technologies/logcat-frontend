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
function ServiceEngForm() {
    const [dispatchDetails, setDispatchDetails] = useState({
        deviceId: "",
        service_engineer: "",
        iopr: "",
        Hospital_Name: "",
        deviceIdDetails: "",
        concerned_p_contact: "",
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
    useEffect(() => {
        dispatch(deviceAction({ page: 1, limit: 99000 }))
    }, [])
    useEffect(() => {
        dispatch(getSingleDeviceIdDetails({ DeviceId: dispatchDetails.deviceId }))
    }, [dispatch])
    useEffect(() => {
        dispatch(getStoreSystem())
    }, [])
    useEffect(() => {
        dispatch(getAllHospitalData())
    }, [dispatch])
    const allHospitalDataReducer = useSelector(
        (state) => state.allHospitalDataReducer
    );
    const { data12 } = allHospitalDataReducer;
    const deviceIdDetaiils = data12 && data12.data

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
        else if (!dispatchDetails.Hospital_Name) {
            toast.error("Enter Hospital Name")
        }
        else if (!dispatchDetails.concerned_p_contact) {
            toast.error("Enter Sim Number")
        }
        else if (!allDataFromDeviceId) {
            toast.error("Enter Details")
        }
        else if (dispatchDetails.deviceId && dispatchDetails.service_engineer && dispatchDetails.iopr && dispatchDetails.Hospital_Name && allDataFromDeviceId && dispatchDetails.concerned_p_contact) {
            toast.success("Success")
            dispatch(putallStoreDataAction({
                deviceId: dispatchDetails.deviceId,
                service_engineer: dispatchDetails.service_engineer,
                hospital_name: dispatchDetails.Hospital_Name,
                details: allDataFromDeviceId,
                concerned_p_contact: dispatchDetails.concerned_p_contact,
                issues:dispatchDetails.iopr,
            }))
        }
    }
   console.log("allDataFromDeviceId", allDataFromDeviceId)
    console.log('000',dispatchDetails.deviceIdDetails)
    return (
        <>
            <Navbar />
            <SideBar />
            <Toaster />
            <div className={Style.mainContainer}>
                <div className={Style.dispatchContainer}>
                    <div>
                        <h5>Assign Ticket</h5>
                        <hr style={{ color: "#CB297B" }} />
                    </div>
                    <div className={Style.dispatchForm}>
                        <div className={Style.leftForm}>
                            <div className={Style.formItem}>
                                <span className="title">Device ID</span>
                                <div className={Style.textInpuDiv}>
                                    <input list="borow" style={{ padding: '0.8rem' }} placeholder='Search Device Id'
                                        onChange={(e) => {
                                            setDispatchDetails({ ...dispatchDetails, deviceId: e.target.value })
                                            dispatch(getSingleDeviceIdDetails({ DeviceId: dispatchDetails.deviceId }))
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
                                    <input list="nameList" style={{ padding: '0.8rem' }} placeholder='Service Enter Name' onChange={(e) => setDispatchDetails({ ...dispatchDetails, service_engineer: e.target.value })} />
                                    <datalist id='nameList' className={Style.textInputDetails} onChange={(e) => setDispatchDetails({ ...dispatchDetails, service_engineer: e.target.value })} value={dispatchDetails.service_engineer}>
                                        {serviceEngName && serviceEngName.map((item) => {
                                            return (
                                                <option>{item.firstName}</option>
                                            )
                                        })}
                                    </datalist>
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Issues</span>
                                <div className={Style.textInpuDiv}>
                                    <textarea rows="1" cols="30" className={Style.textInputAddress} placeholder="Enter Dispatch Address" onChange={(e) => setDispatchDetails({ ...dispatchDetails, iopr: e.target.value })} value={dispatchDetails.iopr} />
                                </div>
                            </div>
                        </div>
                        <div className={Style.rightForm}>
                            <div className={Style.formItem}>
                                <span className="title">Hospital Name</span>
                                <div className={Style.textInpuDiv}>
                                    <input list="hospitalName" style={{ padding: '0.8rem' }} placeholder='Enter Hospital Name' onChange={(e) => setDispatchDetails({ ...dispatchDetails, Hospital_Name: e.target.value })} />
                                    <datalist id='hospitalName' className={Style.textInputDetails} onChange={(e) => setDispatchDetails({ ...dispatchDetails, Hospital_Name: e.target.value })} value={dispatchDetails.Hospital_Name}>
                                        {deviceIdDetaiils && deviceIdDetaiils.map((item) => {
                                            return (
                                                <option>{item.Hospital_Name}{console.log("hospital", item.Hospital_Name)}</option>
                                            )
                                        })}
                                    </datalist>
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Details</span>
                                <div className={Style.textInpuDiv}>
                                    <div contenteditable="true" className='innerDiv' onChange={(e) => setDispatchDetails({ ...dispatchDetails, deviceIdDetails: e.target.value })} value={dispatchDetails.deviceIdDetails} style={{ padding: '1rem' }}>
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
                                    <input type='number' className={Style.textInputDetails} placeholder="Enter Sim no." onChange={(e) => setDispatchDetails({ ...dispatchDetails, concerned_p_contact: e.target.value })} value={dispatchDetails.concerned_p_contact} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <hr style={{ color: "#707070" }} />
                        <div className={Style.buttonContainer}>
                            <button className={Style.continuebtn} onClick={dispatchHandler}>Assign Ticket</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ServiceEngForm