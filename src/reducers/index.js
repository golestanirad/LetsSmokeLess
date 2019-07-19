import { combineReducers } from "redux";

//// project fiels
import { testReducer } from "./testReducer";
import { days } from "./dataReducer";

const rootReducer = combineReducers({
  test: testReducer,
  data: days
});

export default rootReducer;
