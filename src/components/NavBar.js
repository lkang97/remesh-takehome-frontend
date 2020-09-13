import React from "react";

// Material UI Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

// Material UI Styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  title: {
    display: "flex",
    justifySelf: "center",
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "center" }}>
          <Typography className={classes.title} variant="h6">
            Remesh Take-Home
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
