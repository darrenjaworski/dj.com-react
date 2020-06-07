/* eslint-disable */
// eslint-disable-next-line prettier/prettier
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { render, fireEvent } from "@testing-library/react";

import App from "./App";

describe("app", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should store the theme mode in localstorage", () => {
    const { getByTestId } = render(<App />);
    const toggle = getByTestId("toggle");

    expect(window.localStorage.getItem("theme")).toBe("dark");

    fireEvent.click(toggle);
    expect(window.localStorage.getItem("theme")).toBe("light");
  });

  it("should toggle between modes", () => {
    const { getByTestId } = render(<App />);
    const toggle = getByTestId("toggle");
    let body = getByTestId("body-theme");

    // toggle to light
    fireEvent.click(toggle);
    expect(body).toHaveStyle("background: #FFFDFC");

    // toggle to dark
    fireEvent.click(toggle);
    expect(body).toHaveStyle("background: #282E33");
  });
});
