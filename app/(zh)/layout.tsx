import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootShell } from "@/components/RootShell";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("zh");

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell lang="zh">{children}</RootShell>;
}
