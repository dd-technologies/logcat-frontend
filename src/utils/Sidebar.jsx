import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/images/DDTECH.png";
import Logcat_small from "../assets/images/lgnewsmall.png";
import LogcatLarge from "../assets/images/LgLargeIcon.png";
import settigns from "../assets/icons/settings.png";
import Analytics from "../assets/icons/analyticIcon.png";

import Log from "../assets/icons/log.png";

import Style from "./Sidebar.module.css";
import { ThemeContext, sideMenus } from "./ThemeContext";
import AlarmIcon from "../assets/images/AlarmIcon.png";

function SideBar(props) {
  const { sidebar_details } = props;
  let { sideMenu } = React.useContext(ThemeContext);

  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;

  const [sideBar, setSideBar] = useState(false);

  // URL STRING
  var url_string = window.location.href;
  var url = new URL(url_string);
  // console.log("url", url.href.includes("update"));

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
                  sideMenu == "sidebar"
                    ? `noSideBarLogcatLogo`
                    : `${Style.LogcatLogo}`
                }
              >
                {sideMenu == "sidebar" ? (
                  <Image src={Logcat_small} alt="logcat" />
                ) : (
                  <Image src={LogcatLarge} alt="logcat" />
                )}
              </section>
            </Link>
          </section>

          <section className={Style.linkSection}>
            {!url.href.includes("update")  && (
              <section className={Style.navMenuIcons}>
                <section
                  className={
                    url.href.includes("log_table") ||
                    url.href.includes("analytics")
                      ? `${Style.linkActive} `
                      : `${Style.linkInActive} `
                  }
                >
                  <Link
                    className={`${Style.linkData} noSideBarLink`}
                    to={
                      sidebar_details.link1 &&
                      sidebar_details.link1.link &&
                      sidebar_details.link1.link.length == 0
                        ? ""
                        : sidebar_details.link1.link
                    }
                  >
                    <Image
                      src={url.href.includes("analytics") ? Analytics : Log}
                      width="18"
                      height="18"
                    />
                    <section className="hidelinkName">
                      {sidebar_details.link1.linkName}
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
                          url.href.includes("settings")
                            ? `${Style.linkActive} `
                            : `${Style.linkInActive} `
                        }
                      >
                        <Link
                          className={`${Style.linkData} noSideBarLink`}
                          to={
                            sidebar_details.link2 &&
                            sidebar_details.link2.link &&
                            sidebar_details.link2.link.length == 0
                              ? ""
                              : sidebar_details.link2.link
                          }
                        >
                          <Image src={settigns} width="18" height="18" />
                          <section className="hidelinkName">
                            {sidebar_details.link2.linkName}
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
                        url.href.includes("alarm")
                          ? `${Style.linkActive} `
                          : `${Style.linkInActive} `
                      }
                    >
                      <Link
                        className={`${Style.linkData} noSideBarLink`}
                        to={sidebar_details.link3 && sidebar_details.link3.link}
                      >
                        <Image src={AlarmIcon} width="20" height="20" />
                        <section className="hidelinkName">Alerts</section>
                      </Link>
                    </section>
                  </>
                )}
              </section>
            )}

            {/* LINK FIRST  */}
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
