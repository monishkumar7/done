import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import classes from "./ToDos.css";
import Button from "../../components/UI/Button/Button";
import * as actionCreators from "../../store/actions";

class ToDos extends Component {
  logoutClick = () => {
    this.props.onLogout();
  };

  render() {
    let authRedirect = null;
    if (!this.props.loggedIn) authRedirect = <Redirect to="/" />;
    return (
      <div className={classes.ToDos}>
        {authRedirect}
        <h4>List</h4>
        <Button btnType="Danger" clicked={this.logoutClick}>
          Logout
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actionCreators.logout())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDos);
