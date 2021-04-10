const asyncActionType = (type) => ({
  PENDING: `${type}_PENDING`,
  SUCCESS: `${type}_SUCCESS`,
  ERROR: `${type}_ERROR`,
});

/* API */
export const API_REQUEST = "API_REQUEST";

/* API Requests */

export const GET_BUSINESSES_LIST = asyncActionType("GET_BUSINESSES_LIST");
export const SET_BUSINESS_LIST = "SET_BUSINESSES_LIST";

/* Search Form Actions */
export const SET_SEARCH_FORM_VALUES = "SET_SEARCH_FORM_VALUES";

/* Autcomplete */

export const GET_AUTO_COMPLETE_LIST = asyncActionType("GET_AUTO_COMPLETE_LIST");
