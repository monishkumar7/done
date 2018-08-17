import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import classes from "./Auth.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actionCreators from "../../store/actions";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address"
        },
        label: "Email Address",
        validation: {
          required: true
        },
        value: "",
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        validation: {
          required: true,
          minLength: 6
        },
        label: "Password",
        value: "",
        valid: false,
        touched: false
      }
    },
    isSignUp: false
  };

  componentDidMount = () => {
    this.props.onCheckAuthState();
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) isValid = value.trim() !== "" && isValid;
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;

    return isValid;
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        touched: true,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        )
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  signUpMode = () => {
    this.setState({ isSignUp: true });
  };

  signInMode = () => {
    this.setState({ isSignUp: false });
  };

  render() {
    const formElements = [];
    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElements.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        label={formElement.config.label}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    let authTitle = <h4>{this.state.isSignUp ? "Sign Up" : "Sign In"}</h4>;

    let authRedirect = null;
    if (this.props.auth) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    let switchModeText = (
      <div>
        {this.state.isSignUp ? (
          <p onClick={this.signInMode}>
            Already have an account with us? Please click here to sign in.
          </p>
        ) : (
          <p onClick={this.signUpMode}>
            New User? Please click here to create an account.
          </p>
        )}
      </div>
    );

    return (
      <div className={classes.Auth}>
        {authRedirect}
        <form className={classes.LoginForm} onSubmit={this.submitHandler}>
          {authTitle}
          {form}
          <Button btnType="Danger">
            {this.state.isSignUp ? "sign up" : "Sign In"}
          </Button>
          <br />
          {this.props.errorMsg}
          <br />
          {switchModeText}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMsg: state.errorMsg,
    authRedirectPath: state.authRedirectPath,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actionCreators.auth(email, password, isSignUp)),
    onCheckAuthState: () => dispatch(actionCreators.checkAuthState()),
    onSetRedirectPath: path =>
      dispatch(actionCreators.authSetRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
