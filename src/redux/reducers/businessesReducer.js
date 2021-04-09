import {
  BUSINESSES_PER_PAGE,
  INIT_FORM_LOCATION,
  INIT_FORM_TERM,
} from "../../constants";
import {
  GET_BUSINESSES_LIST,
  SET_BUSINESS_LIST,
} from "../constants/actionTypes";

const initState = {
  loading: false,
  error: false,
  data: [],
  term: INIT_FORM_TERM,
  location: INIT_FORM_LOCATION,
  total: 0,
  currentPage: 0,
  perPage: BUSINESSES_PER_PAGE,
  offset: 0,
};

const restaurantsReducer = (state = initState, action) => {
  const { type, payload, total } = action;
  switch (type) {
    case GET_BUSINESSES_LIST.PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_BUSINESSES_LIST.ERROR:
      return {
        ...state,
        error: payload,
        data: [],
        total: 0,
        loading: false,
      };
    case GET_BUSINESSES_LIST.SUCCESS:
      return {
        ...state,
        data: state.currentPage === 0 ? payload : state.data.concat(payload),
        total: total,
        error: false,
        loading: false,
      };

    case SET_BUSINESS_LIST:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default restaurantsReducer;
