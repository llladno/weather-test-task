export const DailyForecastCardSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col items-center gap-2 rounded-card border border-border-glass bg-zinc-200 px-3 py-4 dark:bg-zinc-800">
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-4 w-10 rounded-full bg-zinc-300/70 dark:bg-zinc-700/70" />
        <div className="h-3 w-12 rounded-full bg-zinc-300/70 dark:bg-zinc-700/70" />
      </div>
      <div className="size-12 rounded-full bg-zinc-300/70 dark:bg-zinc-700/70" />
      <div className="h-3 w-16 rounded-full bg-zinc-300/70 dark:bg-zinc-700/70" />
      <div className="h-4 w-14 rounded-full bg-zinc-300/70 dark:bg-zinc-700/70" />
    </div>
  );
};
