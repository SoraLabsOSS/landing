"use client";

import { Curve } from "@/components";
import { Heroinsights, Publicationinsights } from "@/container";

export default function Insights() {
  return (
    <Curve backgroundColor="#f1f1f1">
      <Heroinsights />
      <Publicationinsights />
    </Curve>
  );
}
