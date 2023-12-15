import React, { useEffect } from 'react'
import { Navbar } from '../../../utils/NavBar'
import SideBar from '../../../utils/Sidebar'
import back from "../../../assets/images/back.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getdispatchDetailsByDeviceIdAction } from '../../../store/action/DispatchDetailsAction';
import { CSVLink } from "react-csv";

function DispatchModel() {
  const goBack = () => {
    window.history.go(-1)
  }
  const dispatchAllDetailsByIdReducer = useSelector((state) => state.dispatchAllDetailsByIdReducer)
  const { loading, data } = dispatchAllDetailsByIdReducer
  const deviceAssignData = data && data.data
  const deviceServiceData = data && data.servicesData
  console.log("deviceAssignData", deviceAssignData)
  const batchNo = deviceAssignData && deviceAssignData.batch_no
  const documentNo = deviceAssignData && deviceAssignData.document_no
  const deviceid = deviceAssignData && deviceAssignData.deviceId
  const dod = deviceAssignData && deviceAssignData.date_of_dispatch
  const dom = deviceAssignData && deviceAssignData.date_of_manufacturing
  const hospitalName = deviceAssignData && deviceAssignData.hospital_name
  const purpose = deviceAssignData && deviceAssignData.purpose
  const seiralNo = deviceAssignData && deviceAssignData.serial_no
  const concernedPerson = deviceAssignData && deviceAssignData.concerned_person
  const productType = deviceAssignData && deviceAssignData.product_type
  const Address = deviceAssignData && deviceAssignData.address
  const PhoneNumber = deviceAssignData && deviceAssignData.phone_number
  const simNo = deviceAssignData && deviceAssignData.sim_no
  const pincode = deviceAssignData && deviceAssignData.pincode
  const distributorName = deviceAssignData && deviceAssignData.distributor_name
  const distributorNumber = deviceAssignData && deviceAssignData.distributor_contact
  const dispatch = useDispatch()
  console.log("deviceAssignData", deviceAssignData)
  const deviceId = localStorage.getItem("dispatchDeviceId")
  useEffect(() => {
    dispatch(getdispatchDetailsByDeviceIdAction(deviceId))
  }, [])
  const csvData = [
    ["Device Id", 'Document No', "Batch No", "Date Of Delivery", "Date Of Manuf.", "Hospital Name", "Purpose", "Serial No", "Concerned Person", "Phone Number", "Product Type", "Address", "SIM No", "PIN Code", "Distributor Name", "Distributor Contact"],
    [deviceid, documentNo, batchNo, dod, dom, hospitalName, purpose, seiralNo, concernedPerson, PhoneNumber, productType, Address, simNo, pincode, distributorName, distributorNumber],
  ];
  const history = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault()
    history(`/dispatchEditDetailsForm?deviceId=${deviceid}&serialNO=${seiralNo}`)
  }
  return (
    <>
      <Navbar />
      <SideBar />
      <div
        className="main-overview"
        style={{ position: "absolute", top: "6rem", left: "8rem", width: "100%" }}
      >
        <div
          className="inside-overview"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Heading  */}
          <div
            className=""
            style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#707070" }}
          >
            <Link onClick={goBack}>
              <img src={back} style={{ width: "3rem" }} />
            </Link>
            <h1 class="text-2xl font-extrabold">Dispatch<small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Data</small></h1>
            <div style={{ display: 'flex', gap: '16rem', alignItems: 'center' }}>
              <CSVLink data={csvData}>
                <FontAwesomeIcon icon={faFileArrowDown} style={{ color: "#cb297b", height: "23px" }} />
              </CSVLink>
              <button style={{ width: '5vw', padding: '0.5rem', backgroundColor: 'black', color: 'white', borderRadius: '5px' }} onClick={handleEdit}>Edit</button>
            </div>
          </div>
          {/* Details */}
          <div className='mainContainer' style={{ display: 'flex', gap: '7rem', width: '100%' }}>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ width: '40%' }}>
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="row" class="px-6 py-3">
                      Device Id
                    </th>
                    <td scope="col" class="px-6 font-medium text-gray-900 whitespace-nowrap ">
                      {deviceid ? deviceid : "- - -"}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-900 ">
                    <th scope="col" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Batch Number
                    </th>
                    <td class="px-6">
                      {batchNo ? batchNo : '- - -'}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 ">
                    <th scope="col" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Document Number
                    </th>
                    <td class="px-6">
                      {documentNo ? documentNo : '- - -'}
                    </td>
                  </tr>
                  <tr class="border-b bg-gray-50 ">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Date Of Delivery
                    </th>
                    <td class="px-6">
                      {dod ? dod : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b ">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Date Of Manufacturing
                    </th>
                    <td class="px-6">
                      {dom ? dom : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Hospital Name
                    </th>
                    <td class="px-6">
                      {hospitalName ? hospitalName : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Purpose
                    </th>
                    <td class="px-6">
                      {purpose ? purpose : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Serial No
                    </th>
                    <td class="px-6">
                      {seiralNo ? seiralNo : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Concerned Person Name
                    </th>
                    <td class="px-6">
                      {concernedPerson ? concernedPerson : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Concerned Person Number
                    </th>
                    <td class="px-6">
                      {PhoneNumber ? PhoneNumber : "- - -"}
                    </td>
                  </tr>

                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Product Type
                    </th>
                    <td class="px-6">
                      {productType && productType.length > 0 ? productType : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Address
                    </th>
                    <td class="px-6">
                      {Address ? Address : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Sim Number
                    </th>
                    <td class="px-6">
                      {simNo ? simNo : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      PIN Code
                    </th>
                    <td class="px-6">
                      {pincode && pincode.length > 0 ? pincode : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Distributor Name
                    </th>
                    <td class="px-6">
                      {distributorName ? distributorName : "- - -"}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Distributor Contact
                    </th>
                    <td class="px-6">
                      {distributorNumber ? distributorNumber : "- - -"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="container" style={{ marginLeft: '0%', width: "40%", display: "flex", flexDirection: "column", gap: "3rem", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 0px 50px #00000029", borderRadius: "15px", padding: "2rem" }}>
              <div className="d-flex" style={{ gap: "2rem", flexDirection: "row", color: "#4B4B4B" }}>
                <h5 style={{ fontSize: "0.9rem", width: "100%", fontWeight: "bold" }}>Service Date</h5>
                <h5 style={{ fontSize: "0.9rem", width: "100%", fontWeight: 'bold' }}>Message</h5>
              </div>
              {deviceServiceData && deviceServiceData.length > 0 ?
                <div className="d-flex" style={{ gap: "1.5rem", flexDirection: "column", textAlign: "START", color: "#4B4B4B" }}>
                  {deviceServiceData && deviceServiceData.length > 0 ? deviceServiceData && deviceServiceData.map((item, id) => (
                    <div key={id} style={{ display: 'flex' }}>
                      <h5 style={{ fontSize: "0.9rem", width: "100%" }}>{item.date.split(' ')[0]}</h5>
                      <h5 style={{ fontSize: "0.9rem", width: "100%" }}>{item.message}</h5>
                    </div>
                  )) :
                    <div style={{ display: 'flex', justifyContent: 'center', textAlign: "center", marginTop: "30%" }}>No Data Available</div>
                  }
                </div>
                :
                <section style={{ width: '100%', height: '100%', marginTop: '50%', marginBottom: '50%', textAlign: 'center' }}>
                  {deviceServiceData && deviceServiceData.length == 0 && (
                    <span>
                      No Data Found
                    </span>
                  )}
                  {loading && <span style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', fontSize: 20 }}>Loading...</span>}
                </section>
              }
              {/* </div> */}
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </>
  )
}
export default DispatchModel