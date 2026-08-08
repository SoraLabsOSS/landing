"use client";

import {
  Heroabout,
  Aboutabout,
  Team,
  Partners,
  Insights,
  Principles,
} from "@/container";
import { Curve, Ready } from "@/components";

export default function About() {
  return (
    <Curve backgroundColor="#f1f1f1">
      <Heroabout />
      <Aboutabout />
      <Team />
      <Principles />
      <Partners />
      <Insights />
      <Ready />
    </Curve>
  );
}
