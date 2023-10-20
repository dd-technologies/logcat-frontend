import React, { useEffect, useState } from 'react'
import { Navbar } from "../../../utils/NavBar";
import SideBar from "../../../utils/Sidebar";
import Style from "../../../css/Production.module.css"
import { toast, Toaster } from 'react-hot-toast'
import { productionDetailsAction } from "../../../store/action/DispatchDetailsAction"
import { useDispatch, useSelector } from 'react-redux';
import back from "../../../assets/images/back.png";
import { Link } from 'react-router-dom';
// import UploadProductionFile from './UploadProductionFile';
import axios from 'axios';
import { deviceAction } from '../../../store/action/DeviceAction';
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
    const [selectedImage, setSelectedImage] = useState(null);
    const [todateformat, setTodateformat] = useState('');
    const [fromdateformat, setFromdateformat] = useState('');
    const [dhrSelect, setdhrSelect] = useState(false)
    const [qualitySelect, setqualitySelect] = useState(false)
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
    const deviceReducer = useSelector((state) => state.deviceReducer);
    const { data } = deviceReducer;
    const deviceIdData = data && data.data && data.data.data

    useEffect(() => {
        dispatch(deviceAction({ page: 1, limit: 99000 }))
    }, [])
    const dispatch = useDispatch();
    var purposeValid = "Select Purpose Type"
    var productValid = "Select Product Type"
    var phoneno = /^\d{10}$/
    const dispatchHandler = (e) => {
        e.preventDefault()
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
            toast.error("Enter Phone Number")
        }
        else if (!dispatchDetails.simNumber.match(phoneno)) {
            toast.error("Enter 10 digit Concerned Contact")
        }
        else if (todateformat > fromdateformat) {
            toast.error("Please select valid date");
        }
        else if (dhrSelect === false) {
            toast.error("Please click on DHR File select");
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
    const goBack = () => {
        window.history.go(-1)
    }


    const [pdfUrl, setPdfUrl] = useState('');
    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const generateDhrFile = async (e) => {
        e.preventDefault()
        setdhrSelect(true)
        if (!selectedImage) {
            toast.error('Please select a (JPG) file');
            return;
        }
        else if (!dispatchDetails.deviceId) {
            toast.error("Enter Device Id")
        }
        const formData = new FormData();
        formData.append('file', selectedImage);
        var flag = 'DHR-FILE';
        var deviceID = dispatchDetails.deviceId;
        try {
            const response = await axios.post(`http://172.23.100.126:8000/production/upload-production-file/${deviceID}/${flag}`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            setPdfUrl(response.data.pdfUrl);
        } catch (error) {
            console.error('Error generating PDF:', error);
            console.error('Error Serial Number:', error);
        }
    };
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
                        <h5>Production Details</h5>
                        <hr style={{ color: "#CB297B" }} />
                    </div>
                    <form>
                        <div class="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                            <div>
                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Device Id</label>
                                <input list='borow' type="text" onChange={(e) =>
                                    setDispatchDetails({ ...dispatchDetails, deviceId: e.target.value })}
                                    value={dispatchDetails.deviceId} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Device Id" required />
                                <datalist id='borow'>
                                    {deviceIdData && deviceIdData.map((item) => {
                                        return (
                                            <option value={item.deviceId}>{item.deviceId}</option>
                                        )
                                    })}
                                </datalist>
                            </div>
                            <div>
                                <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Type</label>
                                <select id="countries" onChange={(e) => setDispatchDetails({ ...dispatchDetails, productType: e.target.value })}
                                    value={dispatchDetails.productType} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option defaultChecked>{productValid}</option>
                                    <option>Agva Pro</option>
                                    <option>Insulin</option>
                                </select>
                            </div>
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IOPR</label>
                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, iopr: e.target.value })}
                                    value={dispatchDetails.iopr} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter IOPR" required />
                            </div>
                            <div>
                                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Purpose</label>
                                <select id="countries" onChange={(e) => setDispatchDetails({ ...dispatchDetails, purpose: e.target.value })}
                                    value={dispatchDetails.purpose} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option defaultChecked>{purposeValid}</option>
                                    <option>Sold</option>
                                    <option>Demo</option>
                                </select>
                            </div>
                            <div>
                                <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Batch Number</label>
                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, batchNumber: e.target.value })}
                                    value={dispatchDetails.batchNumber} id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter batch Number" required />
                            </div>
                            <div>
                                <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Manefacturing Date</label>
                                <input type="date" onChange={(e) => handletodate(e)}
                                    value={dispatchDetails.manufacturingDate} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>
                        <div class="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                            <div class="mb-6">
                                <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dispatch Date</label>
                                <input type="date" id="date" disabled={disable}
                                    onChange={(e) => handlefromdate(e)}
                                    value={dispatchDetails.dispatchDate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                            </div>
                            <div class="mb-6">
                                <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Concer Phone Number</label>
                                <input type="number" id="number" onChange={(e) => setDispatchDetails({ ...dispatchDetails, simNumber: e.target.value })}
                                    value={dispatchDetails.simNumber} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Sim Number" required />
                            </div>
                        </div>
                        <div class="mb-6" style={{ textAlign: 'start' }}>
                            <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DHR File</label>
                            <div class="flex gap-2 mb-6 md:grid-cols-2" style={{ alignItems: 'center' }}>
                                <input type="file" onChange={handleImageSelect} id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                <button style={{ width: '20%', height: '3rem' }} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={generateDhrFile} >Upload</button>
                            </div>
                        </div>
                        <button type="submit" style={{ backgroundColor: 'rgb(203, 41, 123)' }} onClick={dispatchHandler} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Production