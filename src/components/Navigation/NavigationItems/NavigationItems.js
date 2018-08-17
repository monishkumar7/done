import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  navItems: {
    listStyle: "none"
  }
};

const NavigationItems = props => (
  <nav>
    <ul className={props.classes.navItems}>
      <NavigationItem link="/" exact>
        Home
      </NavigationItem>
      <NavigationItem link="/login">Login</NavigationItem>
    </ul>
  </nav>
);

export default withStyles(styles)(NavigationItems);
