import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header", () => {
  test("renders title and menu", () => {
    const title = "Memoo Mission";

    render(<Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: title })).toBeInTheDocument();
  });
});
