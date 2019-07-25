//// project files
import { ADD_DAY, EDIT_DAY, GET_DAYS, SELECT_DAYS } from "./actionTypes";
import axios from "../API/axiosApi";

//////////////////////////////
export const deleteDay = selectedRows => async dispatch => {
  const request = await Promise.all(
    selectedRows.map(row => axios.delete(`days/${row}`))
  );
  dispatch(fetchDays());
};
//////////////////////////////////
export const editDay = values => async dispatch => {
  const { day, targetNumberOfSmokes, smokes } = values;
  const data = {
    day,
    targetNumberOfSmokes: parseInt(targetNumberOfSmokes),
    smokes
  };
  await axios({
    url: `days/${values.selectedRowToEdit.id}`,
    method: "put",
    data: data
  });

  dispatch({
    type: EDIT_DAY,
    payload: { ...values, targetNumberOfSmokes: parseInt(targetNumberOfSmokes) }
  });
};

////////////////////////////////////
export const addDay = values => async dispatch => {
  const { day, targetNumberOfSmokes, smokes } = values;
  const data = {
    day,
    targetNumberOfSmokes: parseInt(targetNumberOfSmokes),
    smokes
  };
  const response = await axios({
    url: "days",
    method: "post",
    data: data
  });

  dispatch({
    type: ADD_DAY,
    payload: response.data
  });
};
//////////////////////////////////
export const fetchDays = () => async dispatch => {
  const response = await axios.get("days");
  dispatch({ type: GET_DAYS, payload: response.data });
};
//////////////////
export const selectDay = selectedDaysID => {
  return { type: SELECT_DAYS, payload: selectedDaysID };
};
