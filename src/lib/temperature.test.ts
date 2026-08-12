import { describe, expect, it } from "vitest";
import { celsiusToFahrenheit, formatTemperature, toDisplayTemperature } from "./temperature";

describe("celsiusToFahrenheit", () => {
  it("converts 0°C to 32°F", () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
  });

  it("converts negative temperatures correctly", () => {
    expect(celsiusToFahrenheit(-40)).toBe(-40);
  });
});

describe("formatTemperature", () => {
  it("returns the celsius value unrounded input rounded with a degree sign", () => {
    expect(formatTemperature(21.4, "celsius")).toBe("21°");
  });

  it("rounds half-degree values up", () => {
    expect(formatTemperature(21.5, "celsius")).toBe("22°");
  });

  it("converts and rounds to fahrenheit", () => {
    expect(formatTemperature(21.4, "fahrenheit")).toBe("71°");
  });
});

describe("toDisplayTemperature", () => {
  it("returns a rounded number, not a formatted string", () => {
    expect(toDisplayTemperature(-0.6, "celsius")).toBe(-1);
    expect(toDisplayTemperature(100, "fahrenheit")).toBe(212);
  });
});
