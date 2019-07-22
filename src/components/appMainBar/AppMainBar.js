import React from "react";
/// materil UI
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
//////////  react router dom
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  button:{
    margin:10
  }
});

const AppMainBar = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Smoke Less :)
          </Typography>
          <Button className={classes.button} variant="outlined" color="inherit" component={Link} to="/">
            Table
          </Button>
          <Button className={classes.button} variant="outlined" color="inherit" component={Link} to="/newpage">
            Graph
          </Button>
          <Button className={classes.button} variant="outlined" onClick={props.handleAddDay} color="inherit">
            Add a Day
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(AppMainBar);
