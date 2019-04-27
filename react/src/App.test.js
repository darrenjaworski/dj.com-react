import React from "react";
import renderer from "react-test-renderer";

import App from "./App";

describe("app", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be able to toggle light and dark mode", () => {});

  it("should store the theme mode in localstorage", () => {});
});
