import React, { useState, useEffect } from "react";
import { ThemeContext, themes } from "./ThemeContext";

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(themes.dark);

  function changeTheme(theme) {
    setTheme(theme);
  }

  // console.log("first 12", document.body);

  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.body.classList.add("dark-content");
        break;
      case themes.dark:
      default:
        document.body.classList.remove("dark-content");
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
