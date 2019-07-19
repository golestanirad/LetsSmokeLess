import React from "react";
//////////////
import classNames from "classnames";
import PropTypes from "prop-types";
///////////// materil ui
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing()
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary,
    width: 300,
    display: "flex",
    justifyContent: "flex-end"
  },
  title: {
    flex: "0 0 auto"
  }
});

let DaysTableToolbar = props => {
  const { numSelected, classes } = props;
  const renderEditDeleteIcons = () => {
    if (numSelected === 1) {
      return (
        <div>
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={props.handleDeleteDay}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton aria-label="Edit" onClick={props.handleEditDay}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </div>
      );
    }
    if (numSelected > 0) {
      return (
        <Tooltip title="Delete">
          <IconButton aria-label="Delete" onClick={props.handleDeleteDay}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      );
    }

    return (
      <Tooltip title="Filter list">
        <IconButton aria-label="Filter list">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    );
  };
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Days
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>{renderEditDeleteIcons()}</div>
    </Toolbar>
  );
};

DaysTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

export default withStyles(toolbarStyles)(DaysTableToolbar);
