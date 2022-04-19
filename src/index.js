import React from "react";
import ReactDOM from "react-dom";
// import App from "./components/App.jsx";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import store, { persistor } from "./redux/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeContextWrapper from "./utils/ThemeContextWrapper";

ReactDOM.render(
  <ThemeContextWrapper>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>{" "}
  </ThemeContextWrapper>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
