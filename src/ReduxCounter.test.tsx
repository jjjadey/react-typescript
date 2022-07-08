import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

import ReduxCounter from "./ReduxCounter";
import { createStore } from "./store";

test("redux counter increment", () => {
  render(
    <Provider store={createStore()}>
      <ReduxCounter />
    </Provider>
  );

  //init state
  const countElement = screen.getByRole("contentinfo");
  expect(countElement).toHaveTextContent("0");

  //increment
  const addButton = screen.getByText(/Increment/i);
  fireEvent.click(addButton);
  expect(countElement).toHaveTextContent("1");
});


test("redux counter decrement", () => {
  render(
    <Provider store={createStore()}>
      <ReduxCounter />
    </Provider>
  );

  //init state
  const countElement = screen.getByRole("contentinfo");
  expect(countElement).toHaveTextContent("0");

  //decrement
  const addButton = screen.getByText(/Decrement/i);
  fireEvent.click(addButton);
  expect(countElement).toHaveTextContent("-1");
});
