import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./page";

const renderHome = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>,
  );
};

describe("Home", () => {
  it("renders the app title", () => {
    renderHome();
    expect(screen.getByRole("heading", { name: "Погода" })).toBeInTheDocument();
  });
});
