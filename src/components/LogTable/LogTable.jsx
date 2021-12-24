import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faFilter,
  faQuestion,
  faCalendar,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Style from "./LogTable.module.scss";
const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    products.push({
      id: id,
      name: "Item name " + id,
      price: 2100 + i,
    });
  }
}

addProducts(5);

export default function LogTable() {
  return (
    <>
      <Row>
        <Col>
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
                      className="m-3 p-3"
                      placeholder="Search issues titles, subtitles or keys"
                    />
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </section>
                </Col>

                {/* table data */}
                <Col>
                  <BootstrapTable data={products} pagination>
                    <TableHeaderColumn dataField="id" isKey={true}>
                      Product ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="name">
                      Product Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="price">
                      Product Price
                    </TableHeaderColumn>
                  </BootstrapTable>
                </Col>
              </Card>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
}
