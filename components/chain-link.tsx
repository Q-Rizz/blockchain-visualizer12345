export function ChainLink({ isValid }: { isValid: boolean }) {
  return (
    <div className="flex shrink-0 items-center justify-center py-1">
      <div className="flex flex-col items-center gap-0.5">
        <div
          className={`h-4 w-0.5 ${isValid ? "bg-primary/40" : "bg-destructive/40"}`}
        />
        <svg
          width="20"
          height="12"
          viewBox="0 0 20 12"
          className={isValid ? "text-primary" : "text-destructive"}
          aria-hidden="true"
        >
          <path
            d="M10 0 L10 4 L4 4 L10 12 L10 8 L16 8 Z"
            fill="currentColor"
            opacity="0.6"
          />
        </svg>
        <div
          className={`h-4 w-0.5 ${isValid ? "bg-primary/40" : "bg-destructive/40"}`}
        />
      </div>
    </div>
  );
}
