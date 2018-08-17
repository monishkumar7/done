import React, { Component } from "react";
import { connect } from "react-redux";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import NavigationItems from "../../Navigation/NavigationItems/NavigationItems";

const styles = {
  headerToolbar: {
    justifyContent: "space-between"
  }
};

class Header extends Component {
  render() {
    return (
      <AppBar position="sticky">
        <Toolbar className={this.props.classes.headerToolbar}>
          <Typography variant="headline" color="inherit">
            Done App
          </Typography>
          <NavigationItems />
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default withStyles(styles)(connect(mapStateToProps)(Header));
