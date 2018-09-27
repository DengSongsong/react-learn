import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducers from "./reducers";

// 异步解决
const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

// chrome调试工具
const reduxDevtools = window.devToolsExtension
  ? window.devToolsExtension()
  : f => f;

let store = createStore(
  rootReducers,
  compose(
    applyMiddleware(...middleware),
    reduxDevtools
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
