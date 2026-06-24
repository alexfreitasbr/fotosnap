import { expect, test } from "@playwright/test";

test.describe("Auth pages", () => {
  test("login page renders sign-in form", async ({ page }) => {
    await page.goto("/login");

    await expect(
      page.getByRole("heading", { name: "Entre com sua conta" }),
    ).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Senha")).toBeVisible();
    await expect(page.getByRole("button", { name: "Acessar" })).toBeVisible();
  });

  test("signup page renders sign-up form", async ({ page }) => {
    await page.goto("/signup");

    await expect(
      page.getByRole("heading", { name: "Criar uma conta" }),
    ).toBeVisible();
    await expect(page.getByLabel("Nome")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Senha", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Confirmar Senha")).toBeVisible();
  });

  test("navigates from login to signup", async ({ page }) => {
    await page.goto("/login");

    await page.getByRole("link", { name: "Criar uma conta" }).click();

    await expect(page).toHaveURL("/signup");
    await expect(
      page.getByRole("heading", { name: "Criar uma conta" }),
    ).toBeVisible();
  });
});
