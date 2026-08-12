export const WeatherDetailsPanelSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-3 lg:w-56">
      {[0, 1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className="h-[60px] w-full animate-pulse rounded-card border border-border-glass bg-zinc-200 dark:bg-zinc-800"
        />
      ))}
    </div>
  );
};
