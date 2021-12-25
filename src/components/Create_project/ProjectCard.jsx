import React from 'react'
import CustomCard from "../../Container/CustomCard";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeBranch,
  faPlus,
  faCity,
  faHome,
  faUserAlt
} from "@fortawesome/free-solid-svg-icons";
import Style from "./CreateProject.module.scss";
import { Link } from 'react-router-dom';

const ProjectCard = (props) => {
    return (
        <Col xl={4} lg={4} md={6} sm={6} className="mt-4">
            <CustomCard padding="10px">
            <Link
              to={`/logtable?code=${props.data.code}&name=${props.data.name} `}>
              <Row>
                <Col xl={12} className={Style.InfoColumn}>
                  <h4>{props.data.name}</h4>
                  <p>{props.data.description && props.data.description}</p>
                </Col>
                <Col xl={12} className={Style.InfoDetails}>
                  <p>
                    <FontAwesomeIcon icon={faCodeBranch} />
                  </p>
                  <p>
                    <span>
                      <FontAwesomeIcon icon={faCity} />
                    </span>
                    agvaadvanced.com
                  </p>
                </Col>
              </Row>
              </Link>
            </CustomCard>
          </Col>
    )
}

export default ProjectCard
