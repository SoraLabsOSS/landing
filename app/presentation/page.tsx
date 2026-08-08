"use client";

import { Curve, Ready } from "@/components";
import {
  Heropresentation,
  Projectspresentation,
  Publication,
} from "@/container";

export default function Presentation() {
  return (
    <Curve backgroundColor="#f1f1f1">
      <Heropresentation />
      <Projectspresentation />
      <Publication />
      <Ready />
    </Curve>
  );
}
