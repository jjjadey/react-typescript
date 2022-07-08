import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import APIComponent from "./APIComponent";

//mock server
const server = setupServer(
  rest.get("/api", (req, res, ctx) => {
    return res(ctx.json({ name: "John" }));
  })
);

//before all the test
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
//after all the test
afterAll(() => server.close());

test("gets the data", async () => {
  render(<APIComponent />);
  // eslint-disable-next-line testing-library/prefer-find-by
  const outputElement = await waitFor(() => screen.getByRole("contentinfo"));
  expect(outputElement).toHaveTextContent("Name is John");
});