import React, { useEffect } from 'react'
import { Navbar } from '../../../utils/NavBar'
import SideBar from '../../../utils/Sidebar'
import back from "../../../assets/images/back.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
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
  console.log("deviceServiceData", deviceServiceData)
  console.log("data", data)
  const batchNo = deviceAssignData && deviceAssignData.batch_no
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
    ["Device Id", "Batch No", "Date Of Delivery", "Date Of Manuf.", "Hospital Name", "Purpose", "Serial No", "Concerned Person", "Phone Number", "Product Type", "Address", "SIM No", "PIN Code","Distributer Name","Distributer Contact"],
    [deviceid, batchNo, dod, dom, hospitalName, purpose, seiralNo, concernedPerson, PhoneNumber, productType, Address, simNo, pincode,distributorName,distributorNumber],
  ];
  return (
    <>
      <Navbar />
      <SideBar />
      <div
        className="main-overview"
        style={{ position: "absolute", top: "6rem", left: "8rem", width: "40%" }}
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
              <img src={back} style={{ width: "4rem" }} />
            </Link>
            <h4>Dispatch Data</h4>
            <CSVLink data={csvData}>
              <FontAwesomeIcon icon={faFileArrowDown} style={{ color: "#cb297b", height: "23px" }} />
            </CSVLink>
          </div>
          {/* Details */}
          <div className='mainContainer' style={{ display: 'flex', gap: '7rem', width: '200%' }}>
            <div className="container" style={{ width: "70%", display: "flex", flexDirection: "row", gap: "8rem", background: "#FFFFFF", boxShadow: "0px 0px 50px #00000029", borderRadius: "15px", padding: "2rem", marginLeft: "0px" }}>
              <div className="d-flex" style={{ gap: "1.5rem", flexDirection: "column", color: "#4B4B4B" }}>
                <h5 style={{ fontSize: "0.9rem" }}>Device Id</h5>
                <h5 style={{ fontSize: "0.9rem" }}>Batch No</h5>
                <h5 style={{ fontSize: "0.9rem" }}>Date Of Delivery</h5>
                <h5 style={{ fontSize: "0.9rem" }}>Date Of Manuf.</h5>
                <h5 style={{ fontSize: "0.9rem" }}>Hospital Name</h5>
                <h5 style={{ fontSize: "0.9rem" }}>Purpose</h5>
                <h5 style={{ fontSize: "0.9rem" }}>Serial No</h5>
                <h5 style={{ fontSize: "0.9rem" }}>Concerned Person</h5>
                <h5 style={{ fontSize: "0.9rem" }}>Concerned Person Number</h5>
                <h5 style={{ fontSize: "0.9rem" }}>Product Type</h5>
                <h5 style={{ fontSize: "0.9rem" }}>Address</h5>
                <h5 style={{ fontSize: "0.9rem" }}>SIM number</h5>
                <h5 style={{ fontSize: "0.9rem" }}>PIN Code</h5>
                <h5 style={{ fontSize: "0.9rem" }}>Distributer Name</h5>
                <h5 style={{ fontSize: "0.9rem" }}>Distributer Contact</h5>
              </div>
              <div className="d-flex" style={{ gap: "1.5rem", flexDirection: "column", textAlign: "START", color: "#4B4B4B" }}>
                <h5 style={{ fontSize: "0.9rem" }}>{deviceid?deviceid:"- - -"}</h5>
                <h5 style={{ fontSize: "0.9rem" }}>{batchNo?batchNo:"- - -"}</h5>
                <h5 style={{ fontSize: "0.9rem" }}>{dod?dod:"- - -"}</h5>
                <h5 style={{ fontSize: "0.9rem" }}>{dom?dom:"- - -"}</h5>
                <h5 style={{ fontSize: "0.9rem" }}>{hospitalName?hospitalName:"- - -"}</h5>
                <h5 style={{ fontSize: "0.9rem" }}>{purpose?purpose:"- - -"}</h5>
                <h5 style={{ fontSize: "0.9rem" }}>{seiralNo?seiralNo:"- - -"}</h5>
                <h5 style={{ fontSize: "0.9rem" }}>{concernedPerson?concernedPerson:"- - -"}</h5>
                <h5 style={{ fontSize: "0.9rem" }}>{PhoneNumber?PhoneNumber:"- - -"}</h5>
                <h5 style={{ fontSize: "0.9rem" }}>{productType?productType:"- - -"}</h5>
                <h5 style={{ fontSize: "0.9rem" }}>{Address?Address:"- - -"}</h5>
                <h5 style={{ fontSize: "0.9rem" }}>{simNo?simNo:"- - -"}</h5>
                <h5 style={{ fontSize: "0.9rem" }}>{pincode?pincode:"- - -"}</h5>
                <h5 style={{ fontSize: "0.9rem" }}>{distributorName?distributorName:"- - -"}</h5>
                <h5 style={{ fontSize: "0.9rem" }}>{distributorNumber?distributorNumber:"- - -"}</h5>
              </div>
            </div>

            <div className="container" style={{ width: "60%", display: "flex", flexDirection: "column", gap: "3rem", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 0px 50px #00000029", borderRadius: "15px", padding: "2rem", marginLeft: "0px" }}>
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