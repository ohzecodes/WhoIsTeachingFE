import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app";
import "./index.scss";

import { Provider } from "react-redux";
// import {TimeRange} from "./components/timerange.ts";

import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import rootReducer from "./store/reducers/rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat(thunk)
});

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
