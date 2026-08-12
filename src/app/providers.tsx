"use client";

import { useState } from "react";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ToastViewport } from "@/components/ui/ToastViewport";
import { useToastStore } from "@/store/useToastStore";
import { QUERY_KEYS } from "@/constants/queryKeys";

const QUERY_ERROR_MESSAGES: Record<string, string> = {
  [QUERY_KEYS.weather]: "Не удалось загрузить погоду",
  [QUERY_KEYS.cityPhoto]: "Не удалось загрузить фото города",
};

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            const [key] = query.queryKey;
            if (typeof key !== "string") return;
            const message = QUERY_ERROR_MESSAGES[key];
            if (!message) return;
            useToastStore.getState().addToast(message, "error");
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            retry: 1,
          },
        },
      }),
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastViewport />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
