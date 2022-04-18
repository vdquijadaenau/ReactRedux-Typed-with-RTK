import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import "./api/server";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

/**
 * https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow
 */
