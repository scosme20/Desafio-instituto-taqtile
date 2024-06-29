import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, client } from "./GraphQl/Apollo/ApolloClient";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
