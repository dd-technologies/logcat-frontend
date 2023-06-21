/* eslint-disable */

import React from "react";
import CustomCard from "../../container/CustomCard";
import { Col } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { ThemeContext } from "../../utils/ThemeContext";
import agvaVenti from "../../assets/images/AgVaCrop2.png";
import { Navbar } from "../../utils/NavBar";
import SideBar from "../../utils/Sidebar";
import { Link } from "react-router-dom";
import {
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AdminDashboard = () => {
  const { theme } = React.useContext(ThemeContext);
//   let newDate = props.data.createdAt.split("T")[0];
//   let year = newDate.split("-")[0];
//   let month = newDate.split("-")[1];
//   let day = newDate.split("-")[2];
//   newDate = `${day}-${month}-${year}`;
  return (
    <>
    <Navbar/>
    <SideBar/>
      {/* <ThemeContext.Consumer>  */}
          <>
            <Col xl={4} lg={4} md={6} sm={6} style={{marginLeft:"6rem",paddingTop:"6rem",display:"flex",gap:"3rem",width:"100%"}}>
              <CustomCard
                padding="15px"
                height="200px"
                boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
                width="17%"
              >
                <Link to="/manageUsers" style={{ textDecoration: "none" }}>
                    <div
              className="project-cart"
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                marginLeft: "2rem",
                width: "16rem",
                height: "6rem",
                display:"flex",
                alignItems:"center"
              }}
            >
                <div className="d-flex" style={{ gap: "2rem" }}>
                <FontAwesomeIcon icon={faUsers} style={{color: "#cb2971",width:"12%",height:"30%"}} />
                  <div
                    className="d-flex"
                    style={{
                      gap: "1rem",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h6 style={{ color: "#707070", fontSize: "1.4rem" }}>
                      Manage Users
                      </h6>
                    </div>
                  </div>
                </div>
                </div>
                </Link>
              </CustomCard>
              <CustomCard
                padding="15px"
                height="200px"
                boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
                width="30%"
              >
                {/* <Link
                 to={`/device?code=${props.data.code}&name=${props.data.name}`}
                  style={{ textDecoration: "none" }}
                > */}
                    <div
              className="project-cart"
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                marginLeft: "2rem",
                width: "16rem",
                height: "6rem",
                display:"flex",
                alignItems:"center"
              }}
            >
              <Link to="/home"
                   style={{ textDecoration: "none" }}>
                <div className="d-flex" style={{ gap: "2rem" }}>
                  <img
                    src={agvaVenti}
                    style={{ height: "4rem" }}
                    alt="AgvaVenti"
                  />
                  <div
                    className="d-flex"
                    style={{
                      gap: "1rem",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h6 style={{ color: "#707070", fontSize: "1.4rem" }}>
                      Manage Device
                      </h6>
                    </div>
                  </div>
                </div>
                </Link>
                </div>
              </CustomCard>
            </Col>
          </>
      {/* </ThemeContext.Consumer> */}
    </>
  );
};

export default AdminDashboard;
