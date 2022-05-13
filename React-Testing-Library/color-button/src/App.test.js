import { render, screen, fireEvent } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

test("button has correct initial color", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: "Change to MidnightBlue" });
  expect(button).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("buttons turn MidnightBlue when clicked", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: "Change to MidnightBlue" });

  fireEvent.click(button);

  expect(button).toHaveStyle({ backgroundColor: "MidnightBlue" });

  expect(button).toHaveTextContent("Change to MediumVioletRed");
});

test("initial condition", () => {
  render(<App />);

  const button = screen.getByRole("button", { name: "Change to MidnightBlue" });
  expect(button).toBeEnabled();

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("click checkbox disable button", () => {
  render(<App />);

  const button = screen.getByRole("button", { name: "Change to MidnightBlue" });
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);

  expect(button).toBeDisabled();
});

test("click + click checkbox disable button", () => {
  render(<App />);

  const button = screen.getByRole("button", { name: "Change to MidnightBlue" });
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test("color gray when disabled click and return MediumVioletRed", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: "Change to MidnightBlue" });
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("color gray when disabled click and return MidnightBlue", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: "Change to MidnightBlue" });
  const checkbox = screen.getByRole("checkbox");

  fireEvent.click(button);

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("space before camel-case capital letters", () => {
  test("works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });

  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
