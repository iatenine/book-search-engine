import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const apolloUri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/graphql"
    : "https://book-search-engine.herokuapp.com/graphql";

const client = new ApolloClient({
  uri: apolloUri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);
