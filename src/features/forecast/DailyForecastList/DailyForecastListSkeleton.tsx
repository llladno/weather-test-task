import { DailyForecastCardSkeleton } from "../DailyForecastCard";

export const DailyForecastListSkeleton = () => {
  return (
    <div className="w-full max-w-4xl text-left">
      <div className="mb-4 h-10 w-32 animate-pulse rounded-pill bg-zinc-200 dark:bg-zinc-800" />
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {[0, 1, 2, 3, 4].map((index) => (
          <DailyForecastCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
