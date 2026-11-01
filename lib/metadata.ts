import type { Metadata } from "next";
import site from "@/content/site.json";
import { getCopy, homePath, type Lang } from "./content";

export function pageMetadata(lang: Lang): Metadata {
  const t = getCopy(lang);
  const image = { url: "/headshot.jpg", width: 480, height: 600, alt: t["photo.alt"] };
  return {
    metadataBase: new URL(site.url),
    title: t["meta.title"],
    description: t["meta.description"],
    alternates: {
      canonical: homePath[lang],
      languages: { en: homePath.en, "zh-Hant": homePath.zh, "x-default": homePath.en },
    },
    openGraph: {
      type: "profile",
      url: homePath[lang],
      siteName: "Momo Chen",
      title: t["meta.title"],
      description: t["meta.description"],
      locale: lang === "zh" ? "zh_TW" : "en_US",
      alternateLocale: lang === "zh" ? "en_US" : "zh_TW",
      images: [image],
      firstName: "Cheng-Mou",
      lastName: "Chen",
    },
    twitter: {
      card: "summary",
      title: t["meta.title"],
      description: t["meta.description"],
      images: [image],
    },
  };
}
