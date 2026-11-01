import type { ReactNode } from "react";
import "@/app/globals.css";
import { fontVariables } from "@/app/fonts";
import { htmlLang, type Lang } from "@/lib/lang";

// Applies a saved theme before first paint so dark-mode visitors don't see a white flash.
const themeScript = `try{var t=localStorage.getItem("mc-theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

// On the English page, sends visitors who last chose 中文 to /zh/ before anything renders.
const langScript = `try{if(localStorage.getItem("mc-lang")==="zh")location.replace("/zh/"+location.hash)}catch(e){}`;

export function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={htmlLang[lang]} className={fontVariables(lang)} suppressHydrationWarning>
      <head>
        {lang === "en" && <script dangerouslySetInnerHTML={{ __html: langScript }} />}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
