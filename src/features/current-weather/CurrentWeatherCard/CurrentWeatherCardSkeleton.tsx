export const CurrentWeatherCardSkeleton = () => {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-card shadow-card dark:shadow-card-dark">
      <div className="relative h-80 w-full animate-pulse bg-zinc-200 sm:h-96 lg:h-full dark:bg-zinc-800">
        <div className="absolute inset-x-4 top-4 sm:inset-x-6 sm:top-6">
          <div className="h-6 w-40 rounded-pill bg-black/20" />
        </div>
        <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
          <div className="inline-flex items-center gap-3 rounded-card bg-black/20 py-3 pr-8 pl-3">
            <div className="size-[52px] rounded-full bg-white/20" />
            <div className="flex flex-col gap-2">
              <div className="h-7 w-20 rounded-full bg-white/20" />
              <div className="h-3 w-24 rounded-full bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
