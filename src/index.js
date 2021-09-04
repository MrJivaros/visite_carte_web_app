import React from "react";
import ReactDOM from "react-dom";
import "./styles/bootstrap.min.css";
import "./styles/index.css";
import App from "./components/App";
import Register from "./screens/Register"
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
