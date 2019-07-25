import { createSelector } from "reselect";
import _ from "lodash";
const selectedDaysIdSelector = state => state.selectedDaysId;
const daysSelector = state => state.data;

const getSelectedDays = (selectedDaysId, days) => {
  const selectedDays = _.filter(days, day => selectedDaysId.includes(day.id));
  return selectedDays;
};

export default createSelector(
  selectedDaysIdSelector,
  daysSelector,
  getSelectedDays
);
