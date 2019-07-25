
import { SELECT_DAYS } from "../actions/actionTypes";

export const selectedDaysId = (state = [], action) => {
  switch (action.type) {
    case SELECT_DAYS:
      return [...action.payload];

    default:
      return state;
  }
};

