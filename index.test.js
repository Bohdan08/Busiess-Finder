import { render } from "@testing-library/react";
import App from "../../pages/_app";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});
