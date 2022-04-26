import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { MakeServer } from "./api";

const environment = process.env.NODE_ENV;

if (environment !== "production") {
  MakeServer({ environment });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

/**
 * https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow
 */
