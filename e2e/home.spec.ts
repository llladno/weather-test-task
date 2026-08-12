import { test, expect } from "@playwright/test";

test("home page loads and shows the empty-state heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Узнайте погоду где угодно" })).toBeVisible();
});
