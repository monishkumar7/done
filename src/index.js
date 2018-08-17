import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "./index.css";
import App from "./containers/App/App";
import registerServiceWorker from "./registerServiceWorker";

import authReducer from "./store/reducers/auth";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  authReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7b1fa2"
    },
    secondary: {
      main: "#ffea00"
    }
  },
  typography: {
    fontFamily: ["Cabin", "sans-serif"].join(",")
  }
});

const app = (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Fragment>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Fragment>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
