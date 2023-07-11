import React from "react";
import { useState } from "react";
import CustomCard from "../../container/CustomCard";
import { Col } from "react-bootstrap";
import agvaVenti from "../../assets/images/AgVaCrop2.png";
import deviceAssign from "../../assets/icons/deviceAssign.png";
import { Navbar } from "../../utils/NavBar";
import { getDefaultDataForDashboard } from "../../store/action/AdminDashboard";
import SideBar from "../../utils/Sidebar";
import { Link, json } from "react-router-dom";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LineChart from "./LineChart";
import "../../css/LineChart.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const AdminDashboard = () => {
  const [chart, setChart] = useState([1,2,3,]);
  const dashboardDataDefault = useSelector(
    (state) => state.dashboardDataDefault
  );
  const { data: getDataForDashboard } = dashboardDataDefault;
  const allTotalDevices =
    getDataForDashboard && getDataForDashboard.data.weeklyCounts;
  const totalCounts =
    getDataForDashboard && getDataForDashboard.data.totalCounts;
  console.log("allTotalDevices", allTotalDevices);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDefaultDataForDashboard());
  }, []);
  useEffect(() => {
    setChart(json.allTotalDevices);
  }, []);
  chart?.map((item)=>console.log("hello",item.count))
  var data = {
    labels: chart?.map((item) =>item._id),
    datasets: [
      {
        label: "My First Dataset",
        // data: UserData.map((data) => data.userGain),
        data: [20,32,90,24,54,57],
        backgroundColor: ["#CB297B"],
        borderColor: "#CB297B",
        borderWidth: 1,
        tension: 0.1,
      },
    ],
  };
  return (
    <>
      <Navbar />
      <SideBar />
      <>
        <Col
          xl={4}
          lg={4}
          md={6}
          sm={6}
          style={{
            marginLeft: "6rem",
            paddingTop: "6rem",
            display: "flex",
            gap: "3rem",
            width: "100%",
          }}
        >
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
                  height: "7rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="d-flex" style={{ gap: "2rem" }}>
                  <FontAwesomeIcon
                    icon={faUsers}
                    style={{ color: "#cb2971", width: "12%", height: "30%" }}
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
                height: "7rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link to="/home" style={{ textDecoration: "none" }}>
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
          <CustomCard
            padding="15px"
            height="200px"
            boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
            width="30%"
          >
            <div
              className="project-cart"
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                marginLeft: "2rem",
                width: "16rem",
                height: "7rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link to="/deviceAssign" style={{ textDecoration: "none" }}>
                <div className="d-flex" style={{ gap: "2rem" }}>
                  <img
                    src={deviceAssign}
                    style={{ height: "3rem" }}
                    alt="deviceAssign"
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
                        Device Assign
                      </h6>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </CustomCard>
        </Col>
        <Col
          xl={4}
          lg={4}
          md={6}
          sm={6}
          style={{
            marginLeft: "6rem",
            paddingTop: "6rem",
            display: "flex",
            gap: "3rem",
            width: "100%",
          }}
        >
          <div className="chart_container">
            <div className="line_chart">
              <div className="upper_div">
                <div className="graph_heading">
                  <h6
                    style={{ color: "rgb(112, 112, 112)", fontSize: "1.4rem" }}
                  >
                    TOTAL DEVICES
                  </h6>
                  <select className="select_details">
                    <option value="volvo">Weekly</option>
                    <option value="saab">Monthly</option>
                  </select>
                </div>
                <span>{totalCounts}</span>
              </div>
              <LineChart chartData={data} className="lineChart_data" />
            </div>
            <div className="line_chart">
              <div className="upper_div">
                <div className="graph_heading">
                  <h6
                    style={{ color: "rgb(112, 112, 112)", fontSize: "1.4rem" }}
                  >
                    TOTAL ACTIVE DEVICES
                  </h6>
                  <select className="select_details">
                    <option value="volvo">Weekly</option>
                    <option value="saab">Monthly</option>
                  </select>
                </div>
                <span>{totalCounts}</span>
              </div>
              <LineChart chartData={data} className="lineChart_data" />
            </div>
          </div>
        </Col>
      </>
    </>
  );
};

export default AdminDashboard;
