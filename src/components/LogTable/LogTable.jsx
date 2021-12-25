import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faFilter } from "@fortawesome/free-solid-svg-icons";
import Style from "./LogTable.module.scss";
import { Navbar, SideBar } from "../../utils/NavSideBar";
import "../../css/theme.scss";
import CrashFreeStatics from "./components/CrashFreeStatics";
import TrandData from "./components/TrandData";
import CustomCard from "../../Container/CustomCard";
import { useDispatch, useSelector } from "react-redux";

export default function LogTable() {
  const dispatch = useDispatch();
  const getAllLogByCodeReducer = useSelector(
    (state) => state.getAllLogByCodeReducer
  );

  const {
    data: {
      data: { logs },
    },
  } = getAllLogByCodeReducer;
  console.log("getAllLogByCodeReducer", logs);

  return (
    <>
      <Row>
        <Col xl={2} lg={2} md={2} sm={2}>
          <SideBar />
        </Col>
        <Col xl={10} lg={10} md={10} sm={10}>
          <Navbar />

          {/* data inhere */}
          <Container style={{ marginTop: "9%", marginBottom: "5%" }}>
            <Row className="mt-4">
              <Col xl={12} className={Style.filterWithDate}>
                <section className={Style.filterGraphFirstSction}>
                  <FontAwesomeIcon icon={faFilter} />
                </section>
                <section className={Style.filterwithDate}></section>
              </Col>
            </Row>

            {/* data chart and informantions */}
            <Row className="mt-3">
              {/*toggle menus  */}
              <Col xl={5}>
                <CrashFreeStatics />
              </Col>

              <Col xl={7}>
                <TrandData />
              </Col>
            </Row>

            {/* Events  */}
            <Row className="mt-5">
              <Col xl={12} className={Style.issuesTable}>
                <p>Issues</p>
                <p className={Style.LinkActiveText}>Search By userId</p>
              </Col>
            </Row>

            {/* data table */}

            <Row className="mt-3">
              <CustomCard>
                {/* search and filter functionallty */}
                <Col className={`${Style.filterFunctionalty} p-3`}>
                  <p>
                    <FontAwesomeIcon icon={faFilter} />
                  </p>

                  <section>
                    <input
                      type="text"
                      className="m-3 p-3"
                      placeholder="Search issues titles, subtitles or keys"
                    />
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </section>
                </Col>

                {/* table data */}
                <Col></Col>
              </CustomCard>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
}
