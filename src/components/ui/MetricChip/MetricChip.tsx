import { GlassCard } from "@/components/ui/GlassCard";
import type { MetricChipProps } from "./MetricChip.types";

export const MetricChip = ({ icon, label, value }: MetricChipProps) => {
  return (
    <GlassCard className="flex items-center gap-3 px-4 py-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white">
        {icon}
      </span>
      <div className="flex flex-col items-start">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{label}</span>
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{value}</span>
      </div>
    </GlassCard>
  );
};
