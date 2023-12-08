import { within } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Button from "../components/button";

describe("Button", () => {
  it("shows the correct label and attribute aria-label", () => {
    render(<Button label={"test-label"} loading={false} />);

    expect(screen.getByRole("button", { name: "test-label" })).toHaveAttribute(
      "aria-label",
      "test-label"
    );
  });

  it("does not show the label when loading is true", () => {
    render(<Button label={"test-label"} loading={true} />);

    const button = screen.getByRole("button");
    expect(within(button).queryByText("test-label")).not.toBeInTheDocument();

    const loadingDots = within(button).getAllByTitle("dot");
    loadingDots.forEach((dot) => {
      expect(dot).toHaveStyle("background-color: rgb(128, 128, 128)");
    });
  });
});
