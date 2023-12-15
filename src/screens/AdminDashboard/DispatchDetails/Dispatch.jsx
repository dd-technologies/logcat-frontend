import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchDetailsAction, getDeviceIdFromProduction, getPincodeData, getSerialNumberList, getSingleHospitalDetails, getproductionDetailsByIdAction } from '../../../store/action/DispatchDetailsAction'
import { Navbar } from '../../../utils/NavBar'
import SideBar from '../../../utils/Sidebar'
import Style from "../../../css/DispatchDetails.module.css"
import { Link, useNavigate } from 'react-router-dom'
import back from "../../../assets/images/back.png";
import { getHospitalDataFromAdding } from '../../../store/action/StoreSystem'
import { getDeviceIdBySerialNumber } from '../../../store/action/DeviceAction'

function Dispatch() {
    const [dispatchDetails, setDispatchDetails] = useState({
        product_type: "",
        serial_no: "",
        hospitalName: "",
        purpose: "",
        concerned_person: "",
        phone_number: "",
        date_of_dispatch: "",
        distributor_name: "",
        distributor_contact: "",
        document_no: "",
    })
    const dispatch = useDispatch()
    const getDeviceIdProductionReducer = useSelector((state) => state.getDeviceIdProductionReducer);
    const { data } = getDeviceIdProductionReducer;
    const deviceIdData = data && data.data

    const productionAllDetailsByUserIdReducer = useSelector((state) => state.productionAllDetailsByUserIdReducer);
    const { data: dataa } = productionAllDetailsByUserIdReducer;
    const productionDataByDeviceId = dataa && dataa.data

    // Serial Number Data
    const getSerialNumberListReducer = useSelector((state) => state.getSerialNumberListReducer);
    const { data: dataSerialNumbers } = getSerialNumberListReducer;


    // useEffect(() => {
    //     dispatch(getSerialNumberList())
    // }, [])
    // Hpospital Data
    const getHospitalFromAdding = useSelector((state) => state.getHospitalFromAdding);
    const { data: dataHospital } = getHospitalFromAdding;


    // Single Hpospital Data
    const getHospitalDetailsReducer = useSelector((state) => state.getHospitalDetailsReducer);
    const { data: singleHospitalData } = getHospitalDetailsReducer;
    const singleDataOfHospital = singleHospitalData && singleHospitalData.data

    const hospitalPinCode = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode;
    const hospitalDistrict = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].District;
    const hospitalCity = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].City;
    const hospitalAddress = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Hospital_Address;
    const hospitalState = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].State
    // Serial No
    const getDeviceIdBySerialNumberReducer = useSelector((state) => state.getDeviceIdBySerialNumberReducer);
    const { data: dataSerialNo, error } = getDeviceIdBySerialNumberReducer;
    useEffect(() => {
        dispatch(getDeviceIdBySerialNumber())
    }, [])
    const getPiincodeDatReducer = useSelector((state) => state.getPiincodeDatReducer);
    const { data: pincodeData } = getPiincodeDatReducer;
    const getPincodeAllData = pincodeData && pincodeData.data && pincodeData.data[0]
    useEffect(() => {
        dispatch(getPincodeData())
    }, [])

    useEffect(() => {
        dispatch(getproductionDetailsByIdAction())
    }, [])

    useEffect(() => {
        dispatch(getHospitalDataFromAdding())
    }, [])
    useEffect(() => {
        dispatch(getDeviceIdFromProduction())
    }, [])
    var phoneno = /^\d{10}$/
    var pinCode = /^\d{6}$/
    var purposeValid = "Select Purpose Type"
    var productValid = "Select Product Type"
  
    const dispatchHandler = (e) => {
        e.preventDefault()
        if (!dispatchDetails.product_type || dispatchDetails.purpose === productValid) {
            toast.error("Enter Product Type")
        }
        else if (!dispatchDetails.serial_no) {
            toast.error("Enter Serial No.")
        }
        else if (!dispatchDetails.hospitalName) {
            toast.error("Enter Hospital Name")
        }
        else if (!dispatchDetails.purpose || dispatchDetails.purpose === purposeValid) {
            toast.error("Enter Purpose")
        }
        else if (!dispatchDetails.concerned_person) {
            toast.error("Enter Concerned Person Name")
        }
        else if (!dispatchDetails.phone_number) {
            toast.error("Enter Concerned Contact")
        }
        else if (!dispatchDetails.phone_number.match(phoneno)) {
            toast.error(`Enter 10 digit not ${dispatchDetails.phone_number.toString().length} digit Concerned Number`)
        }
        else if (!dispatchDetails.date_of_dispatch) {
            toast.error("Enter Date Of Dispatch")
        }
        else if (!dispatchDetails.document_no) {
            toast.error("Enter Document Number")
        }
        else if (dispatchDetails.product_type && dispatchDetails.hospitalName && dispatchDetails.purpose && dispatchDetails.document_no && dispatchDetails.concerned_person && dispatchDetails.phone_number && dispatchDetails.date_of_dispatch) {
            dispatch(dispatchDetailsAction({
                deviceId: dataSerialNo && dataSerialNo.deviceId,
                product_type: dispatchDetails.product_type,
                serial_no: dispatchDetails.serial_no,
                purpose: dispatchDetails.purpose,
                concerned_person: dispatchDetails.concerned_person,
                phone_number: dispatchDetails.phone_number,
                address: hospitalAddress,
                date_of_dispatch: dispatchDetails.date_of_dispatch,
                hospital_name: dispatchDetails.hospitalName,
                pincode: hospitalPinCode,
                distributor_name: dispatchDetails.distributor_name,
                distributor_contact: dispatchDetails.distributor_contact,
                district: hospitalDistrict,
                state: hospitalState,
                city: hospitalCity,
                document_no: dispatchDetails.document_no
            }))
            toast.success("Success")
        }
    }
