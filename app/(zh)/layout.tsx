import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootShell } from "@/components/RootShell";
import { getCopy } from "@/lib/content";

export const metadata: Metadata = {
  title: getCopy("zh")["meta.title"],
};

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell lang="zh">{children}</RootShell>;
}
