interface DifficultySelectorProps {
  difficulty: number;
  onChange: (d: number) => void;
}

export function DifficultySelector({
  difficulty,
  onChange,
}: DifficultySelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-muted-foreground">
        Mining Difficulty
      </label>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((d) => (
          <button
            key={d}
            onClick={() => onChange(d)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold font-mono transition-all ${
              difficulty === d
                ? "bg-primary text-primary-foreground shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
            aria-label={`Set difficulty to ${d}`}
            aria-pressed={difficulty === d}
          >
            {d}
          </button>
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground">
        Hash must start with{" "}
        <span className="font-mono text-primary">{"0".repeat(difficulty)}</span>
      </p>
    </div>
  );
}
