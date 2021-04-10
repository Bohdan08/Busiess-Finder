import { combineReducers } from "redux";
import businessesReducer from "./businessesReducer";
import searchFormReducer from "./searchFormReducer";
import autoCompleteReducer from "./autoCompleteReducer";

const rootReducer = combineReducers({
  businesses: businessesReducer,
  searchForm: searchFormReducer,
  autoComplete: autoCompleteReducer,
});

export default rootReducer;
