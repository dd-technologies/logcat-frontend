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
        serialNumber: "",
        manufacturingDate: "",
        batchNumber: "",
        simNumber: "",
        hardwareV: '',
        softwareV: ''
    })

    const [selectedImage, setSelectedImage] = useState(null);
    const [todateformat, setTodateformat] = useState('');
    const [fromdateformat, setFromdateformat] = useState('');
    const [dhrSelect, setdhrSelect] = useState(false)
    const deviceReducer = useSelector((state) => state.deviceReducer);
    const { data } = deviceReducer;
    const deviceIdData = data && data.data && data.data.data

    useEffect(() => {
        dispatch(deviceAction({ page: 1, limit: 99000 }))
    }, [])
    const dispatch = useDispatch();
    var productValid = "Select Product Type"
    var phoneno = /^\d{10}$/
    const dispatchHandler = (e) => {
        e.preventDefault()
        if (!dispatchDetails.deviceId) {
            toast.error("Enter Device Id")
        }
        else if (!dispatchDetails.serialNumber) {
            toast.error("Enter Address")
        }
        else if (!dispatchDetails.batchNumber) {
            toast.error("Enter Batch No.")
        }
        else if (!dispatchDetails.manufacturingDate) {
            toast.error("Enter Date Of Manufacturing")
        }
        else if (!dispatchDetails.simNumber) {
            toast.error("Enter Phone Number")
        }
        else if (!dispatchDetails.simNumber.match(phoneno)) {
            toast.error("Enter 10 digit Sim Number")
        }
        else if (todateformat > fromdateformat) {
            toast.error("Please select valid date");
        }
        else if (dhrSelect === false) {
            toast.error("Please click on DHR File select");
        }
        else if (!dispatchDetails.hardwareV) {
            toast.error("Enter Hardware Version")
        }
        else if (!dispatchDetails.softwareV) {
            toast.error("Enter Software Veresion")
        }
        else if (dispatchDetails.deviceId && dispatchDetails.productType && dispatchDetails.serialNumber && dispatchDetails.batchNumber && dispatchDetails.manufacturingDate && dispatchDetails.simNumber) {
            toast.success("Success")
            dispatch(productionDetailsAction({
                deviceId: dispatchDetails.deviceId,
                productType: dispatchDetails.productType,
                batchNumber: dispatchDetails.batchNumber,
                manufacturingDate: dispatchDetails.manufacturingDate,
                serialNumber: dispatchDetails.serialNumber,
                simNumber: dispatchDetails.simNumber,
                hw_version: dispatchDetails.hardwareV,
                sw_version: dispatchDetails.softwareV
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
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                        <Link onClick={goBack} style={{ display: 'block' }}>
                            <img src={back} style={{ width: "3rem", }} />
                        </Link>
                        <h1 class="text-2xl font-extrabold">Production<small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Details</small></h1>
                        <hr style={{ color: "#CB297B" }} />
                    </div>
                    <form>
                        <div class="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                            <div>
                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Device Id</label>
                                <input list='borow' type="text" onChange={(e) =>
                                    setDispatchDetails({ ...dispatchDetails, deviceId: e.target.value })}
                                    value={dispatchDetails.deviceId} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Device Id" required />
                                <datalist id='borow'>
                                    {deviceIdData && deviceIdData.map((item) => {
                                        return (
                                            <option value={item.deviceId}>{item.deviceId}</option>
                                        )
                                    })}
                                </datalist>
                            </div>
                            <div>
                                <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Product Type</label>
                                <select id="countries" onChange={(e) => setDispatchDetails({ ...dispatchDetails, productType: e.target.value })}
                                    value={dispatchDetails.productType} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    <option defaultChecked>{productValid}</option>
                                    <option>Agva Pro</option>
                                    <option>Insulin</option>
                                </select>
                            </div>
                            <div>
                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Serial Number</label>
                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, serialNumber: e.target.value })}
                                    value={dispatchDetails.serialNumber} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Serial Number" required />
                            </div>
                            <div>
                                <label for="website" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Batch Number</label>
                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, batchNumber: e.target.value })}
                                    value={dispatchDetails.batchNumber} id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Batch Number" required />
                            </div>
                            <div>
                                <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Manufacturing Date</label>
                                <input type="date" onChange={(e) => setDispatchDetails({ ...dispatchDetails, manufacturingDate: e.target.value })}
                                    value={dispatchDetails.manufacturingDate} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" required />
                            </div>
                            <div>
                                <label for="number" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Sim Number</label>
                                <input type="number" id="number" onChange={(e) => setDispatchDetails({ ...dispatchDetails, simNumber: e.target.value })}
                                    value={dispatchDetails.simNumber} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Sim Number" required />
                            </div>
                        </div>
                        {/* software hardware */}
                        <div class="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                            <div>
                                <label for="softwareV" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Software Version</label>
                                <form class="flex items-center">
                                    <div class="relative w-full">
                                        <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                            <h6 style={{ paddingLeft: '13px', fontSize: '0.9rem' }}>
                                                Version-
                                            </h6>
                                        </div>
                                        <input style={{ paddingLeft: '4.7rem' }} onChange={(e) => setDispatchDetails({ ...dispatchDetails, softwareV: e.target.value })}
                                            value={dispatchDetails.softwareV} type="number" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter Software Version' required />
                                    </div>
                                </form>
                            </div>
                            <div>
                                <label for="hardwareV" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Hardware Version</label>
                                <form class="flex items-center">
                                    <div class="relative w-full">
                                        <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                            <h6 style={{ paddingLeft: '13px', fontSize: '0.9rem' }}>
                                                Version-
                                            </h6>
                                        </div>
                                        <input style={{ paddingLeft: '4.7rem' }} onChange={(e) => setDispatchDetails({ ...dispatchDetails, hardwareV: e.target.value })}
                                            value={dispatchDetails.hardwareV} type="number" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter Hardware Version' required />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="mb-6" style={{ textAlign: 'start' }}>
                            <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 :text-white">DHR File</label>
                            <div class="flex gap-2 mb-6 md:grid-cols-2" style={{ alignItems: 'center' }}>
                                <input type="file" onChange={handleImageSelect} id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" required />
                                <button style={{ width: '20%', height: '3rem' }} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800" onClick={generateDhrFile} >Upload</button>
                            </div>
                        </div>
                        <button type="submit" style={{ backgroundColor: 'rgb(203, 41, 123)' }} onClick={dispatchHandler} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Production