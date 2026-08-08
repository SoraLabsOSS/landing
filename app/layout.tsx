import type { Metadata } from "next";
import "@/styles/globals.css";
import AppShell from "@/components/AppShell";

const title =
  "Soralabs — We build polished digital products and reusable UI systems for developers.";
const description =
  "Soralabs builds polished digital products and reusable UI systems for developers — motion-ready components, design tokens, and thoughtful interfaces.";

export const metadata: Metadata = {
  metadataBase: new URL("https://soralabs.io.vn"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://soralabs.io.vn",
    siteName: "Soralabs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
