import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Protected({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("ddAdminToken");
  return isAuthenticated ? <Outlet/> : <Navigate to="/" />;
}

export default Protected;