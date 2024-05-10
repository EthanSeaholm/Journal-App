import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

/**
 * Entry point for the React application. It bootstraps and renders the root component.
 * StrictMode is used to catch potential erorrs during development, but it will not be present in production.
 */

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
