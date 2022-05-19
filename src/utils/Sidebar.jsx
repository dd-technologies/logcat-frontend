import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/images/DDTECH.png";
import Logcat from "../assets/images/lgnewsmall.png";
import LogcatLarge from "../assets/images/logcarLarge.svg";
import settigns from "../assets/icons/settings.png";
import Analytics from "../assets/icons/analyticIcon.png";

import Log from "../assets/icons/log.png";

import Style from "./Sidebar.module.css";
import { ThemeContext, sideMenus } from "./ThemeContext";
import AlarmIcon from "../assets/images/AlarmIcon.png";

function SideBar(props) {
  const { sidebarDetails } = props;
  let { sideMenu } = React.useContext(ThemeContext);

  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;

  const [sideBar, setSideBar] = useState(false);

  // URL STRING
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const logURLName = urlParams.get("pagename") || "";

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
              <section
                className={
                  sideMenu === "sidebar"
                    ? `noSideBarLogcatLogo`
                    : `${Style.LogcatLogo}`
                }
              >
                {sideMenu == "sidebar" ? (
                  <Image src={Logcat} alt="logcat" />
                ) : (
                  <Image src={LogcatLarge} alt="logcat" />
                )}
              </section>
            </Link>
          </section>

          <section className={Style.linkSection}>
            {/* LINK FIRST  */}

            <section className={Style.navMenuIcons}>
              <section
                className={
                  logURLName.includes("logpage") ||
                  logURLName.includes("analytics")
                    ? `${Style.linkActive} `
                    : `${Style.linkInActive} `
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
                  <Image
                    src={logURLName.includes("analytics") ? Analytics : Log}
                    width="18"
                    height="18"
                  />
                  <section className="hidelinkName">
                    {sidebarDetails.link1.linkName}
                  </section>
                </Link>
              </section>

              {/* LINK SECOND  */}
              {adminInfo && adminInfo.data && adminInfo.data.isSuperAdmin && (
                <>
                  {url.pathname == "/update" ? (
                    <></>
                  ) : (
                    <section
                      className={
                        logURLName.includes("settings")
                          ? `${Style.linkActive} `
                          : `${Style.linkInActive} `
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
                        <Image src={settigns} width="18" height="18" />
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
                  <section
                    className={
                      logURLName.includes("alarm")
                        ? `${Style.linkActive} `
                        : `${Style.linkInActive} `
                    }
                  >
                    <Link
                      className={`${Style.linkData} noSideBarLink`}
                      to={sidebarDetails.link3 && sidebarDetails.link3.link}
                    >
                      <Image src={AlarmIcon} width="20" height="20" />
                      <section className="hidelinkName">Alerts</section>
                    </Link>
                  </section>
                </>
              )}
            </section>
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

export default SideBar;
