import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SignInForm from "./index";

describe("SignInForm", () => {
  it("renders email and password fields", () => {
    render(<SignInForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Acessar" }),
    ).toBeInTheDocument();
  });

  it("calls onSubmit with form values", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<SignInForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.type(screen.getByLabelText("Senha"), "Password1!");

    const form = document.getElementById("signin-form");
    expect(form).not.toBeNull();
    await user.click(within(form!).getByRole("button", { name: "Acessar" }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "Password1!",
    });
  });

  it("shows API error message when provided", () => {
    render(
      <SignInForm onSubmit={vi.fn()} errorMessage="Invalid email or password" />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Invalid email or password",
    );
  });
});
