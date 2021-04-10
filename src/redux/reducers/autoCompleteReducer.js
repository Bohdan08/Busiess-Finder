import { GET_AUTO_COMPLETE_LIST } from "../constants/actionTypes";

const initState = {
  loading: false,
  error: false,
  data: [],
};

const autoCompleteReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_AUTO_COMPLETE_LIST.PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_AUTO_COMPLETE_LIST.ERROR:
      return {
        ...state,
        error: payload,
        data: [],
        total: 0,
        loading: false,
      };
    case GET_AUTO_COMPLETE_LIST.SUCCESS:
      return {
        ...state,
        data: payload ? payload.terms : [],
        error: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default autoCompleteReducer;
