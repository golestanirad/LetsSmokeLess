import axios from "axios";

export const testAction = () => async dispatch => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  dispatch({
    type: "TEST",
    payload: response.data
  });
};
