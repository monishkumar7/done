import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Auth from "../Auth/Auth";
import ToDos from "../ToDos/ToDos";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/todos" exact component={ToDos} />
        <Route path="/" exact component={Auth} />
      </Switch>
    );
  }
}

export default App;
