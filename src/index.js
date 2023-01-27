import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./scss/style.scss";

ReactDOM.render(
  // App 컴포넌트를 BrowserRouter로 감싸서
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
