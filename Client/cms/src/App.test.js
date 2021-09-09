import { render } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("testing <App>", () => {
  test("renders without crashing", () => {
    render(<App />, { wrapper: BrowserRouter });
  });
});
