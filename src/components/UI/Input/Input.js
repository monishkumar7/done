import React from "react";

import classes from "./Input.css";

const input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.shouldValidate && props.touched && props.invalid)
    inputClasses.push(classes.Invalid);

  switch (props.elementType) {
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
          {...props.elementConfig}
        />
      );
  }

  return (
    <div>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
