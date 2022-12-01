import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "./assets/sass/elrond.css";
import "./i18n";
import 'antd/dist/antd.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graph.maiar.exchange/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
