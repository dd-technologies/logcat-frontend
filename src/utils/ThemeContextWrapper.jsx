import React, { useState, useEffect } from "react";
import { ThemeContext, themes } from "./ThemeContext";
import { sideMenus } from "./ThemeContext";

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(themes.dark);
  const [sideMenu, setSideMenu] = useState(sideMenus.menuShow);

  // change theme to dark

  function changeTheme(theme) {
    setTheme(theme);
  }

  useEffect(() => {
    switch (theme) {
      case themes.dark:
        document.body.classList.add("dark-content");
        break;
      case themes.light:
      default:
        document.body.classList.remove("dark-content");
        break;
    }
  }, [theme]);

  // change sidebar
  function changeSideMenu(sideMenu) {
    setSideMenu(sideMenu);
  }
  useEffect(() => {
    switch (sideMenu) {
      case sideMenus.menuShow:
        document.body.classList.add("sidebar");
        break;
      case sideMenus.menuHide:
      default:
        document.body.classList.remove("sidebar");
        break;
    }
  }, [sideMenu]);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        changeTheme: changeTheme,
        // sidemenu
        sideMenu: sideMenu,
        changeSideMenu: changeSideMenu,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
