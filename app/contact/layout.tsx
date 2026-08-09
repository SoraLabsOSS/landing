import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact — Soralabs",
  description:
    "Start a project with Soralabs. Tell us about your product, timeline, and goals — we build polished digital products and reusable UI systems.",
  openGraph: {
    title: "Contact — Soralabs",
    description:
      "Start a project with Soralabs. Tell us about your product, timeline, and goals.",
    url: "https://soralabs.io.vn/contact",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
