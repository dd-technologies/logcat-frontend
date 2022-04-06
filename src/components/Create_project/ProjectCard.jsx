import React from "react";
import CustomCard from "../../Container/CustomCard";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Style from "./ProductCard.module.scss";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../utils/ThemeContext";
import "../../utils/Theme.scss";

const ProjectCard = (props) => {
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
                  to={`/logtable?code=${props.data.code}&name=${props.data.name}&pagename=logpage `}
                  style={{ textDecoration: "none" }}
                >
                  <section className={Style.Outer_InfoRow}>
                    <section className={Style.InfoColumn}>
                      <h5 className="cpactiveText">{props.data.name}</h5>
                      <p className="CPp">
                        {props.data.description && props.data.description}
                      </p>
                    </section>
                    <section className={Style.InfoDetails}>
                      <p
                        className="CPp"
                        style={{
                          opacity: "70%",
                        }}
                      >
                        <span>
                          <FontAwesomeIcon icon={faCalendar} />
                        </span>
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

export default ProjectCard;
