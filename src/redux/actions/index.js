import {
  API_REQUEST,
  GET_BUSINESSES_LIST,
  SET_BUSINESS_LIST,
  SET_SEARCH_FORM_VALUES,
} from "../constants/actionTypes";

/*  Businesses List  */

export const getBusinessesList = (payload) => {
  return {
    type: API_REQUEST,
    payload,
    next: GET_BUSINESSES_LIST,
  };
};

export const setBusinessesList = (payload) => {
  return {
    type: SET_BUSINESS_LIST,
    payload,
  };
};

/* Set Search Form Values */

export const setSearchForm = (payload) => {
  return {
    type: SET_SEARCH_FORM_VALUES,
    payload,
  };
};
