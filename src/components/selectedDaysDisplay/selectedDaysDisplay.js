import React from "react";
/// materil ui
import List from "@material-ui/core/List";
//// lodash
import _ from "lodash";
/// project files
import SelectedDayListItem from "./selectedDayListItem";

const renderList = days => {
  return _.map(days, day => <SelectedDayListItem day={day} key={day.id} />);
};

const selectedDaysDisplay = ({ days }) => {
  return <List>{renderList(days)}</List>;
};

export default selectedDaysDisplay;
