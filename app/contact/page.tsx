"use client";

import { Curve } from "@/components";
import { Herocontact, Form, FAQ, Socials } from "@/container";

export default function Contact() {
  return (
    <Curve backgroundColor="#f1f1f1">
      <Herocontact />
      <Form />
      <Socials />
      <FAQ />
    </Curve>
  );
}
