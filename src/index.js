import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import ItemProvider from "./context/ItemContext";
import Amplify, { AuthModeStrategyType } from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure({
  ...awsconfig,
  DataStore: { authModeStrategyType: AuthModeStrategyType.MULTI_AUTH },
});

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ItemProvider>
        <App />
      </ItemProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
