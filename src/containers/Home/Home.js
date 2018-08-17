import React, { Fragment } from "react";
import { Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  testGrid: {
    textAlign: "center"
  },
  leftPane: {
    textAlign: "left"
  },
  rightPane: {
    textAlign: "right"
  },
  centerPane: {
    textAlign: "center"
  }
};

const home = props => {
  return (
    <Fragment>
      <Grid container justify="center">
        <Grid item xs={12} className={props.classes.testGrid}>
          <Typography variant="headline">Welcome to Done app</Typography>
        </Grid>
        <Grid item xs className={props.classes.leftPane}>
          This is the left Pane
        </Grid>
        <Grid item xs className={props.classes.centerPane}>
          This is the center Pane
        </Grid>
        <Grid item xs className={props.classes.rightPane}>
          This is the right Pane
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(home);
