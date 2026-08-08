import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { ShadcnRegistry3 } from "@/components/og/shadcn-registry-3";

export const alt =
  "Soralabs — polished digital products and reusable UI systems for developers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function getAvatarDataUrl() {
  const buffer = await readFile(
    path.join(process.cwd(), "public", "og-avatar.jpg"),
  );
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

export default async function Image() {
  const logo = await getAvatarDataUrl();

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <ShadcnRegistry3
        title="We build polished digital products and reusable UI systems for developers."
        credit="Developed By @axyl1410"
        ghost="SORALABS"
        logo={logo}
      />
    </div>,
    size,
  );
}
