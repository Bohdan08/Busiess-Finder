import { combineReducers } from "redux";
import businessesReducer from "./businessesReducer";
import searchFormReducer from "./searchFormReducer";

const rootReducer = combineReducers({
  businesses: businessesReducer,
  searchForm: searchFormReducer,
});

export default rootReducer;
