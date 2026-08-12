import { Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

const NotFound = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
      <GlassCard className="flex max-w-sm flex-col items-center gap-4 p-8">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary-50 text-primary-500 dark:bg-primary-900/40 dark:text-primary-300">
          <Compass className="size-7" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Страница не найдена</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Такой страницы не существует. Возможно, ссылка устарела.
          </p>
        </div>
        <Button href="/">На главную</Button>
      </GlassCard>
    </main>
  );
};

export default NotFound;
