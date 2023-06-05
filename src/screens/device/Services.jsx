import React from 'react'
import { Navbar } from '../../utils/NavBar'
import SideBar from '../../utils/Sidebar'
import back from "../../assets/images/back.png";
import { Link } from "react-router-dom";

function Services() {
  return (
    <div>
        <Navbar/>
        <SideBar/>
        <div
        className="main-overview"
        style={{ position: "absolute", top: "5rem", left: "8rem" }}
      >
        <div
          className="inside-overview"
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
        
             {/* Heading  */}
          <div
            className=""
            style={{ display: "flex", alignItems: "center", gap: "1rem" ,color:"#707070"}}
          >
            <Link to='/deviceOverview'>
            <img src={back} style={{ width: "3rem" }} />
            </Link>
            <h4>Service Records</h4>
          </div>
          {/* Details */}
          <div style={{display:"flex",flexDirection:"column",width:"120%",background: "#FFFFFF 0% 0% no-repeat padding-box",boxShadow: "0px 0px 50px #00000029",marginLeft:"0px"}}>
            <div className="d-flex" style={{backgroundColor:"#CB297B",color:"#ffff",padding:"1rem",justifyContent:"center",gap:"7rem"}}>
                <h5 style={{fontSize:"1rem"}}>Service ID</h5>
                <h5 style={{fontSize:"1rem"}}>Date</h5>
            </div>
            <div className="d-flex" style={{justifyContent:"center",color:"#4B4B4B",padding:"1rem",gap:"7rem"}}>
                <h5 style={{fontSize:"1rem"}}>AG54454</h5>
                <h5 style={{fontSize:"1rem"}}>Active </h5>
            </div>
          </div>        
        </div>
    </div>
    </div>
  )
}

export default Services