import { DailyForecastCardSkeleton } from "../DailyForecastCard";

export const DailyForecastListSkeleton = () => {
  return (
    <div className="w-full max-w-4xl text-left">
      <div className="mb-4 h-10 w-32 animate-pulse rounded-pill bg-zinc-200 dark:bg-zinc-800" />
      <div className="scrollbar-thin -my-1 overflow-x-auto py-1 sm:m-0 sm:overflow-visible sm:p-0">
        <div className="flex gap-3 sm:grid sm:grid-cols-5">
          {[0, 1, 2, 3, 4].map((index) => (
            <div key={index} className="w-36 shrink-0 sm:w-auto sm:shrink">
              <DailyForecastCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
