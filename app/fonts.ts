import { La_Belle_Aurore, Lora, Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import type { Lang } from "@/lib/lang";

// Same families and weights the design loaded from Google Fonts, self-hosted at build time.
// Not preloaded: each page then downloads only the styles it actually uses.
const script = La_Belle_Aurore({ weight: "400", subsets: ["latin"], preload: false, variable: "--font-script" });
const lora = Lora({ weight: ["400", "600"], style: ["normal", "italic"], subsets: ["latin"], preload: false, variable: "--font-lora" });
const openSans = Open_Sans({ weight: ["400", "600", "700"], style: ["normal", "italic"], subsets: ["latin"], preload: false, variable: "--font-open-sans" });

// Noto TC trimmed to the characters each page uses; scripts/subset-cjk-fonts.mjs refreshes these before each build.
// next/font only accepts literal options, so each language's files are listed out.
const notoSansEn = localFont({ preload: false, adjustFontFallback: false, variable: "--font-noto-sans-tc", src: [
  { path: "./fonts/noto-sans-tc-en-400.woff2", weight: "400" },
  { path: "./fonts/noto-sans-tc-en-600.woff2", weight: "600" },
] });
const notoSerifEn = localFont({ preload: false, adjustFontFallback: false, variable: "--font-noto-serif-tc", src: [
  { path: "./fonts/noto-serif-tc-en-400.woff2", weight: "400" },
  { path: "./fonts/noto-serif-tc-en-600.woff2", weight: "600" },
] });
const notoSansZh = localFont({ preload: false, adjustFontFallback: false, variable: "--font-noto-sans-tc", src: [
  { path: "./fonts/noto-sans-tc-zh-400.woff2", weight: "400" },
  { path: "./fonts/noto-sans-tc-zh-600.woff2", weight: "600" },
] });
const notoSerifZh = localFont({ preload: false, adjustFontFallback: false, variable: "--font-noto-serif-tc", src: [
  { path: "./fonts/noto-serif-tc-zh-400.woff2", weight: "400" },
  { path: "./fonts/noto-serif-tc-zh-600.woff2", weight: "600" },
] });

const shared = [script, lora, openSans];
const byLang = { en: [notoSansEn, notoSerifEn], zh: [notoSansZh, notoSerifZh] };

export function fontVariables(lang: Lang) {
  return [...shared, ...byLang[lang]].map((f) => f.variable).join(" ");
}
