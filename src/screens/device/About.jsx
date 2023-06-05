import React from 'react'
import { Navbar } from '../../utils/NavBar'
import SideBar from '../../utils/Sidebar'
import back from "../../assets/images/back.png";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
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
            style={{ display: "flex", alignItems: "center", gap: "1rem", color:"#707070"}}
          >
            <Link to='/deviceOverview'>
            <img src={back} style={{ width: "3rem" }} />
            </Link>
            <h4>About</h4>
          </div>
          {/* Details */}
          <div className="container" style={{display:"flex",flexDirection:"row",gap:"8rem",background: "#FFFFFF 0% 0% no-repeat padding-box",boxShadow: "0px 0px 50px #00000029", borderRadius:"15px",padding: "2rem", marginLeft:"0px"}}>
            <div className="d-flex" style={{gap:"1.5rem",flexDirection:"column",color:"#4B4B4B"}}>
                <h5 style={{fontSize:"1rem"}}>Product</h5>
                <h5 style={{fontSize:"1rem"}}>Model</h5>
                <h5 style={{fontSize:"1rem"}}>Delivery Date</h5>
                <h5 style={{fontSize:"1rem"}}>Batch No.</h5>
                <h5 style={{fontSize:"1rem"}}>Date of Warranty</h5>
                <h5 style={{fontSize:"1rem"}}>Last Service</h5>
            </div>
            <div className="d-flex" style={{gap:"1.5rem",flexDirection:"column",textAlign:"center",color:"#4B4B4B"}}>
                <h5 style={{fontSize:"1rem"}}>AgVa Pro Ventilator</h5>
                <h5 style={{fontSize:"1rem"}}>-</h5>
                <h5 style={{fontSize:"1rem"}}>16-05-2023</h5>
                <h5 style={{fontSize:"1rem"}}>01-02-2023</h5>
                <h5 style={{fontSize:"1rem"}}>-</h5>
                <h5 style={{fontSize:"1rem"}}>23 Mar 2023</h5>
            </div>
          </div>
          </div>
          </div>
    </>
  )
}

export default About