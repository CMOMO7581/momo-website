"use client";

import { homePath, type Lang } from "@/lib/lang";

export function LangToggle({ lang }: { lang: Lang }) {
  function go(next: Lang) {
    if (next === lang) return;
    try { localStorage.setItem("mc-lang", next); } catch {}
    location.assign(homePath[next] + location.hash);
  }

  return (
    <span className="lang" role="group" aria-label="Language / 語言">
      <button type="button" id="langEn" lang="en" aria-pressed={lang === "en"} onClick={() => go("en")}>EN</button>
      <button type="button" id="langZh" lang="zh-Hant" aria-pressed={lang === "zh"} onClick={() => go("zh")}>中文</button>
    </span>
  );
}
