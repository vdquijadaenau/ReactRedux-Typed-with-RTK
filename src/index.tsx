import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { MakeServer } from "./api";

const environment = process.env.NODE_ENV;

if (environment !== "production") {
  MakeServer({ environment });
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow
 */
