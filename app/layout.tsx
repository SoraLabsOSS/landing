import type { Metadata } from "next";
import "@/styles/globals.css";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title:
    "Soralabs — We build polished digital products and reusable UI systems for developers.",
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
