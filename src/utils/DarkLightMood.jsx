import React, { useState } from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Style from "./DarkLightMood.module.scss";
import { ThemeContext, themes } from "./ThemeContext";

export default function DarkLightMood() {
  const [darkMode, setDarkMode] = useState(themes.dark);

  return (
    <ThemeContext.Consumer>
      {({ changeTheme }) => (
        <section
          className={Style.Outer_section}
          onClick={() => {
            setDarkMode(!darkMode);
            changeTheme(darkMode ? themes.light : themes.dark);
            localStorage.setItem("mode", darkMode);
          }}
        >
          <section>
            {/*className={darkMood ? Style.darkMood_outer : null}*/}

            <FontAwesomeIcon
              icon={!darkMode ? faMoon : faSun}
              size="1x"
              color={darkMode ? "#0099a4" : "#0099a4"}
            />
          </section>
        </section>
      )}
    </ThemeContext.Consumer>
  );
}
