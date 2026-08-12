export const CurrentWeatherCardSkeleton = () => {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-card shadow-card dark:shadow-card-dark">
      <div className="relative h-80 w-full animate-pulse bg-zinc-200 sm:h-96 lg:h-full dark:bg-zinc-800">
        <div className="absolute top-4 left-4 h-[calc(100%-32px)]">
          <div className="inline-flex h-full flex-col items-center justify-center gap-3 rounded-card bg-black/20 py-3 pr-5 pl-3">
            <div className="h-4 w-24 rounded-full bg-white/20" />
            <div className="size-[52px] rounded-full bg-white/20" />
            <div className="h-7 w-20 rounded-full bg-white/20" />
            <div className="h-3 w-24 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
};
