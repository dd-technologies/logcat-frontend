import React, { useState, useEffect } from "react";
import { ThemeContext, themes, sidebarTheme } from "./ThemeContext";

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(themes.dark);
  const [sidebar, setSideBar] = useState(sidebarTheme.sidebarVisibility);

  // change theme
  function changeTheme(theme) {
    setTheme(theme);
  }

  // change sidebar
  function sidebarTheme(sideBar) {
    setSideBar(sideBar);
  }

  // console.log("first 12", document.body);

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

  // SIDEBAR CHANGE
  useEffect(() => {
    switch (sidebar) {
      case sidebarTheme.sidebarVisibility:
        document.body.classList.add("sidebar");
        break;
      case themes.noSideBar:
      default:
        document.body.classList.remove("sidebar");
        break;
    }
  }, [sidebar]);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        changeTheme: changeTheme,
        sidebarTheme: sidebarTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
