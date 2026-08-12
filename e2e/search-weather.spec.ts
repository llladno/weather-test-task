import { test, expect } from "@playwright/test";
import { mockWeatherApi } from "./mockWeatherApi";

test("searching for a city selects it and displays its current weather", async ({ page }) => {
  await mockWeatherApi(page);
  await page.goto("/");

  const searchInput = page.getByLabel("Поиск города");
  await searchInput.click();
  await searchInput.fill("Berlin");
  await searchInput.press("Enter");

  await page.getByRole("button", { name: "Берлин, DE" }).click();

  await expect(page.getByText("Берлин", { exact: false }).first()).toBeVisible();
  await expect(page.getByText("21°", { exact: true })).toBeVisible();
});
