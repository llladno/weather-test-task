export const HourlyTemperatureChartSkeleton = () => {
  return (
    <div className="w-full max-w-4xl rounded-card border border-border-glass bg-surface-glass p-5 shadow-card backdrop-blur-md dark:shadow-card-dark">
      <div className="mb-4 h-4 w-40 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-48 w-full animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
};
