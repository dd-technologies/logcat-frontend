import React, { useState } from 'react'
import { Navbar } from "../../../utils/NavBar";
import SideBar from "../../../utils/Sidebar";
import Style from "../../../css/Production.module.css"
import { toast, Toaster } from 'react-hot-toast'
import { productionDetailsAction } from "../../../store/action/DispatchDetailsAction"
import { useDispatch } from 'react-redux';
import back from "../../../assets/images/back.png";
import { Link } from 'react-router-dom';
function Production() {
    const [dispatchDetails, setDispatchDetails] = useState({
        deviceId: "",
        productType: "",
        iopr: "",
        purpose: "",
        manufacturingDate: "",
        dispatchDate: "",
        batchNumber: "",
        simNumber: "",
    })

    // date picker functionality
    const [disable, setDisable] = useState(true);
    const [todate, setTodate] = useState([]);
    const [fromdate, setFromdate] = useState([]);

    const [todateformat, setTodateformat] = useState('');
    const [fromdateformat, setFromdateformat] = useState('');

    const handletodate = (e) => {
        const gettodatevalue = e.target.value;
        const setdateformat = gettodatevalue.split('-');
        const settoyear = setdateformat[0];
        const settomonth = setdateformat[1];
        const settodate = setdateformat[2];
        const settodateformat = settoyear + "" + settomonth + "" + settodate;
        setTodate(gettodatevalue);
        setTodateformat(settodateformat);
        setDisable(false);
        //console.log(settodateformat);
        setDispatchDetails({ ...dispatchDetails, manufacturingDate: e.target.value })

    }

    const handlefromdate = (e) => {
        const getfromdatevalue = e.target.value;
        const setfromformat = getfromdatevalue.split("-");
        const setfromyear = setfromformat[0];
        const setfrommonth = setfromformat[1];
        const setfromdate = setfromformat[2];
        const setfromformatdate = setfromyear + "" + setfrommonth + "" + setfromdate;
        setFromdate(getfromdatevalue);
        setFromdateformat(setfromformatdate);
        // console.log(setfromformatdate);
        setDispatchDetails({ ...dispatchDetails, dispatchDate: e.target.value })

    }

    const dispatch = useDispatch();
    var purposeValid = "Select Purpose Type"
    var productValid = "Select Product Type"
    const dispatchHandler = () => {
        if (!dispatchDetails.deviceId) {
            toast.error("Enter Device Id")
        }
        else if (!dispatchDetails.productType || dispatchDetails.purpose === productValid) {
            toast.error("Enter Product Type")
        }
        else if (!dispatchDetails.iopr) {
            toast.error("Enter Address")
        }
        else if (!dispatchDetails.purpose || dispatchDetails.purpose === purposeValid) {
            toast.error("Enter Purpose")
        }
        else if (!dispatchDetails.batchNumber) {
            toast.error("Enter Batch No.")
        }
        else if (!dispatchDetails.manufacturingDate) {
            toast.error("Enter Date Of Manufacturing")
        }
        else if (!dispatchDetails.dispatchDate) {
            toast.error("Enter Date Of Dispatch")
        }
        else if (!dispatchDetails.simNumber) {
            toast.error("Enter Sim Number")
        }
        else if (todateformat > fromdateformat) {
            toast.error("Please select valid date");
        }
        else if (dispatchDetails.deviceId && dispatchDetails.productType && dispatchDetails.iopr && dispatchDetails.purpose && dispatchDetails.batchNumber && dispatchDetails.manufacturingDate && dispatchDetails.dispatchDate && dispatchDetails.simNumber) {
            toast.success("Success")
            dispatch(productionDetailsAction({
                deviceId: dispatchDetails.deviceId,
                productType: dispatchDetails.productType,
                purpose: dispatchDetails.purpose,
                batchNumber: dispatchDetails.batchNumber,
                manufacturingDate: dispatchDetails.manufacturingDate,
                iopr: dispatchDetails.iopr,
                dispatchDate: dispatchDetails.dispatchDate,
                simNumber: dispatchDetails.simNumber,
            }))
            setTimeout(() => {
                window.location.reload()
            }, 500);
        }
    }
    const goBack=()=>{
        window.history.go(-1)
      }
    return (
        <>
            <Navbar />
            <SideBar />
            <Toaster />
            <div className={Style.mainContainer}>
                <div className={Style.dispatchContainer}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft:'2rem' }}>
                    <Link onClick={goBack} style={{display:'block'}}>
                        <img src={back} style={{ width: "4rem" ,}} />
                    </Link>
                        <h5>Production Details</h5>
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
                                    <select className={Style.textInputDetails} onChange={(e) => setDispatchDetails({ ...dispatchDetails, productType: e.target.value })} value={dispatchDetails.productType}>
                                        <option defaultChecked>{productValid}</option>
                                        <option>Agva Pro</option>
                                        <option>Insulin</option>
                                    </select>
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Issues dignos/Parts replace</span>
                                <div className={Style.textInpuDiv}>
                                    <input className={Style.textInputAddress} placeholder="Enter Dispatch Address" onChange={(e) => setDispatchDetails({ ...dispatchDetails, iopr: e.target.value })} value={dispatchDetails.iopr} />
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
                                    <input type='number' className={Style.textInputDetails} placeholder="Enter batch no." onChange={(e) => setDispatchDetails({ ...dispatchDetails, batchNumber: e.target.value })} value={dispatchDetails.batchNumber} />
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Date of Manufacturing</span>
                                <div className={Style.textInpuDiv}>
                                    <input type="date" name="todate" placeholder="dd-mm-yyyy" onChange={(e) => handletodate(e)} value={dispatchDetails.manufacturingDate} className={Style.textInputDetails} />
                                </div>
                            </div>
                            <div className={Style.formItem}>
                                <span className="title">Date of Dispatch</span>
                                <div className={Style.textInpuDiv}>
                                    <input type="date" name="fromdate" placeholder="dd-mm-yyyy" disabled={disable} onChange={(e) => handlefromdate(e)} value={dispatchDetails.dispatchDate} className={Style.textInputDetails} />
                                </div>
                            </div>
                        </div>
                        <div className={Style.rightForm}>
                            <div className={Style.formItem}>
                                <span className="title">SIM Number</span>
                                <div className={Style.textInpuDiv}>
                                    <input type='number' className={Style.textInputDetails} placeholder="Enter Sim no." onChange={(e) => setDispatchDetails({ ...dispatchDetails, simNumber: e.target.value })} value={dispatchDetails.simNumber} />
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

export default Production