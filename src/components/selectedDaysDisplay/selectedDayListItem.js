import React from "react";
/// lodash
import _ from "lodash";
//// materil ui
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = themes => ({
  root: {
    margin: 10
  }
});

const renderPlaceAndReason = smokes => {
  return _.map(smokes, smoke => (
    <div key={smoke.id}>
      place: {smoke.place} reason: {smoke.reason}
    </div>
  ));
};

const selectedDayListItem = ({ day, classes }) => {
  return (
    <Paper className={classes.root}>
      <ListItem>
        <ListItemText>
          date: {day.day}
          <br />
          number of smokes: {day.smokes.length}
          <br />
          {renderPlaceAndReason(day.smokes)}
        </ListItemText>
      </ListItem>
    </Paper>
  );
};

export default withStyles(styles)(selectedDayListItem);
