"use client";
import Image from "next/image";
import { useState } from "react";
import { ourApproach } from "@/public";
import { LinkHover } from "@/animation";
import { footerItems } from "@/constants";
import { Heading, RoundButton } from "@/components";

export default function About() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="w-full bg-about padding-y rounded-t-[20px] z-20 relative mt-[-15px]">
      <div className="padding-x">
        <h2 className="sub-heading font-medium font-NeueMontreal text-secondry">
          Soralabs builds polished digital products
          <br className="sm:hidden xm:hidden" /> and reusable{" "}
          <span className="sub-heading font-medium font-NeueMontreal link-flash">
            UI systems
          </span>{" "}
          for developers — <br className="sm:hidden xm:hidden" />
          <span className="sub-heading font-medium font-NeueMontreal link-flash">
            motion-ready components
          </span>
          , design tokens, and{" "}
          <span className="sub-heading font-medium font-NeueMontreal link-flash">
            thoughtful interfaces
          </span>
          .
        </h2>
      </div>
      <div className="w-full border-y border-[#21212155] my-[50px] py-[20px]">
        <div className="padding-x pb-[50px] w-full flex sm:flex-col xm:flex-col gap-[30px] justify-between">
          <div className="w-[50%] sm:w-full xm:w-full">
            <h3 className="sub-paragraph font-medium text-secondry font-NeueMontreal">
              What you can expect?
            </h3>
          </div>
          <div className="w-[50%] sm:w-full xm:w-full">
            <div className="w-full flex gap-[30px] h-full items-end sm:items-start sm:flex-col xm:items-start xm:flex-col">
              <div className="w-[40%] sm:w-[60%] xm:w-[60%]">
                <p className="sub-paragraph font-medium font-NeueMontreal text-secondry tracking-wide">
                  We craft interfaces at the intersection of software
                  engineering, creative coding, and product design — from
                  component libraries to full product experiences.
                </p>
                <p className="sub-paragraph font-medium font-NeueMontreal text-secondry pt-[30px] tracking-wide">
                  We believe the mix of systems thinking and motion (with a bit
                  of curiosity) is what makes products feel clear, sharp, and
                  alive.
                </p>
              </div>
              <div className="w-[60%] flex justify-end flex-col  sm:w-full xm:w-full">
                <h1 className="sub-paragraph font-medium font-NeueMontreal text-secondry pb-[20px]">
                  Socials:
                </h1>
                <div className="flex flex-col">
                  {footerItems.map((item) => (
                    <LinkHover
                      key={item.id}
                      className="w-fit sub-paragraph font-medium capitalize before:h-[1px] after:h-[1px] before:bottom-[1px] after:bottom-[1px]"
                      title={item.title}
                      href={item.href}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between padding-x sm:flex-col xm:flex-col gap-[30px]">
        <div className="flex flex-col gap-[30px]">
          <Heading title="Our approach:" />
          <div
            className="w-fit flex items-center justify-between bg-secondry cursor-pointer rounded-full group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <RoundButton
              href="/ochi-team"
              title="read more"
              bgcolor="#000"
              className="bg-white text-black"
              style={{ color: "#fff" }}
              disabled
            />
          </div>
        </div>
        <div
          className={`relative w-[50%] sm:w-full xm:w-full aspect-[4/3] transition transform duration-[1.5s] ease-[.215,.61,.355,1] rounded-[15px] overflow-hidden ${
            hovered && "scale-[0.96]"
          }`}
        >
          <Image
            src={ourApproach}
            alt="Soralabs approach"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover object-left transition transform duration-[2s] ease-[.215,.61,.355,1] ${
              hovered && "scale-[1.09]"
            }`}
          />
        </div>
      </div>
    </section>
  );
}
