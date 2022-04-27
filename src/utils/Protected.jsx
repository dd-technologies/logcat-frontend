import React from "react";
import { Route, useNavigate, Navigate } from "react-router-dom";
// import { useNavigate } from "react-router";

const Protected = ({ component: Component, ...restOfProps }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("ddAdminToken");

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/" />
      }
    />
  );
};

export default Protected;
