/* eslint-disable */

import React from "react";
import CustomCard from "../../container/CustomCard";
import { Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../utils/ThemeContext";
import agvaVenti from "../../assets/images/AgVaCrop.png";

const Allprojects = (props) => {
  const { theme } = React.useContext(ThemeContext);
  let newDate = props.data.createdAt.split("T")[0];
  let year = newDate.split("-")[0];
  let month = newDate.split("-")[1];
  let day = newDate.split("-")[2];
  newDate = `${day}-${month}-${year}`;
  return (
    <>
      <ThemeContext.Consumer> 
        {(value) => (
          <>
            <Col xl={4} lg={4} md={6} sm={6} className="mt-4">
              <CustomCard
                padding="15px"
                height="200px"
                boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
              >
                <Link
                 to={`/device?code=${props.data.code}&name=${props.data.name}`}
                  style={{ textDecoration: "none" }}
                >
                    <div
              className="project-cart"
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "5px",
                marginLeft: "2rem",
                width: "25rem",
                height: "15rem",
              }}
            >
                <div className="d-flex" style={{ gap: "5rem" }}>
                  <img
                    src={agvaVenti}
                    style={{ height: "12rem" }}
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
                      <h6 style={{ color: "#707070", fontSize: "1.5rem" }}>
                      Ventilator
                      </h6>
                    </div>
                  </div>
                </div>
                </div>
                </Link>
              </CustomCard>
            </Col>
          </>
        )}
      </ThemeContext.Consumer>
    </>
  );
};

export default Allprojects;
