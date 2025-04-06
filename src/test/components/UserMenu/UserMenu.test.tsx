import UserMenu from "@/components/UserMenu";
import { statusAtom } from "@/store/gameStore";
import { userAtom } from "@/store/userStore";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("UserMenu", () => {
  test("renders main elements", () => {
    const userName = "John Doe";
    statusAtom.set("playing");
    userAtom.set(userName);

    render(<UserMenu />);

    expect(
      screen.getByRole("button", { name: "Settings" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Restart" })).toBeInTheDocument();
    expect(screen.getByText(`Player: ${userName}`)).toBeInTheDocument();
  });
});
