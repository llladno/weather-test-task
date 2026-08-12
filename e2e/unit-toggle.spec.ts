import { test, expect } from "@playwright/test";
import { mockWeatherApi } from "./mockWeatherApi";

test("switching the temperature unit updates the displayed temperature", async ({ page }) => {
  await mockWeatherApi(page);
  await page.goto("/");

  const searchInput = page.getByLabel("Поиск города");
  await searchInput.click();
  await searchInput.fill("Berlin");
  await searchInput.press("Enter");
  await page.getByRole("button", { name: "Берлин, DE" }).click();

  await expect(page.getByText("21°", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Единица измерения температуры" }).click();
  await page.getByRole("option", { name: "°F" }).click();

  await expect(page.getByText("71°", { exact: true })).toBeVisible();
  await expect(page.getByText("21°", { exact: true })).toHaveCount(0);
});
