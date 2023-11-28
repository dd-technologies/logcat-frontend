import React, { useEffect } from "react";
import SideBar from "../../utils/Sidebar";
import back from "../../assets/images/back.png";
import standBack from "../../assets/icons/standBy.png";
import insideFeedback from "../../assets/icons/insideFeedback.png";
import { Link } from "react-router-dom";
import { Navbar } from "../../utils/NavBar";
import arrowNext from "../../assets/images/NextArrow.png"
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getSingleDeviceIdDetails } from "../../store/action/DeviceAction";
function DeviceOverview() {
  const getAllSectionByDeviceId = useSelector((state) => state.getAllSectionByDeviceId);
  const { loading, data } = getAllSectionByDeviceId;
  const overviewData = data && data.data

  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;
  const adminProfile = adminInfo && adminInfo.data && adminInfo.data.userType

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const projectName = urlParams.get("name");
  const code = urlParams.get('code');
  const deviceid = urlParams.get('DeviceId')
  const status = overviewData && overviewData.message
  const lastHours = overviewData && overviewData.last_hours
  const totalHours = overviewData && overviewData.total_hours
  const health = overviewData && overviewData.health
  const address = overviewData && overviewData.address
  const alertHandel = () => {
    toast.error("Device Inactive")
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSingleDeviceIdDetails(deviceid))
  }, [dispatch])

  console.log('overviewData', overviewData)
  return (
    <>
      <Navbar />
      <SideBar />
      <div
        className="main-overview"
        style={{ position: "absolute", top: "5rem", left: "8rem" }}
      >
        <Toaster />
        <div
          className="inside-overview"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Heading  */}
          <div
            className=""
            style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#707070" }}
          >
            <Link to='/device'>
              <img src={back} style={{ width: "3rem" }} />
            </Link>
            <h4>Device Overview</h4>
          </div>
          {/* Details */}
          <div className="d-flex" style={{alignItems:'center', flexWrap:'wrap',width:'70%'}}>
            <div className="container" style={{ display: "flex", flexDirection: "row", gap: "10rem", width: "100%", boxShadow: "0px 0px 50px #00000029", borderRadius: "15px", padding: "1rem", marginLeft: "0px" }}>
              <div className="d-flex" style={{ gap: "1.8rem", flexDirection: "column", color: "#4B4B4B" }}>
                <h5 style={{ fontSize: "1rem" }}>Device ID</h5>
                <h5 style={{ fontSize: "1rem" }}>Running Status</h5>
                <h5 style={{ fontSize: "1rem" }}>Last Hours</h5>
                <h5 style={{ fontSize: "1rem" }}>Total Ventilatin Hours</h5>
                <h5 style={{ fontSize: "1rem" }}>Health</h5>
                <h5 style={{ fontSize: "1rem" }}>Address</h5>
              </div>
              <div className="d-flex" style={{ gap: "1.5rem", flexDirection: "column", color: "#4B4B4B" }}>
                <h5 style={{ fontSize: "1rem" }}>{overviewData && overviewData.DeviceId}</h5>
                <h5 style={{ fontSize: "1rem" }}>{status === "ACTIVE" ? <>
                  <svg width="40px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#11ac14">
                    <g id="SVGRepo_iconCarrier">
                      <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#11ac14"></path>
                    </g>
                  </svg></> : <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#ff0000"></path> </g></svg>}</h5>
                <h5 style={{ fontSize: "1rem" }}>{status == "ACTIVE" ? "In Ventilation" : lastHours}</h5>
                <h5 style={{ fontSize: "1rem" }}>{!totalHours ? "- - -" : totalHours}</h5>
                <h5 style={{ fontSize: "1rem" }}>{!health ? "- - -" : health}</h5>
                <h5 style={{ fontSize: "1rem" }}>{!address ? "- - -" : address}</h5>
              </div>
            </div>
          </div>
          {/* device data */}
          <div className="container" style={{ borderRadius: "15px", padding: "0.1rem", marginLeft: "0px", color: "#707070" }}>
            <h4>Device Data</h4>
            <div className="d-flex" style={{ gap: "2rem", textAlign: "center", flexWrap: 'wrap' }}>
              <Link to={`/about?code=${code}&projectName=${projectName}&DeviceId=${deviceid}`} style={{ textDecoration: "none" }}>
                <div style={{ justifyContent: "space-around", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 0px 50px #00000029", display: "flex", padding: "15px", width: "10rem", borderRadius: "10px", color: "#707070" }}>
                  <h6>About</h6>
                  <img src={arrowNext} style={{ width: "1.3rem" }} />
                </div>
              </Link>
              <Link to={`/deviceEvents?code=${code}&projectName=${projectName}&DeviceId=${deviceid}`} style={{ textDecoration: "none" }} onClick={() => localStorage.setItem("deviceid", deviceid)}>
                <div style={{ alignItems: 'center', justifyContent: "space-around", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 0px 50px #00000029", display: "flex", padding: "15px", width: "11rem", borderRadius: "10px", color: "#707070" }}>
                  <h6>Monitor Data</h6>
                  <span style={{ width: '0.8rem', height: '0.8rem', backgroundColor: 'red', borderRadius: '10px' }}></span>
                </div>
              </Link>
              {status == "ACTIVE" ? <>
                <Link to={`/live?code=${code}&projectName=${projectName}&DeviceId=${deviceid}`} style={{ textDecoration: "none" }}>
                  <div style={{ justifyContent: "space-around", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 0px 50px #00000029", display: "inline-block", padding: "15px", width: "10rem", borderRadius: "10px", color: "#707070" }}>
                    <h6>Live</h6>
                  </div>
                </Link>
              </> :
                <button onClick={alertHandel} style={{ justifyContent: "space-around", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 0px 50px #00000029", display: "flex", padding: "15px", width: "11rem", borderRadius: "10px", color: "#707070", border: "0px" }}>
                  <h6>Live</h6>
                </button>
              }
              {adminProfile == 'Admin' ?
                <Link to={`/service?code=${code}&projectName=${projectName}&DeviceId=${deviceid}`} style={{ textDecoration: "none" }}>
                  <div style={{ justifyContent: "space-around", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 0px 50px #00000029", display: "flex", alignItems: 'center', padding: "15px", width: "13rem", borderRadius: "10px", color: "#707070", textAlign: 'center' }}>
                    <h6>Service Records</h6>
                    <span style={{ backgroundColor: 'red', borderRadius: '10px', height: '0.8rem', width: '0.8rem' }}></span>
                  </div>
                </Link>
                : ''}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeviceOverview;