// useEffect(()=>{
//     if (dataSerialNo) {
//        return dataSerialNo 
//     }else if(dispatchDetails.serial_no.length<0){
//          console.log('')
//     }
//     else if (error){
//         toast.error(error)
//     }
// },[])
console.log('0',dataSerialNo)
   
    const navigate = useNavigate()
    const handleAddHospital = () => {
        navigate('/add_hospital')
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
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}>
                            <Link onClick={goBack} style={{ display: 'block' }}>
                                <img src={back} style={{ width: "3rem", }} />
                            </Link>
                            <h1 class="text-2xl font-extrabold">Dispatch<small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Details</small></h1>
                            <hr style={{ color: "#CB297B" }} />
                        </div>
                        <button onClick={handleAddHospital} style={{ backgroundColor: '#cb297b' }} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Hospital</button>
                    </div>
                    <form>
                        <div class="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                            {/* serial Number */}
                            <div>
                                <label for="last_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Serial Number</label>
                                <input list='serialno' type="text"
                                     onChange={(e) => {
                                    setDispatchDetails({ ...dispatchDetails, serial_no: e.target.value })
                                    const serial_no = e.target.value;
                                    dispatch(getDeviceIdBySerialNumber(serial_no))
                                    }} 
                                    // onChange={handleSerialNo}
                                    value={dispatchDetails.serial_no} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Serial Number" required />
                                <datalist id='serialno'>
                                    {dataSerialNumbers && dataSerialNumbers.data && dataSerialNumbers.data.map((item) => {
                                        return (
                                            <option value={item.serialNumber}>{item.serialNumber}</option>
                                        )
                                    })}
                                </datalist>
                            </div>
                            {/* Product Type */}
                            <div>
                                <label for="last_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Product Type</label>
                                <select id="countries" onChange={(e) => setDispatchDetails({ ...dispatchDetails, product_type: e.target.value })}
                                    value={dispatchDetails.product_type} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    <option defaultChecked>{productValid}</option>
                                    <option>AgVa Pro</option>
                                    <option>Insulin</option>
                                    <option>AgVa Oxy+</option>
                                    <option>AgVa Emer.</option>
                                    <option>AgVa Inteli</option>
                                    <option>Patient Moniter</option>
                                    <option>Sedation System</option>
                                </select>
                            </div>

                            {/* Device Id */}
                            <div>
                                <div>
                                    <label for="last_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Device Id</label>
                                    <div style={(dataSerialNo && dataSerialNo.deviceId && dataSerialNo.deviceId.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                        {dataSerialNo && dataSerialNo.deviceId}
                                    </div>
                                </div>
                            </div>
                            {/* hospital Name */}
                            <div>
                                <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Hospital Name</label>
                                <input list='data' type="text" onChange={(e) => {
                                    setDispatchDetails({ ...dispatchDetails, hospitalName: e.target.value })
                                    const hospital_name = e.target.value;
                                    dispatch(getSingleHospitalDetails(hospital_name))
                                }} value={dispatchDetails.hospitalName} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Hospital Name" required />
                                <datalist id='data'>
                                    {dataHospital && dataHospital.map((item) => {
                                        return (
                                            <option value={item.Hospital_Name}>{item.Hospital_Name}</option>
                                        )
                                    })}
                                </datalist>
                            </div>

                            {/* purpose */}
                            <div>
                                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Purpose</label>
                                <select id="countries" onChange={(e) => setDispatchDetails({ ...dispatchDetails, purpose: e.target.value })}
                                    value={dispatchDetails.purpose} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    <option defaultChecked>{purposeValid}</option>
                                    <option>Sold</option>
                                    <option>Demo</option>
                                </select>
                            </div>
                            <div>
                                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Document Number</label>
                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, document_no: e.target.value })}
                                    value={dispatchDetails.document_no} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Document No.' required />

                            </div>
                            {/* concerned Person */}
                            <div>
                                <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Concerned Person Name</label>
                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, concerned_person: e.target.value })}
                                    value={dispatchDetails.concerned_person} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Concerned Person Name' required />
                            </div>
                            {/* concerned Person contact */}
                            <div>
                                <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Concerned Person Contact</label>
                                <input type="number" onChange={(e) => setDispatchDetails({ ...dispatchDetails, phone_number: e.target.value })}
                                    value={dispatchDetails.phone_number} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Concerned Person Contact' required />
                            </div>
                            {/* distrbuter name  */}
                            <div>
                                <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Distributor Name<span>(optional)</span></label>
                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, distributor_name: e.target.value })} value={dispatchDetails.distributor_name} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Distributor Name' required />
                            </div>
                            <div>
                                <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Distributor Contact<span>(optional)</span></label>
                                <input type="number" onChange={(e) => setDispatchDetails({ ...dispatchDetails, distributor_contact: e.target.value })}
                                    value={dispatchDetails.distributor_contact} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Distributor Contact' required />
                            </div>
                        </div>
                        <div class="grid gap-6 mb-6 md:grid-cols-2" style={{ textAlign: 'start' }}>
                            {/* dispatch date */}
                            <div class="mb-6">
                                <label for="last_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Dispatch Date</label>
                                <input type="date" onChange={(e) => setDispatchDetails({ ...dispatchDetails, date_of_dispatch: e.target.value })}
                                    value={dispatchDetails.date_of_dispatch} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" required />
                            </div>
                            {/* Distributer Contact */}

                            {/* PIN Code */}
                            <div>
                                {/* <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">PIN Code</label> */}
                                <div>
                                    <label for="last_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">PIN Code</label>
                                    <div style={(singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode && singleDataOfHospital[0].Pincode.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                        {hospitalPinCode}
                                    </div>
                                </div></div>
                            <div>
                                <label for="district" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">District</label>
                                <div style={(singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode && singleDataOfHospital[0].District.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    {hospitalDistrict}
                                </div>
                            </div>
                            <div>
                                <label for="city" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">City</label>
                                <div style={(singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode && singleDataOfHospital[0].City.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    {hospitalCity}
                                </div>
                            </div>
                            <div>
                                <label for="state" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">State</label>
                                <div style={(singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode && singleDataOfHospital[0].Hospital_Address.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    {hospitalState}
                                </div>
                            </div>
                            {/* Address */}
                            <div>
                                <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Address</label>
                                <div style={(singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode && singleDataOfHospital[0].Pincode.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    {hospitalAddress}
                                </div>
                            </div>
                        </div>
                        <button type="submit" style={{ backgroundColor: 'rgb(203, 41, 123)' }} onClick={dispatchHandler} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Submit</button>
                    </form>
                </div >
            </div >
        </>
    )
}

export default Dispatch