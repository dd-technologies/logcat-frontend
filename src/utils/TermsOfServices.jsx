import React from "react";
import { Navbar } from "./NavBar";
import SideBar from "./Sidebar";
import back from "../../src/assets/images/back.png";
import { Link } from "react-router-dom";

function TermsOfServices() {
  const goBack=()=>{
    window.history.go(-1)
  }
  return (
    <>
      <Navbar />
      <SideBar />
      <div
        className="main-overview"
        style={{ position: "absolute", top: "5rem", left: "8rem",width:'90%' }}
      >
        <div
          className="inside-overview"
          style={{ display: "flex", flexDirection: "column", gap: "1rem"}}
        >
          {/* Heading  */}
          <div
            className=""
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              color: "#707070",
            }}
          >
            <Link onClick={goBack}>
              <img src={back} style={{ width: "3rem" }} />
            </Link>
            <h4>Terms Of Services</h4>
            
          </div>
          {/* Details */}
          <div
              className="container"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10rem",
                width: "100%",
                background: "#FFFFFF 0% 0% no-repeat padding-box",
                boxShadow: "0px 0px 50px #00000029",
                borderRadius: "15px",
                padding: "2rem",
                marginLeft: "0px",
              }}
            >
              <div className="d-flex" style={{flexDirection:"column", gap:"1rem"}}>
                {/* <div> */}
                <h5>
                  We guarantee the provision of standard warranty of the product within the warranty period from date of purchase/Installation. The conditions of warranty service are as follow: 
                </h5>
                <p>1) In order to claim warranty, the customer must produce the original invoice or other purchase document as proof of purchase. 
</p>
                {/* </div> */}
                {/* <div> */}
                <h4>1914 translation by H. Rackham</h4>
                <p>
                  
                </p>
                {/* </div> */}
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default TermsOfServices;
