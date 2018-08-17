import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Button from "../../components/UI/Button/Button";
import * as actionCreators from "../../store/actions";

const styles = theme => ({
  todos: {
    display: "block"
  }
});

class ToDos extends Component {
  logoutClick = () => {
    this.props.onLogout();
  };

  render() {
    let authRedirect = null;
    if (!this.props.auth) authRedirect = <Redirect to="/" />;
    return (
      <div className={this.props.classes.todos}>
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
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actionCreators.logout())
  };
};
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ToDos)
);
