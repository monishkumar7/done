import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "../Layout/Layout";
import Auth from "../Auth/Auth";
import ToDos from "../ToDos/ToDos";
import Home from "../Home/Home";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Layout>
          <Switch>
            <Route path="/todos" exact component={ToDos} />
            <Route path="/login" exact component={Auth} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Layout>
      </Fragment>
    );
  }
}

export default App;
