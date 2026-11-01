import type { MetadataRoute } from "next";
import site from "@/content/site.json";
import { homePath } from "@/lib/lang";

export const dynamic = "force-static";

const languages = {
  en: new URL(homePath.en, site.url).href,
  "zh-Hant": new URL(homePath.zh, site.url).href,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: languages.en, alternates: { languages } },
    { url: languages["zh-Hant"], alternates: { languages } },
  ];
}
