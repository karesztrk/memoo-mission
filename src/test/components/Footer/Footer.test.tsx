import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  test("should render copyright info", () => {
    const year = new Date().getFullYear();

    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByText(/Károly Török/)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(year.toString()))).toBeInTheDocument();
  });
});
