import type { BlockData } from "@/lib/blockchain";
import { ScrollText } from "lucide-react";

export function TransactionLedger({ chain }: { chain: BlockData[] }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <ScrollText className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-xs font-medium text-muted-foreground">
          Transaction Ledger
        </h3>
      </div>
      <div className="flex flex-col gap-1 rounded-lg border border-border bg-muted/50 p-3">
        {chain.length <= 1 ? (
          <p className="text-xs text-muted-foreground italic">
            No transactions yet. Mine a block to get started.
          </p>
        ) : (
          chain.slice(1).map((block) => (
            <div
              key={block.index}
              className="flex items-baseline gap-2 py-1 border-b border-border/50 last:border-0"
            >
              <span className="shrink-0 text-[10px] font-mono text-primary">
                Block {block.index}
              </span>
              <span className="text-xs text-foreground">{block.data}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
