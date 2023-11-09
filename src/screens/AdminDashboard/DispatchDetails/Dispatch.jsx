import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchDetailsAction, getDeviceIdFromProduction, getPincodeData, getproductionDetailsByIdAction } from '../../../store/action/DispatchDetailsAction'
import { Navbar } from '../../../utils/NavBar'
import SideBar from '../../../utils/Sidebar'
import Style from "../../../css/DispatchDetails.module.css"
import { Link, useNavigate } from 'react-router-dom'
import back from "../../../assets/images/back.png";
import { getHospitalDataFromAdding } from '../../../store/action/StoreSystem'

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

    const getDeviceIdProductionReducer = useSelector((state) => state.getDeviceIdProductionReducer);
    const { data } = getDeviceIdProductionReducer;
    const deviceIdData = data && data.data
    console.log('1', deviceIdData)
    const productionAllDetailsByUserIdReducer = useSelector((state) => state.productionAllDetailsByUserIdReducer);
    const { data: dataa } = productionAllDetailsByUserIdReducer;
    const productionDataByDeviceId = dataa && dataa.data

    // Hpospital Data
    const getHospitalFromAdding = useSelector((state) => state.getHospitalFromAdding);
    const { data: dataHospital } = getHospitalFromAdding;


    const getPiincodeDatReducer = useSelector((state) => state.getPiincodeDatReducer);
    const { data: pincodeData } = getPiincodeDatReducer;
    const getPincodeAllData = pincodeData && pincodeData.data && pincodeData.data[0]
    console.log('productionDataByDeviceId', productionDataByDeviceId)
    console.log('pincodeData', getPincodeData[0])
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
    // var productValid = "Select Product Type"
    const dispatch = useDispatch()
    const dispatchHandler = (e) => {
        e.preventDefault()
        if (!dispatchDetails.deviceId) {
            toast.error("Enter Device Id")
        }
        // else if (!dispatchDetails.product_type || dispatchDetails.purpose === productValid) {
        //     toast.error("Enter Product Type")
        // }
        // else if (!dispatchDetails.serial_no) {
        //     toast.error("Enter Serial No.")
        // }
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
        else if (!dispatchDetails.address) {
            toast.error("Enter Address")
        }
        // else if (!dispatchDetails.distributor_contact.match(phoneno)) {
        //     toast.error("Enter 10 digit Distrbutor Contact")
        // }
        else if (dispatchDetails.deviceId && dispatchDetails.hospitalName && dispatchDetails.address && dispatchDetails.purpose && dispatchDetails.concerned_person && dispatchDetails.phone_number && dispatchDetails.date_of_dispatch && dispatchDetails.pincode) {
            toast.success("Success")
            dispatch(dispatchDetailsAction({
                deviceId: dispatchDetails.deviceId,
                product_type: productionDataByDeviceId.productType,
                serial_no: productionDataByDeviceId.serialNumber,
                purpose: dispatchDetails.purpose,
                concerned_person: dispatchDetails.concerned_person,
                phone_number: dispatchDetails.phone_number,
                address: dispatchDetails.address,
                date_of_dispatch: dispatchDetails.date_of_dispatch,
                hospital_name: dispatchDetails.hospitalName,
                pincode: dispatchDetails.pincode,
                distributor_name: dispatchDetails.distributor_name,
                distributor_contact: dispatchDetails.distributor_contact,
                district: getPincodeAllData && getPincodeAllData.district,
                state: getPincodeAllData && getPincodeAllData.state,
                city: getPincodeAllData && getPincodeAllData.city,
            }))
        }
    }
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
                            {/* device Id */}
                            <div>
                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Device Id</label>
                                <input list='borow' type="text" onChange={(e) => {
                                    setDispatchDetails({ ...dispatchDetails, deviceId: e.target.value })
                                    const deviceId = e.target.value
                                    dispatch(getproductionDetailsByIdAction(deviceId))
                                }} value={dispatchDetails.deviceId} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Device Id" required />
                                <datalist id='borow'>
                                    {deviceIdData && deviceIdData.map((item) => {
                                        return (
                                            <option value={item.deviceId}>{item.deviceId}</option>
                                        )
                                    })}
                                </datalist>
                            </div>
                            {/* Product Type */}
                            <div>
                                <label for="last_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Product Type</label>
                                <div style={(productionDataByDeviceId && productionDataByDeviceId.productType && productionDataByDeviceId.productType.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    {productionDataByDeviceId && productionDataByDeviceId.productType}
                                </div>
                            </div>

                            {/* Product Serial Number */}
                            <div>
                                <label for="last_name" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">Serial Number</label>
                                <div style={(productionDataByDeviceId && productionDataByDeviceId.serialNumber && productionDataByDeviceId.serialNumber.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    {productionDataByDeviceId && productionDataByDeviceId.serialNumber}
                                </div>
                            </div>
                            {/* hospital Name */}
                            <div>
                                <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Hospital Name</label>
                                {/* <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, hospitalName: e.target.value })} value={dispatchDetails.hospitalName} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Hospital Name' required /> */}
                                <input list='data' type="text" onChange={(e) =>
                                    setDispatchDetails({ ...dispatchDetails, hospitalName: e.target.value })
                                } value={dispatchDetails.hospitalName} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Hospital Name" required />
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
                                <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Distributor Name<span>*</span></label>
                                <input type="text" onChange={(e) => setDispatchDetails({ ...dispatchDetails, distributor_name: e.target.value })} value={dispatchDetails.distributor_name} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Distributor Name' required />
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
                            <div>
                                <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Distributor Contact<span>*</span></label>
                                <input type="number" onChange={(e) => setDispatchDetails({ ...dispatchDetails, distributor_contact: e.target.value })}
                                    value={dispatchDetails.distributor_contact} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Distributor Contact' required />
                            </div>
                            {/* PIN Code */}
                            <div>
                                <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">PIN Code</label>
                                <input type="number" onChange={(e) => {
                                    setDispatchDetails({ ...dispatchDetails, pincode: e.target.value })
                                    const pincode = e.target.value
                                    dispatch(getPincodeData(pincode))
                                }
                                } value={dispatchDetails.pincode} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder='Enter Pin Code' required />
                            </div>
                            <div>
                                <label for="district" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">District</label>
                                <div style={(getPincodeAllData && getPincodeAllData.district && getPincodeAllData.district.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    {getPincodeAllData && getPincodeAllData.district}
                                </div>
                            </div>
                            <div>
                                <label for="city" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">City</label>
                                <div style={(getPincodeAllData && getPincodeAllData.city && getPincodeAllData.city.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    {getPincodeAllData && getPincodeAllData.city}
                                </div>
                            </div>
                            <div>
                                <label for="state" style={{ textAlign: 'start' }} class="block mb-2 text-sm font-medium text-gray-900 :text-white">State</label>
                                <div style={(getPincodeAllData && getPincodeAllData.state && getPincodeAllData.state.length > 0) ? { padding: '0.6rem' } : { padding: '1.2rem' }} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500">
                                    {getPincodeAllData && getPincodeAllData.state}
                                </div>
                            </div>
                            {/* Address */}
                            <div>
                                <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Address</label>
                                <textarea id="message" onChange={(e) => setDispatchDetails({ ...dispatchDetails, address: e.target.value })}
                                    value={dispatchDetails.address} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter Address"></textarea>
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