import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import reducer from "./store";

const store = createStore(
  reducer,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose(
        applyMiddleware(/*swClientMiddleware as any*/),
        // @ts-ignore
        (window.__REDUX_DEVTOOLS_EXTENSION__ &&
          // @ts-ignore
          window.__REDUX_DEVTOOLS_EXTENSION__()) ||
          undefined
      )
    : applyMiddleware(/*swClientMiddleware as any*/)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
