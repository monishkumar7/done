import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";

import Header from "../../components/Layout/Header/Header";

const styles = {};

class Layout extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        {this.props.children}
      </Fragment>
    );
  }
}

export default withStyles(styles)(Layout);
