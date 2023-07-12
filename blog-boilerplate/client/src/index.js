import React from "react";
import ReactDom from "react-dom/client";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

const root = ReactDom.createRoot(document.querySelector("#root"));
root.render(<App />);
