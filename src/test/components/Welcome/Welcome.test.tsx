import { describe, expect, test, vitest } from "vitest";
import { screen } from "@testing-library/react";
import Welcome from "@/components/Welcome";
import { renderWithProviders } from "@/test/utils/test-utils";
import userEvent from "@testing-library/user-event";

describe("Welcome", () => {
  test("fill the form", async () => {
    const name = "John Doe";
    const user = userEvent.setup();
    const onSubmit = vitest.fn();

    renderWithProviders(<Welcome onSubmit={onSubmit} />);

    await user.type(screen.getByRole("textbox", { name: "Your Name" }), name);
    await user.click(screen.getByRole("button", { name: "Start Game" }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name,
      }),
    );
  });
});
