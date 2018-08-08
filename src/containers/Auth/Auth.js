import React, { Component } from "react";

import classes from "./Auth.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

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

    let formHeader = <h4>Sign In</h4>;
    if (this.state.isSignUp) formHeader = <h4>Sign Up</h4>;

    return (
      <div className={classes.Auth}>
        <form className={classes.LoginForm} onSubmit={this.submitHandler}>
          {formHeader}
          {form}
          <Button btnType="Danger">Submit</Button>
        </form>
      </div>
    );
  }
}

export default Auth;
