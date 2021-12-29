import React from "react";
import CustomCard from "../../Container/CustomCard";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch, faCalendar } from "@fortawesome/free-solid-svg-icons";
import Style from "./ProductCard.module.scss";
import { Link } from "react-router-dom";

const ProjectCard = (props) => {
  // console.log("props project", props);

  let newDate = props.data.createdAt.split("T")[0];
  let year = newDate.split("-")[0];
  let month = newDate.split("-")[1];
  let day = newDate.split("-")[2];
  newDate = `${day}-${month}-${year}`;
  // console.log("year", `${day} ${month} ${year}`);

  return (
    <Col xl={4} lg={4} md={6} sm={6} className="mt-4">
      <CustomCard padding="15px" height="200px">
        <Link
          to={`/logtable?code=${props.data.code}&name=${props.data.name} `}
          style={{ textDecoration: "none" }}
        >
          <Row>
            <Col xl={12} className={Style.InfoColumn}>
              <h4>{props.data.name}</h4>
              <p>{props.data.description && props.data.description}</p>
            </Col>
            <Col xl={12} className={Style.InfoDetails}>
              <p>
                <span>
                  <FontAwesomeIcon icon={faCalendar} />
                </span>
                {newDate}
              </p>
            </Col>
          </Row>
        </Link>
      </CustomCard>
    </Col>
  );
};

export default ProjectCard;
