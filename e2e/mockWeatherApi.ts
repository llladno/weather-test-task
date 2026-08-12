import type { Page } from "@playwright/test";

export const BERLIN_TEMP_CELSIUS = 21.4;

export const mockWeatherApi = async (page: Page) => {
  await page.route("**/api/geocode?*", async (route) => {
    await route.fulfill({
      json: [
        {
          name: "Berlin",
          local_names: { ru: "Берлин" },
          lat: 52.52,
          lon: 13.405,
          country: "DE",
        },
      ],
    });
  });

  await page.route("**/api/weather?*", async (route) => {
    const nowSeconds = Math.floor(Date.now() / 1000);
    const forecastList = Array.from({ length: 16 }, (_, index) => ({
      dt: nowSeconds + index * 3 * 60 * 60,
      main: { temp: 40 + index, feels_like: 39 + index, temp_min: 38, temp_max: 46, humidity: 55 },
      weather: [{ id: 800, main: "Clear", description: "ясно", icon: "01d" }],
      wind: { speed: 3.4, deg: 200 },
      pop: 0,
      dt_txt: new Date((nowSeconds + index * 3 * 60 * 60) * 1000).toISOString(),
    }));

    await route.fulfill({
      json: {
        current: {
          coord: { lon: 13.405, lat: 52.52 },
          weather: [{ id: 800, main: "Clear", description: "ясно", icon: "01d" }],
          main: {
            temp: BERLIN_TEMP_CELSIUS,
            feels_like: 20,
            temp_min: 19,
            temp_max: 23,
            pressure: 1013,
            humidity: 60,
          },
          visibility: 10000,
          wind: { speed: 3.4, deg: 200 },
          clouds: { all: 40 },
          dt: nowSeconds,
          sys: { country: "DE", sunrise: nowSeconds - 20000, sunset: nowSeconds + 20000 },
          timezone: 3600,
          name: "Berlin",
        },
        forecast: {
          cod: "200",
          cnt: forecastList.length,
          list: forecastList,
          city: { name: "Berlin", country: "DE", timezone: 3600, sunrise: 0, sunset: 0 },
        },
      },
    });
  });

  await page.route("**/api/city-photo?*", async (route) => {
    await route.fulfill({ json: { photo: null } });
  });
};
