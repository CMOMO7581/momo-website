import en from "@/content/en.json";
import zh from "@/content/zh.json";
import type { Lang } from "./lang";

export * from "./lang";

export type Copy = typeof en;
export type Key = keyof Copy;

// zh.json must have every key en.json has; TypeScript flags a missing one at build time.
const copy: Record<Lang, Copy> = { en, zh };

export function getCopy(lang: Lang): Copy {
  return copy[lang];
}
