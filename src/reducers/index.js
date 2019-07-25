import { combineReducers } from "redux"; 
//// project fiels
import { days } from "./dataReducer";
import { selectedDaysId } from './selectedDaysId';


const rootReducer = combineReducers({
  data: days,
  selectedDaysId
});

export default rootReducer;
