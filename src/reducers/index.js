import { combineReducers } from "redux"; 
//// project fiels
import { days } from "./dataReducer";

const rootReducer = combineReducers({
  data: days
});

export default rootReducer;
