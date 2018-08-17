import React from "react";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  active: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  },
  links: {
    display: "inline"
  },
  linkText: {
    textDecoration: "none",
    padding: "20px"
  }
});

const NavigationItem = props => (
  <li className={props.classes.links}>
    <NavLink
      to={props.link}
      exact={props.exact}
      className={props.classes.linkText}
      activeClassName={props.classes.active}
    >
      {props.children}
    </NavLink>
  </li>
);

export default withStyles(styles)(NavigationItem);
