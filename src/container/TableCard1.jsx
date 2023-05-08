import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { themes } from "../utils/ThemeContext";
// import { themes } from "../utils/ThemeContext";
export default function TableCard1(props) {
  // dark mode state
  const darkMode = useState(
    JSON.parse(localStorage.getItem("darkMode"))
  )[0];
  return (
    <>
      <div className="shadow p-3 mb-5 "
        style={{
          backgroundColor: darkMode? "bg-black":"bg-white",
          // backgroundColor: themes== 'light-theme' ? '#000' : '#fff',
          width: props.width ? props.width : "100%",
          borderRadius: props.borderRadius ? props.borderRadius : "20px",
          padding: props.padding ? props.padding : "0px",
          position: props.position ? props.position : "relative",
          right: props.right ? props.right : "",
          boxShadow: props.boxShadow ? props.boxShadow : "",
          top: props.top ? props.top : "",
          // backgroundColor: darkMode ? "#fff" : null,
          boxShadow:"0px 5px 10px 0px rgba(0, 0, 0, 0.5)"
        }}
      >
        {props.children}
      </div>
    </>
  );
}