import { INIT_FORM_LOCATION, INIT_FORM_TERM } from "../../constants";
import { SET_SEARCH_FORM_VALUES } from "../constants/actionTypes";

export const initState = {
  location: INIT_FORM_LOCATION,
  term: INIT_FORM_TERM,
};

const searchFormReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SEARCH_FORM_VALUES:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default searchFormReducer;
