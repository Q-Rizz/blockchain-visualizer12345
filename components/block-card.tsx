"use client";

import { useState } from "react";
import type { BlockData } from "@/lib/blockchain";
import {
  Hash,
  Clock,
  Database,
  Link,
  Cpu,
  Pencil,
  Check,
  X,
} from "lucide-react";

interface BlockCardProps {
  block: BlockData;
  isInvalid: boolean;
  isGenesis: boolean;
  onEdit?: (index: number, newData: string) => void;
}

export function BlockCard({
  block,
  isInvalid,
  isGenesis,
  onEdit,
}: BlockCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(block.data);

  const handleSaveEdit = () => {
    if (onEdit) {
      onEdit(block.index, editData);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData(block.data);
    setIsEditing(false);
  };

  const formatTimestamp = (ts: number) => {
    return new Date(ts).toLocaleString();
  };

  const truncateHash = (hash: string) => {
    if (hash === "0") return "0";
    return hash.substring(0, 10) + "...";
  };

  return (
    <div
      className={`relative flex flex-col gap-3 rounded-xl border-2 p-5 transition-all duration-300 ${
        isInvalid
          ? "border-destructive bg-destructive/5 shadow-[0_0_20px_rgba(239,68,68,0.15)]"
          : isGenesis
            ? "border-accent/50 bg-accent/5 shadow-[0_0_20px_rgba(167,139,250,0.1)]"
            : "border-border bg-card hover:border-primary/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.08)]"
      }`}
    >
      {/* Block Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold font-mono ${
              isInvalid
                ? "bg-destructive/20 text-destructive"
                : isGenesis
                  ? "bg-accent/20 text-accent"
                  : "bg-primary/20 text-primary"
            }`}
          >
            #{block.index}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {isGenesis ? "Genesis Block" : `Block ${block.index}`}
            </p>
            {block.miningTime !== undefined && (
              <p className="text-xs text-muted-foreground">
                Mined in {block.miningTime}ms
              </p>
            )}
          </div>
        </div>
        {!isGenesis && onEdit && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Edit block data"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Block Fields */}
      <div className="flex flex-col gap-2">
        <FieldRow
          icon={<Clock className="h-3.5 w-3.5" />}
          label="Timestamp"
          value={formatTimestamp(block.timestamp)}
        />
        <div className="flex items-start gap-2">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground">
            <Database className="h-3.5 w-3.5" />
          </div>
          <span className="shrink-0 text-xs text-muted-foreground w-20">Data</span>
          {isEditing ? (
            <div className="flex flex-1 items-center gap-1">
              <input
                type="text"
                value={editData}
                onChange={(e) => setEditData(e.target.value)}
                className="flex-1 rounded border border-primary/50 bg-muted px-2 py-0.5 text-xs font-mono text-foreground outline-none focus:border-primary"
                autoFocus
              />
              <button
                onClick={handleSaveEdit}
                className="flex h-5 w-5 items-center justify-center rounded text-success hover:bg-success/20"
                aria-label="Save edit"
              >
                <Check className="h-3 w-3" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex h-5 w-5 items-center justify-center rounded text-destructive hover:bg-destructive/20"
                aria-label="Cancel edit"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <span
              className={`text-xs font-mono break-all ${isInvalid ? "text-destructive" : "text-foreground"}`}
            >
              {block.data}
            </span>
          )}
        </div>
        <FieldRow
          icon={<Link className="h-3.5 w-3.5" />}
          label="Prev Hash"
          value={truncateHash(block.previousHash)}
          mono
          color={isGenesis ? "text-muted-foreground" : "text-accent"}
        />
        <FieldRow
          icon={<Cpu className="h-3.5 w-3.5" />}
          label="Nonce"
          value={block.nonce.toLocaleString()}
          mono
        />
        <FieldRow
          icon={<Hash className="h-3.5 w-3.5" />}
          label="Hash"
          value={truncateHash(block.hash)}
          mono
          color={isInvalid ? "text-destructive" : "text-primary"}
        />
      </div>

      {/* Invalid badge */}
      {isInvalid && (
        <div className="absolute -top-2 -right-2 rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold text-destructive-foreground">
          TAMPERED
        </div>
      )}
    </div>
  );
}

function FieldRow({
  icon,
  label,
  value,
  mono,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground">
        {icon}
      </div>
      <span className="shrink-0 text-xs text-muted-foreground w-20">{label}</span>
      <span
        className={`text-xs break-all ${mono ? "font-mono" : ""} ${color || "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}
