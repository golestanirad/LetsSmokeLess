//////// project files
import {
  DELETE_DAY,
  ADD_DAY,
  EDIT_DAY,
  GET_DAYS
} from "../actions/actionTypes";

const initialState = [];

export const days = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_DAY:
      const newData = state.filter(d => {
        if (!action.payload.includes(d.id)) {
          return d;
        }
      });
      return newData;
    case ADD_DAY:
      return [...state, action.payload];
    case EDIT_DAY:  
      const {
        selectedRowToEdit,
        day,
        targetNumberOfSmokes,
        smokes
      } = action.payload;
      const newState = state.map(d =>
        d.id === selectedRowToEdit.id
          ? {
              day,
              targetNumberOfSmokes,
              id: selectedRowToEdit.id,
              smokes
            }
          : d
      );

      return [...newState];
    case GET_DAYS:
      return [...action.payload];
    default:
      return state;
  }
};
