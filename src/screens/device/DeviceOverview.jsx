import React from "react";
import SideBar from "../../utils/Sidebar";
import back from "../../assets/images/back.png";
import { Link } from "react-router-dom";
import { Navbar } from "../../utils/NavBar";
import arrowNext from "../../assets/images/NextArrow.png"
import redDot from "../../assets/images/redDot.png"
function DeviceOverview() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const projectName = urlParams.get("name");
  // const status = localStorage.getItem('Status');
  const code = urlParams.get('code');
  const deviceid = urlParams.get('DeviceId')
  console.log('deviceid', deviceid)
  // console.log("status",status)
  return (
    <>
      <SideBar />
      <Navbar/>
      <div
        className="main-overview"
        style={{ position: "absolute", top: "5rem", left: "8rem" }}
      >
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
            <div className="d-flex" style={{gap:"1.5rem",flexDirection:"column",color:"#4B4B4B"}}>
                <h5 style={{fontSize:"1rem"}}>Device ID</h5>
                <h5 style={{fontSize:"1rem"}}>Running Status</h5>
                <h5 style={{fontSize:"1rem"}}>Hours</h5>
                <h5 style={{fontSize:"1rem"}}>Total Hours</h5>
                <h5 style={{fontSize:"1rem"}}>Health</h5>
                <h5 style={{fontSize:"1rem"}}>Address</h5>
            </div>
            <div className="d-flex" style={{gap:"1.5rem",flexDirection:"column",color:"#4B4B4B"}}>

                <h5 style={{fontSize:"1rem"}}>{deviceid}</h5>
                <h5 style={{fontSize:"1rem"}}>Active </h5>
                <h5 style={{fontSize:"1rem"}}>01:54:09</h5>
                <h5 style={{fontSize:"1rem"}}>06:53:43</h5>
                <h5 style={{fontSize:"1rem"}}>Good</h5>
                <h5 style={{fontSize:"1rem"}}>A-1 Sector 81, Noida 201301(UP)</h5>
            </div>
          </div>
          {/* device data */}
          <div className="container" style={{ borderRadius:"15px",padding: "2rem", marginLeft:"0px",color:"#707070"}}>
            <h4>Device Data</h4>
            <div className="d-flex" style={{gap:"2rem",textAlign:"center"}}>
            <Link to='/about' style={{textDecoration:"none"}}>
                <div style={{justifyContent:"space-around",ackground: "#FFFFFF 0% 0% no-repeat padding-box",boxShadow: "0px 0px 50px #00000029",display: "flex", padding: "15px", width: "10rem",borderRadius:"10px", color:"#707070"}}>
                    <h6>About</h6>
                    <img src={arrowNext} style={{width:"1.3rem"}}/>
                </div>
                </Link>
                <Link to={`/deviceEvents?code=${code}&projectName=${projectName}&DeviceId=${deviceid}`} style={{textDecoration:"none"}}>
                <div style={{justifyContent:"space-around",background: "#FFFFFF 0% 0% no-repeat padding-box",boxShadow: "0px 0px 50px #00000029",display: "flex", padding: "15px", width: "10rem",borderRadius:"10px" ,color:"#707070"}}>
                <h6>Monitor Data</h6>
                    <img src={redDot} style={{width:"1rem"}}/>
                </div></Link>
                <div style={{justifyContent:"space-around",background: "#FFFFFF 0% 0% no-repeat padding-box",boxShadow: "0px 0px 50px #00000029",display: "inline-block", padding: "15px", width: "10rem",borderRadius:"10px"}}>
                <h6>Live</h6>
                    {/* <img src={}/> */}
                </div>
                <Link to='/service' style={{textDecoration:"none"}}>
                <div style={{justifyContent:"space-around",background: "#FFFFFF 0% 0% no-repeat padding-box",boxShadow: "0px 0px 50px #00000029",display: "flex", padding: "15px", width: "10rem",borderRadius:"10px" ,color:"#707070"}}>
                <h6>Service Records</h6>
                    {/* <img src={redDot} style={{width:"1rem"}}/> */}
                </div>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeviceOverview;
