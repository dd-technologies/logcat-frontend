import React from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/images/DDTECH.png";
import Logcat from "../assets/images/lgnewsmall.png";
import LogcatLarge from "../assets/images/logcarLarge.svg";
import settigns from "../assets/icons/settings.png";
import Style from "./Sidebar.module.scss";

export function SideBar(props) {
  const { sidebarDetails } = props;

  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  // const [navToggle, setNavToggle] = useState(true);
  const { loading, adminInfo } = adminLoginReducer;

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
      <section className={Style.Sidebar}>
        <section className={Style.LogoSection}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <section>
              {true ? (
                <Image src={Logcat} alt="logcat" />
              ) : (
                <Image
                  className={Style.logologcat}
                  src={LogcatLarge}
                  alt="logcat"
                />
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
                  ? `${Style.linkActive}`
                  : `${Style.linkInActive} `
              }
            >
              <Link
                className={Style.linkData}
                to={
                  sidebarDetails.link1 &&
                  sidebarDetails.link1.link &&
                  sidebarDetails.link1.link.length === 0
                    ? ""
                    : sidebarDetails.link1.link
                }
              >
                <Image src={sidebarDetails.link1.iconName} />
                <section>{sidebarDetails.link1.linkName}</section>
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
                      ? `${Style.linkActive}`
                      : `${Style.linkInActive} `
                  }
                >
                  <Link
                    className={Style.linkData}
                    to={
                      sidebarDetails.link2 &&
                      sidebarDetails.link2.link &&
                      sidebarDetails.link2.link.length === 0
                        ? ""
                        : sidebarDetails.link2.link
                    }
                  >
                    <Image src={settigns} />
                    <section>{sidebarDetails.link2.linkName}</section>
                  </Link>
                </section>
              )}
            </>
          )}
        </section>
        <section className={Style.ClickSlideSection}></section>

        <section className={Style.ComponyLogo}>
          <Image src={logo} />
          <p>Technologies</p>
        </section>
      </section>
    </>
  );
}
