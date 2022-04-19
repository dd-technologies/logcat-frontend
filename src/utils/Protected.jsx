import React from 'react'
import { Route, useHistory, Redirect } from "react-router-dom";
// import { useHistory } from "react-router";

const Protected = ({ component:Component, ...restOfProps }) => {
  const history = useHistory();
  const isAuthenticated = localStorage.getItem("ddAdminToken");

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default Protected;
