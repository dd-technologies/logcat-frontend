import React, { useState } from "react";
import Style from "../css/DarkLightMood.module.css";
import { ThemeContext, themes } from "./ThemeContext";
import faSun from "../assets/icons/sunIcon.png";
import faMoon from "../assets/icons/faMoon.png";

import { Image } from "react-bootstrap";

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
          }}
        >

          <Image src={!darkMode ? faSun : faMoon} width="20px" />
        </section>
      )}
    </ThemeContext.Consumer>
  );
}
