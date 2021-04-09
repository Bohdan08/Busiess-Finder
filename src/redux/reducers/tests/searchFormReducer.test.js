import * as types from "../../constants/actionTypes";
import searchFormReducer, { initState } from "../searchFormReducer";

describe("Search Form Reducer", () => {
  it("Should change initState values", () => {
    expect(
      searchFormReducer(initState, {
        type: types.SET_SEARCH_FORM_VALUES,
        payload: { location: "NYC", term: "Plumbers" },
      })
    ).toEqual({
      location: "NYC",
      term: "Plumbers",
    });
  });
});
