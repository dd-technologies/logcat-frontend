import React from "react";
import SideBar from "../../utils/Sidebar";
import back from "../../assets/images/back.png";
import { Link } from "react-router-dom";
import { Navbar } from "../../utils/NavBar";
import arrowNext from "../../assets/images/NextArrow.png"
import redDot from "../../assets/images/redDot.png"
import { toast, Toaster } from "react-hot-toast";
function DeviceOverview() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const projectName = urlParams.get("name");
  const code = urlParams.get('code');
  const deviceid = urlParams.get('DeviceId')
  const status =JSON.parse(localStorage.getItem('message'))
  const lastHours=JSON.parse(localStorage.getItem('last_hours'))
  const totalHours=JSON.parse(localStorage.getItem('total_hours'))
  const health =JSON.parse(localStorage.getItem('health'))
  const address=JSON.parse(localStorage.getItem('address'))
  console.log('deviceid', deviceid)

  

 const alertHandel=()=>{
    toast.error("Device Inactive")
  }
  return (
    <>
    <Navbar/>
      <SideBar />
      <div
        className="main-overview"
        style={{ position: "absolute", top: "5rem", left: "8rem" }}
      >
        <Toaster/>
        <div
          className="inside-overview"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
            {/* Heading  */}
          <div
            className=""
            style={{ display: "flex", alignItems: "center", gap: "1rem" ,color:"#707070"}}
          >
            <Link to='/device'>
            <img src={back} style={{ width: "3rem" }} />
            </Link>
            <h4>Device Overview</h4>
          </div>
          {/* Details */}
          <div className="container" style={{display:"flex",flexDirection:"row",gap:"10rem",width:"80%",background: "#FFFFFF 0% 0% no-repeat padding-box",boxShadow: "0px 0px 50px #00000029", borderRadius:"15px",padding: "2rem", marginLeft:"0px"}}>
            <div className="d-flex" style={{gap:"1.8rem",flexDirection:"column",color:"#4B4B4B"}}>
                <h5 style={{fontSize:"1rem"}}>Device ID</h5>
                <h5 style={{fontSize:"1rem"}}>Running Status</h5>
                <h5 style={{fontSize:"1rem"}}>Last Hours</h5>
                <h5 style={{fontSize:"1rem"}}>Total Hours</h5>
                <h5 style={{fontSize:"1rem"}}>Health</h5>
                <h5 style={{fontSize:"1rem"}}>Address</h5>
            </div>
            <div className="d-flex" style={{gap:"1.5rem",flexDirection:"column",color:"#4B4B4B"}}>
                <h5 style={{fontSize:"1rem"}}>{deviceid}</h5>
                <h5 style={{fontSize:"1rem"}}>{status}{status==="ACTIVE"?<>
                <svg width="40px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#11ac14">
                                              <g id="SVGRepo_iconCarrier"> 
                                              <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#11ac14"></path>
                                               </g>
                 </svg></>:<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#ff0000"></path> </g></svg>}</h5>
                <h5 style={{fontSize:"1rem"}}>{status=="ACTIVE"?"- - -":lastHours}</h5>
                <h5 style={{fontSize:"1rem"}}>{!totalHours?"- - -":totalHours}</h5>
                <h5 style={{fontSize:"1rem"}}>{!health?"- - -":health}</h5>
                <h5 style={{fontSize:"1rem"}}>{!address?"- - -":address}</h5>
            </div>
          </div>
          {/* device data */}
          <div className="container" style={{ borderRadius:"15px",padding: "2rem", marginLeft:"0px",color:"#707070"}}>
            <h4>Device Data</h4>
            <div className="d-flex" style={{gap:"2rem",textAlign:"center"}}>
            <Link to={`/about?code=${code}&projectName=${projectName}&DeviceId=${deviceid}`} style={{textDecoration:"none"}}>
                <div style={{justifyContent:"space-around",background: "#FFFFFF 0% 0% no-repeat padding-box",boxShadow: "0px 0px 50px #00000029",display: "flex", padding: "15px", width: "10rem",borderRadius:"10px", color:"#707070"}}>
                    <h6>About</h6>
                    <img src={arrowNext} style={{width:"1.3rem"}}/>
                </div>
                </Link>
                <Link to={`/deviceEvents?code=${code}&projectName=${projectName}&DeviceId=${deviceid}`} style={{textDecoration:"none"}} onClick={()=>localStorage.setItem("deviceid",deviceid)}>
                <div style={{justifyContent:"space-around",background: "#FFFFFF 0% 0% no-repeat padding-box",boxShadow: "0px 0px 50px #00000029",display: "flex", padding: "15px", width: "11rem",borderRadius:"10px" ,color:"#707070"}}>
                <h6>Monitor Data</h6>
                    <img src={redDot} style={{width:"1.2rem"}}/>
                </div>
                </Link>
                {status=="ACTIVE"?<>
                <Link to={`/live?code=${code}&projectName=${projectName}&DeviceId=${deviceid}`} style={{textDecoration:"none"}}>
                <div style={{justifyContent:"space-around",background: "#FFFFFF 0% 0% no-repeat padding-box",boxShadow: "0px 0px 50px #00000029",display: "inline-block", padding: "15px", width: "10rem",borderRadius:"10px",color:"#707070"}}>
                <h6>Live</h6>
                </div>
                </Link>
                </>:
                <button onClick={alertHandel} style={{justifyContent:"space-around",background: "#FFFFFF 0% 0% no-repeat padding-box",boxShadow: "0px 0px 50px #00000029",display: "flex", padding: "15px", width: "11rem",borderRadius:"10px" ,color:"#707070",border:"0px"}}>
                  <h6>Live</h6>
                </button>
                }
                {/* <Link to="/service" style={{textDecoration:"none"}}> */}
                <div style={{justifyContent:"space-around",background: "#FFFFFF 0% 0% no-repeat padding-box",boxShadow: "0px 0px 50px #00000029",display: "flex", padding: "15px", width: "10rem",borderRadius:"10px" ,color:"#707070"}}>
                <h6>Service Records</h6>
                    {/* <img src={redDot} style={{width:"1rem"}}/> */}
                </div>
                {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeviceOverview;
