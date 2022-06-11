import React from "react";
import CustomCard from "../../container/CustomCard";
import { Col, Image } from "react-bootstrap";
import Style from "./Allprojects.module.css";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../utils/ThemeContext";
import "../../utils/Theme.css";
import DateIcons from "../../assets/icons/date.png";

const Allprojects = (props) => {
  // console.log("props", props);

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
                  to={`/log_table?code=${props.data.code}&name=${
                    props.data.name
                  }&page-name=logpage&projectType=${
                    props.data &&
                    props.data.device_types &&
                    props.data.device_types[0] &&
                    props.data.device_types[0].typeCode
                  }`}
                  style={{ textDecoration: "none" }}
                >
                  <section className={Style.Outer_InfoRow}>
                    <section className={Style.InfoColumn}>
                      <h5
                        className="cpactiveText mb-1"
                        style={{ fontWeight: "600" }}
                      >
                        {props.data.name}
                      </h5>
                      <p
                        className={
                          theme == "light-theme" ? null : "darkModeColor"
                        }
                      >
                        {props.data.description && props.data.description}
                      </p>
                    </section>
                    <section className={Style.InfoDetails}>
                      <Image src={DateIcons} />
                      <p
                        className="darkModeColor"
                        style={{
                          opacity: "70%",
                        }}
                      >
                        {newDate}
                      </p>
                    </section>
                  </section>
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
