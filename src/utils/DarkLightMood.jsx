import React, { useState } from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Style from "./DarkLightMood.module.scss";
import { ThemeContext, themes } from "./ThemeContext";

export default function DarkLightMood() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <section className={Style.Outer_section}>
      <section>
        {/*className={darkMood ? Style.darkMood_outer : null}*/}
        <ThemeContext.Consumer>
          {({ changeTheme }) => (
            <FontAwesomeIcon
              icon={!darkMode ? faMoon : faSun}
              size="md"
              onClick={() => {
                setDarkMode(!darkMode);
                changeTheme(darkMode ? themes.light : themes.dark);
              }}
              color={darkMode ? "#0099a4" : "#0099a4"}
            />
          )}
        </ThemeContext.Consumer>
      </section>
    </section>
  );
}
