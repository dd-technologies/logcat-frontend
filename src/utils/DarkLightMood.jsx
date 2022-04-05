import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Style from "./DarkLightMood.module.scss";

export default function DarkLightMood() {
  // dark mood state
  const [darkMood, setDarkMood] = useState(
    localStorage.getItem("darkMood")
      ? JSON.parse(localStorage.getItem("darkMood"))
      : false
  );
  const [ligthMood, setLigthMood] = useState(
    localStorage.getItem("darkMood")
      ? !JSON.parse(localStorage.getItem("darkMood"))
      : true
  );

  // setting mood
  const DarkLightMoodFun = () => {
    setDarkMood(true);
    localStorage.setItem("darkMood", true);
    setLigthMood(false);
  };

  //   light mood
  const LightMoodFun = () => {
    setLigthMood(true);
    localStorage.setItem("darkMood", false);
    setDarkMood(false);
  };

  return (
    <section className={Style.Outer_section}>
      <section className={darkMood ? Style.darkMood_outer : null}>
        <FontAwesomeIcon
          icon={faMoon}
          size="md"
          onClick={DarkLightMoodFun}
          color={ligthMood ? "#0099a4" : ""}
        />
      </section>
      <section className={ligthMood ? `${Style.lightMood_outer}` : null}>
        <FontAwesomeIcon
          icon={faSun}
          size="md"
          onClick={LightMoodFun}
          color={darkMood ? "#0099a4" : ""}
        />
      </section>
    </section>
  );
}
