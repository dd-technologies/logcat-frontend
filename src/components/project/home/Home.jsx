import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import MainNav from "../../navbar/Nav/MainNav";
import SideNav from "../../navbar/Sidebar/SideNav";
import Style from "./Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faFilter,
  faQuestion,
  faCalendar,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import "../../../css/theme.scss";

export default function Home() {
  return (
    <>
      {/*navbar  */}
      <Row>
        <Col xl={2} lg={2} sm={2}>
          <SideNav />
        </Col>

        {/* withNavbarRow */}
        <Col xl={10} lg={10} sm={10}>
          <MainNav />

          {/* homecomponents */}
          <Container>
            <Row className="mt-4">
              <Col xl={12} className={Style.filterWithDate}>
                <section className={Style.filterGraphFirstSction}>
                  <FontAwesomeIcon icon={faFilter} />
                </section>
                <section className={Style.filterwithDate}>
                  <FontAwesomeIcon icon={faCalendar} />
                  <input className="dateinput" type="date" />
                </section>
              </Col>
            </Row>

            {/* data chart and informantions */}
            <Row className="mt-3">
              {/*toggle menus  */}
              <Col xl={5}>
                <Card className={Style.DeviceGraphOuter}>
                  <Row className="p-3">
                    <Col xl={12} className={Style.Statics}>
                      <h5>Crash free Statics</h5>
                      <section className={Style.StaticsSection}>
                        <p>Crash free users</p>
                        <section>
                          <FontAwesomeIcon icon={faQuestion} />
                        </section>
                      </section>
                      <h4>86.21%</h4>
                    </Col>
                    <Col xl={12}>
                      <p>*Graph*</p>
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col xl={7}>
                <Card className={Style.DeviceGraphOuter}>
                  <Row className="p-3">
                    <Col xl={12} className={Style.Trand}>
                      <h5> Trands</h5>
                      <p>
                        <span className="p-2">
                          <FontAwesomeIcon icon={faRocket} />
                        </span>
                        Letest Release
                      </p>
                    </Col>
                    <Col xl={12} className={Style.TrandsDataTable}>
                      <section className={Style.Outsection}>
                        <section>
                          <p>Crashes</p>
                          <h3>3</h3>
                          <p>-40%</p>
                        </section>
                        <section>
                          <p>Users</p>
                          <h3>0</h3>
                          <p>0%</p>
                        </section>
                      </section>
                      <section className={Style.Outsection}>
                        <section>
                          <p>Non-fatals</p>
                          <h3>0</h3>
                        </section>
                        <section>
                          <p>Users</p>
                          <p>0</p>
                        </section>
                      </section>
                      <section className={Style.Outsection}>
                        <section>
                          <p>
                            Arns <span>*icons</span>
                          </p>
                          <h3>0</h3>
                        </section>
                        <section>
                          <p>Users</p>
                          <h3>0</h3>
                        </section>
                      </section>
                    </Col>
                    <Col>
                      <p>*grahp*</p>
                    </Col>
                  </Row>
                </Card>
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
            <Row className="p-3">
              <Card className={Style.DeviceGraphOuter}>
                {/* search and filter functionallty */}
                <Col className={`${Style.filterFunctionalty} p-3`}>
                  <p>
                    <FontAwesomeIcon icon={faFilter} />
                  </p>

                  <section>
                    <input
                      type="text"
                      className="m-3"
                      placeholder="Search issues titles, subtitles or keys"
                    />
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </section>
                </Col>

                {/* table data */}
                <Col></Col>
              </Card>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
}
