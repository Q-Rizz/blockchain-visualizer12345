import { ShieldCheck, ShieldAlert } from "lucide-react";

export function ValidationBadge({ isValid }: { isValid: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border-2 px-5 py-3 transition-all duration-500 ${
        isValid
          ? "border-success/40 bg-success/10 shadow-[0_0_24px_rgba(34,197,94,0.15)]"
          : "border-destructive/40 bg-destructive/10 shadow-[0_0_24px_rgba(239,68,68,0.15)]"
      }`}
      role="status"
      aria-live="polite"
    >
      {isValid ? (
        <ShieldCheck className="h-6 w-6 text-success" />
      ) : (
        <ShieldAlert className="h-6 w-6 text-destructive" />
      )}
      <div>
        <p
          className={`text-sm font-bold ${isValid ? "text-success" : "text-destructive"}`}
        >
          {isValid ? "Chain Valid" : "Chain Invalid"}
        </p>
        <p className="text-xs text-muted-foreground">
          {isValid
            ? "All blocks are properly linked and verified"
            : "One or more blocks have been tampered with"}
        </p>
      </div>
    </div>
  );
}
