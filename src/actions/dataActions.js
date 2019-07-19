import axios from "axios";
//// project files
import { ADD_DAY, EDIT_DAY, GET_DAYS } from "./actionTypes";

//////////////////////////////
export const deleteDay = selectedRows => async dispatch => {
  const request = await axios.all(
    selectedRows.map(row => axios.delete(`http://localhost:3001/days/${row}`))
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
    url: `http://localhost:3001/days/${values.selectedRowToEdit.id}`,
    method: "put",
    data: data
  });
  console.log(123123321, values);
  dispatch({ type: EDIT_DAY, payload: {...values,targetNumberOfSmokes: parseInt(targetNumberOfSmokes)} });
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
    url: "http://localhost:3001/days",
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
  const response = await axios.get("http://localhost:3001/days");

  dispatch({ type: GET_DAYS, payload: response.data });
};
