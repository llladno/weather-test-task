"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
      <GlassCard className="flex max-w-sm flex-col items-center gap-4 p-8">
        <div className="flex size-14 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400">
          <TriangleAlert className="size-7" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Что-то пошло не так</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Произошла непредвиденная ошибка. Попробуйте ещё раз.
          </p>
        </div>
        <Button onClick={() => reset()}>Попробовать снова</Button>
      </GlassCard>
    </main>
  );
};

export default ErrorPage;
