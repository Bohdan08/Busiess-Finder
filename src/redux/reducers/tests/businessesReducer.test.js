import {
  BUSINESSES_PER_PAGE,
  INIT_FORM_LOCATION,
  INIT_FORM_TERM,
} from "../../../constants";
import * as types from "../../constants/actionTypes";
import businessesReducer, { initState } from "../businessesReducer";

describe("Businesses Reducer", () => {
  it("Should change initState values", () => {
    expect(
      businessesReducer(initState, {
        type: types.SET_BUSINESS_LIST,
        payload: { currentPage: 1, offset: 20 },
      })
    ).toEqual({
      data: [],
      error: false,
      loading: false,
      term: INIT_FORM_TERM,
      location: INIT_FORM_LOCATION,
      total: 0,
      currentPage: 1,
      offset: 20,
      perPage: BUSINESSES_PER_PAGE,
    });
  });
});
