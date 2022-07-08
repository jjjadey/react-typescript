import React from "react";
import { render, screen } from "@testing-library/react";
import Person from "./Person";

test("renders Person component", () => {
  render(<Person name="John" />);

  // const linkElement = screen.getByText(/Name is John/i);
  // expect(linkElement).toBeInTheDocument();

  const divElement = screen.getByRole("contentinfo");
  expect(divElement).toHaveTextContent("Name is John");
  expect(divElement).toHaveAttribute("role", "contentinfo");
});
