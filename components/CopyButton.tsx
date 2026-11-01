"use client";

import { copyText } from "./copyText";

export function CopyButton({ text, label, copied, selected }: { text: string; label: string; copied: string; selected: string }) {
  return (
    <button
      className="copy"
      type="button"
      data-copy={text}
      onClick={(e) => {
        const b = e.currentTarget;
        copyText(text, b, b.parentElement?.querySelector(".v") ?? null, { copied, selected });
      }}
    >
      {label}
    </button>
  );
}
