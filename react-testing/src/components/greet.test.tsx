import { render, screen } from "@testing-library/react";
import Greet from "./greet";

describe("Greet", () => {
  test("Greet render correctly", () => {
    render(<Greet />);
    const textElement = screen.getByText("Hello");
    expect(textElement).toBeInTheDocument();
  });

  test("Greet render with a name", () => {
    render(<Greet name="Jaejoong" />);
    const textElement = screen.getByText("Hello Jaejoong");
    expect(textElement).toBeInTheDocument();
  });
});
