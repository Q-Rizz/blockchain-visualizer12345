"use client";

import { Zap, Loader2 } from "lucide-react";

interface AutoMineProps {
  onAutoMine: () => void;
  isAutoMining: boolean;
  autoMineProgress: { current: number; total: number } | null;
}

export function AutoMine({
  onAutoMine,
  isAutoMining,
  autoMineProgress,
}: AutoMineProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-muted-foreground">
        Auto-Mine
      </label>
      <button
        onClick={onAutoMine}
        disabled={isAutoMining}
        className="flex items-center justify-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition-all hover:bg-accent/20 hover:shadow-[0_0_16px_rgba(167,139,250,0.2)] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isAutoMining ? (
          <>
            <Loader2 className="h-4 w-4 animate-mining-spin" />
            <span>
              Mining {autoMineProgress?.current}/{autoMineProgress?.total}...
            </span>
          </>
        ) : (
          <>
            <Zap className="h-4 w-4" />
            <span>Mine 3 Sample Blocks</span>
          </>
        )}
      </button>
    </div>
  );
}
