"use client";

import { useState } from "react";
import { Pickaxe, Loader2 } from "lucide-react";

interface MiningFormProps {
  onMine: (data: string) => void;
  isMining: boolean;
}

export function MiningForm({ onMine, isMining }: MiningFormProps) {
  const [data, setData] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.trim() || isMining) return;
    onMine(data.trim());
    setData("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label
        htmlFor="block-data"
        className="text-xs font-medium text-muted-foreground"
      >
        Block Data
      </label>
      <div className="flex gap-2">
        <input
          id="block-data"
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="e.g., Alice pays Bob 10"
          className="flex-1 rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:shadow-[0_0_0_1px_var(--color-primary)]"
          disabled={isMining}
        />
        <button
          type="submit"
          disabled={!data.trim() || isMining}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_16px_rgba(34,211,238,0.3)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isMining ? (
            <>
              <Loader2 className="h-4 w-4 animate-mining-spin" />
              <span>Mining...</span>
            </>
          ) : (
            <>
              <Pickaxe className="h-4 w-4" />
              <span>Mine Block</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
