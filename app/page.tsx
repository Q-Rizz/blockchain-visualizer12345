"use client";

import { useState, useCallback } from "react";
import {
  createGenesisBlock,
  mineBlock,
  isChainValid,
  getInvalidBlockIndices,
  calculateHash,
  type BlockData,
} from "@/lib/blockchain";
import { BlockCard } from "@/components/block-card";
import { ChainLink } from "@/components/chain-link";
import { ValidationBadge } from "@/components/validation-badge";
import { DifficultySelector } from "@/components/difficulty-selector";
import { MiningForm } from "@/components/mining-form";
import { TransactionLedger } from "@/components/transaction-ledger";
import { AutoMine } from "@/components/auto-mine";
import { Blocks, Github } from "lucide-react";

const SAMPLE_TRANSACTIONS = [
  "Alice pays Bob 10 BTC",
  "Bob pays Charlie 5 BTC",
  "Charlie pays Dave 3 BTC",
];

export default function Home() {
  const [chain, setChain] = useState<BlockData[]>([createGenesisBlock()]);
  const [difficulty, setDifficulty] = useState(2);
  const [isMining, setIsMining] = useState(false);
  const [isAutoMining, setIsAutoMining] = useState(false);
  const [autoMineProgress, setAutoMineProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);

  const valid = isChainValid(chain);
  const invalidIndices = getInvalidBlockIndices(chain);

  const handleMine = useCallback(
    (data: string) => {
      setIsMining(true);
      // Use setTimeout to let the UI update before blocking with mining
      setTimeout(() => {
        const latestBlock = chain[chain.length - 1];
        const newBlock = mineBlock(
          chain.length,
          data,
          latestBlock.hash,
          difficulty
        );
        setChain((prev) => [...prev, newBlock]);
        setIsMining(false);
      }, 50);
    },
    [chain, difficulty]
  );

  const handleEdit = useCallback(
    (index: number, newData: string) => {
      setChain((prev) => {
        const updated = [...prev];
        const block = { ...updated[index] };
        block.data = newData;
        // Recalculate hash with new data (this will break the chain intentionally)
        block.hash = calculateHash(
          block.index,
          block.previousHash,
          block.timestamp,
          block.data,
          block.nonce
        );
        updated[index] = block;
        return updated;
      });
    },
    []
  );

  const handleAutoMine = useCallback(() => {
    setIsAutoMining(true);
    setAutoMineProgress({ current: 0, total: SAMPLE_TRANSACTIONS.length });

    let currentChain = [...chain];
    let step = 0;

    const mineNext = () => {
      if (step >= SAMPLE_TRANSACTIONS.length) {
        setIsAutoMining(false);
        setAutoMineProgress(null);
        return;
      }

      setAutoMineProgress({ current: step + 1, total: SAMPLE_TRANSACTIONS.length });

      setTimeout(() => {
        const latestBlock = currentChain[currentChain.length - 1];
        const newBlock = mineBlock(
          currentChain.length,
          SAMPLE_TRANSACTIONS[step],
          latestBlock.hash,
          difficulty
        );
        currentChain = [...currentChain, newBlock];
        setChain([...currentChain]);
        step++;
        mineNext();
      }, 50);
    };

    mineNext();
  }, [chain, difficulty]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Blocks className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground">
                Blockchain Visualizer
              </h1>
              <p className="text-[11px] text-muted-foreground">
                Interactive proof-of-work demonstration
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ValidationBadge isValid={valid} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Controls */}
          <aside className="flex flex-col gap-6 lg:w-72 lg:shrink-0">
            <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-5">
              <DifficultySelector
                difficulty={difficulty}
                onChange={setDifficulty}
              />
              <div className="h-px bg-border" />
              <MiningForm onMine={handleMine} isMining={isMining || isAutoMining} />
              <div className="h-px bg-border" />
              <AutoMine
                onAutoMine={handleAutoMine}
                isAutoMining={isAutoMining}
                autoMineProgress={autoMineProgress}
              />
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <TransactionLedger chain={chain} />
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-medium text-muted-foreground">
                  How It Works
                </h3>
                <div className="flex flex-col gap-2 text-[11px] text-muted-foreground leading-relaxed">
                  <p>
                    <span className="font-semibold text-foreground">Mining:</span>{" "}
                    Enter data and click Mine. The system finds a nonce that produces
                    a hash with the required leading zeros.
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Linking:</span>{" "}
                    Each block stores the previous block{"'"}s hash, forming an
                    immutable chain.
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Tampering:</span>{" "}
                    Click the edit icon on any block to change its data. The chain
                    immediately becomes invalid.
                  </p>
                </div>
              </div>
            </div>
            <a
              href="https://github.com/Q-Rizz/blockchain-visualizer12345"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground hover:border-primary/30"
            >
              <Github className="h-4 w-4" />
              <span>View on GitHub</span>
            </a>
          </aside>

          {/* Chain Display */}
          <section className="flex-1" aria-label="Blockchain">
            <div className="flex flex-col items-center gap-0">
              {chain.map((block, i) => (
                <div key={block.index} className="flex w-full max-w-md flex-col items-center">
                  {i > 0 && (
                    <ChainLink isValid={!invalidIndices.has(i)} />
                  )}
                  <div className="w-full">
                    <BlockCard
                      block={block}
                      isInvalid={invalidIndices.has(i)}
                      isGenesis={i === 0}
                      onEdit={handleEdit}
                    />
                  </div>
                </div>
              ))}
            </div>
            {chain.length === 1 && (
              <div className="mt-8 flex flex-col items-center gap-2 text-center">
                <p className="text-sm text-muted-foreground">
                  The Genesis Block is the first block in the chain.
                </p>
                <p className="text-xs text-muted-foreground">
                  Enter data in the sidebar and mine your first block to build the
                  chain.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
