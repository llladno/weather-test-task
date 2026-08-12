"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ru">
      <body className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center text-foreground">
        <GlassCard className="flex max-w-sm flex-col items-center gap-4 p-8">
          <div className="flex size-14 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400">
            <TriangleAlert className="size-7" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Что-то пошло не так</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Приложение столкнулось с критической ошибкой.
            </p>
          </div>
          <Button onClick={() => reset()}>Попробовать снова</Button>
        </GlassCard>
      </body>
    </html>
  );
};

export default GlobalError;
