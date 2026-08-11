import { test, expect } from "@playwright/test";

test("home page loads and shows the getting started heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("page.tsx")).toBeVisible();
});
