import React from "react";
import renderer from "react-test-renderer";
import { INIT_FORM_LOCATION, INIT_FORM_TERM } from "../constants";
import BusinessesListComponent from "./BusinessesListComponent";

let mockData = [
  {
    id: "id",
    name: "name",
    image_url: "/images/notFound.png",
    display_phone: "12345678",
    rating: "4",
    review_count: 283,
    url: "url",
    location: { display_address: ["adress1", "adress2"] },
  },
];

test("Render BusinessesListComponent", () => {
  const component = renderer.create(
    <BusinessesListComponent
      location={INIT_FORM_LOCATION}
      term={INIT_FORM_TERM}
      currentPage={0}
      data={mockData}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
