import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import client from "./GraphQl/Apollo/ApolloClient";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");

if (!container) {
  throw new Error('Element with id "root" not found in the document.');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);

reportWebVitals();
