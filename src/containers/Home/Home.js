import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import classes from "./Home.css";
import * as actionCreators from "../../store/actions";
import Button from "../../components/UI/Button/Button";

class Home extends Component {
  componentDidMount = () => {
    this.props.checkAuthState();
  };

  loginClick = () => {
    this.props.history.push("/login");
  };

  render() {
    let redirect = null;
    if (this.props.redirectPath !== "/")
      redirect = <Redirect to={this.props.redirectPath} />;

    return (
      <div className={classes.Home}>
        {redirect}
        <h4>Welcome to Done App</h4>
        <Button btnType="Primary" clicked={this.loginClick}>
          Login
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    redirectPath: state.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRedirectPath: path => dispatch(actionCreators.authSetRedirectPath(path)),
    checkAuthState: () => dispatch(actionCreators.checkAuthState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
