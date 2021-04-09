import * as actions from "./index";
import * as types from "../constants/actionTypes";

describe("actions", () => {
  it("Should create an action that set businesses values", () => {
    const expectedAction = {
      type: types.SET_BUSINESS_LIST,
    };
    expect(actions.setBusinessesList()).toEqual(expectedAction);
  });

  it("Should create an action that set Search Form values", () => {
    const expectedAction = {
      type: types.SET_SEARCH_FORM_VALUES,
    };
    expect(actions.setSearchForm()).toEqual(expectedAction);
  });
});
