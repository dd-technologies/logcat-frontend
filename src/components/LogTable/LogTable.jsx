import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faCalendar,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import Style from "./LogTable.module.scss";
import { Navbar, SideBar } from "../../utils/NavSideBar";
import "../../css/theme.scss";
import CrashFreeStatics from "./components/CrashFreeStatics";
import TrandData from "./components/TrandData";
import CustomeDropDown from "../../Container/DropDown";
import TableData from "./components/TableData";

export default function LogTable() {
 

  // filter with crash free statics and trands
  const [dropDownShow, setDropDownShow] = useState(false);
  const [dateDropDwon, setDateDropDwon] = useState(false);

  const dropDownShowFun = () => {
    setDropDownShow(true);
    if (dropDownShow) {
      setDropDownShow(false);
    }
  };

  // filter crashfree statcis and trands with data filter
  const DateFilter = () => {
    setDateDropDwon(true);
    if (dateDropDwon) {
      setDateDropDwon(false);
    }
  };




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
                <section>
                  <section
                    className={Style.filterGraphFirstSction}
                    onClick={dropDownShowFun}
                  >
                    <FontAwesomeIcon icon={faFilter} />
                  </section>
                  {dropDownShow ? (
                    <CustomeDropDown
                      width="auto"
                      height="auto"
                      className="mt-2"
                    >
                      <input type="text" placeholder="please enter you key" />
                      <input
                        type="text"
                        placeholder="please enter you key"
                        className="mt-2"
                      />
                      <input
                        type="text"
                        placeholder="please enter you key"
                        className="mt-2"
                      />
                      <Button className="mt-2">Apply</Button>
                    </CustomeDropDown>
                  ) : null}
                </section>

                <section className={Style.filterwithDate}>
                  <section className={Style.datafilter} onClick={DateFilter}>
                    <FontAwesomeIcon icon={faCalendar} />
                    <p className="ms-2 p-1">Last 7 Days</p>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </section>
                  <section>
                    {dateDropDwon ? (
                      <CustomeDropDown>
                        <p className="mt-1">10 days</p>
                        <p className="mt-1">15 days</p>
                        <p className="mt-1">30 days</p>
                        <p className="mt-1">45 days</p>
                        <p className="mt-1">60 days</p>
                      </CustomeDropDown>
                    ) : null}
                  </section>
                </section>
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
              <Col>
                <TableData />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
}
