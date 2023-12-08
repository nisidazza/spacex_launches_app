import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home", () => {
  it("matches homepage snapshot", () => {
    const { container } = render(<Home />);

    expect(container).toMatchSnapshot();
  });

  it("renders a heading", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: "SpaceX",
      })
    ).toBeInTheDocument();
  });

  it("renders the link to the protected page", () => {
    render(<Home />);

    const link = screen.getByRole("link", { name: "Members" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/protected");
  });
});
