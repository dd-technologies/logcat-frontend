import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/images/DDTECH.png";
import Logcat from "../assets/images/lgnewsmall.png";
import LogcatLarge from "../assets/images/logcarLarge.svg";
import settigns from "../assets/icons/settings.png";
import Style from "./Sidebar.module.scss";
import { ThemeContext, sideMenus } from "./ThemeContext";
import AlarmIcon from "../assets/images/AlarmIcon.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SideBar(props) {
  const { sidebarDetails } = props;

  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  // const [navToggle, setNavToggle] = useState(true);
  const { loading, adminInfo } = adminLoginReducer;

  const [sideBar, setSideBar] = useState(false);

  // URL STRING
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const settingUrl = urlParams.get("pagename") || "";
  const logURLName = urlParams.get("pagename") || "";
  // console.log("first", updatePage);

  var url_string = window.location.href;
  var url = new URL(url_string);

  return (
    <>
      <section className={`${Style.sidebarOuter} noSidebar`}>
        <section className={`${Style.Sidebar} noSidbarInner`}>
          <section className={`${Style.LogoSection} sidebarMenu`}>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <section className={`${Style.LogcatLogo} noSideBarLogcatLogo`}>
                {sideBar ? (
                  <Image src={LogcatLarge} alt="logcat" />
                ) : (
                  <Image src={Logcat} alt="logcat" />
                )}
              </section>
            </Link>
          </section>

          <section className={Style.linkSection}>
            {/* LINK FIRST  */}

            {url.pathname == "/update" || url.pathname == "/settings" ? (
              <></>
            ) : (
              <section
                className={
                  logURLName.includes("logpage") ||
                  logURLName.includes("analytics")
                    ? `${Style.linkActive} noSideBarLinkOuter`
                    : `${Style.linkInActive} noSideBarLinkOuter`
                }
              >
                <Link
                  className={`${Style.linkData} noSideBarLink`}
                  to={
                    sidebarDetails.link1 &&
                    sidebarDetails.link1.link &&
                    sidebarDetails.link1.link.length === 0
                      ? ""
                      : sidebarDetails.link1.link
                  }
                >
                  <Image src={sidebarDetails.link1.iconName} />
                  <section className="hidelinkName">
                    {sidebarDetails.link1.linkName}
                  </section>
                </Link>
              </section>
            )}

            {/* LINK SECOND  */}
            {adminInfo && adminInfo.data && adminInfo.data.isSuperAdmin && (
              <>
                {url.pathname == "/update" ? (
                  <></>
                ) : (
                  <section
                    className={
                      settingUrl.includes("settings")
                        ? `${Style.linkActive} noSideBarLinkOuter`
                        : `${Style.linkInActive} noSideBarLinkOuter`
                    }
                  >
                    <Link
                      className={`${Style.linkData} noSideBarLink`}
                      to={
                        sidebarDetails.link2 &&
                        sidebarDetails.link2.link &&
                        sidebarDetails.link2.link.length === 0
                          ? ""
                          : sidebarDetails.link2.link
                      }
                    >
                      <Image src={settigns} />
                      <section className="hidelinkName">
                        {sidebarDetails.link2.linkName}
                      </section>
                    </Link>
                  </section>
                )}
              </>
            )}

            {/* ALARM LINK  */}
            {adminInfo && adminInfo.data && adminInfo.data.isSuperAdmin && (
              <>
                {url.pathname == "/alarm" ? (
                  <></>
                ) : (
                  <section
                    className={
                      settingUrl.includes("alarm")
                        ? `${Style.linkActive} noSideBarLinkOuter`
                        : `${Style.linkInActive} noSideBarLinkOuter`
                    }
                  >
                    <Link
                      className={`${Style.linkData} noSideBarLink`}
                      to={
                        sidebarDetails.link3 &&
                        sidebarDetails.link3.link &&
                        sidebarDetails.link3.link.length === 0
                          ? ""
                          : sidebarDetails.link3.link
                      }
                    >
                     <Image src={AlarmIcon} width="25"/>
                      <section className="hidelinkName">
                        {sidebarDetails.link3.linkName}
                      </section>
                    </Link>
                  </section>
                )}
              </>
            )}
          </section>
          <ThemeContext.Consumer>
            {({ changeSideMenu }) => (
              <section
                className={Style.ClickSlideSection}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSideBar(!sideBar);
                  changeSideMenu(
                    sideBar ? sideMenus.menuShow : sideMenus.menuHide
                  );
                  // console.log("first", changeSidebar)
                }}
              ></section>
            )}
          </ThemeContext.Consumer>
          <section className={`${Style.ComponyLogo} componyLogo`}>
            <Image src={logo} />
            <p className="hideComponyName">Technologies</p>
          </section>
        </section>
      </section>
    </>
  );
}
