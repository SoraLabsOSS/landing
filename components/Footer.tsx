"use client";

import Link from "next/link";
import { LinkHover, TextMask } from "@/animation";
import { footerItems, footernavbarItems } from "@/constants";

export default function Footer() {
  const phrase = ["From", "ideas"];
  const phrase1 = ["TO INTERFACES"];
  return (
    <footer className="w-full min-h-screen padding-x z-30 relative pt-[40px] bg-background flex flex-col justify-between rounded-t-[20px] mt-[-20px]">
      <div className="w-full flex justify-between sm:flex-col xm:flex-col">
        <div className="flex flex-col justify-between sm:w-full xm:w-full w-1/2">
          <h1 className="text-[150px] leading-[115px] lg:text-[130px] lg:leading-[98px] md:text-[100px] md:leading-[75px] sm:text-[74px] sm:leading-[68px] xm:text-[64px] xm:leading-[48px] font-semibold font-FoundersGrotesk text-secondry uppercase">
            <TextMask>{phrase}</TextMask>
          </h1>
        </div>
        <div className="h-full flex flex-col justify-between sm:w-full xm:w-full w-1/2">
          <div>
            <h1 className="text-[150px] leading-[115px] lg:text-[130px] lg:leading-[98px] md:text-[100px] md:leading-[75px] sm:text-[74px] sm:leading-[68px] xm:text-[64px] xm:leading-[48px] font-semibold font-FoundersGrotesk text-secondry uppercase">
              <TextMask>{phrase1}</TextMask>
            </h1>
            <div className="pt-[50px]">
              <h1 className="paragraph font-medium font-NeueMontreal text-secondry pb-[20px]">
                Socials:
              </h1>
              {footerItems.map((item) => (
                <LinkHover
                  title={item.title}
                  href={item.href}
                  key={item.id}
                  className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium text-secondry capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
                />
              ))}
            </div>
            <div className="flex justify-between">
              <div className="pt-[50px]">
                <h1 className="paragraph font-medium font-NeueMontreal text-secondry pb-[20px]">
                  Location:
                </h1>
                <div className="flex flex-col gap-y-[10px]">
                  <LinkHover
                    className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
                    title="Based in Vietnam"
                    href="/"
                  />
                  <LinkHover
                    className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
                    title="Remote-first"
                    href="/"
                  />
                </div>
              </div>
              <div className="pt-[50px]">
                <h1 className="paragraph font-medium font-NeueMontreal text-secondry pb-[20px]">
                  Menu:
                </h1>
                <div className="flex flex-col">
                  {footernavbarItems.map((item) =>
                    item.disabled ? (
                      <span
                        key={item.id}
                        aria-disabled="true"
                        className="block w-fit paragraph font-medium text-secondry/35 capitalize cursor-not-allowed select-none"
                      >
                        {item.title}
                      </span>
                    ) : (
                      <LinkHover
                        key={item.id}
                        title={item.title}
                        href={item.href}
                        className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium text-secondry capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
            <div className="pt-[50px] flex gap-x-[20px] max-w-full overflow-hidden">
              <h1 className="paragraph font-medium font-NeueMontreal text-secondry shrink-0">
                Email:
              </h1>
              <LinkHover
                title="truonggiang.axyl@gmail.com"
                href="mailto:truonggiang.axyl@gmail.com"
                className="before:h-[1px] after:h-[1px] paragraph font-medium before:bottom-[-3px] after:bottom-[-3px] min-w-0 break-all"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pt-[40px] pb-[30px] flex justify-between sm:flex-col xm:flex-col sm:gap-[20px] xm:gap-[20px]">
        <div className="w-1/2 sm:w-full xm:w-full">
          <Link
            href="/"
            className="paragraph font-semibold font-NeueMontreal text-secondry uppercase tracking-tight"
          >
            Soralabs
          </Link>
        </div>
        <div className="w-1/2 h-full flex gap-[10px] justify-between items-end sm:w-full xm:w-full sm:flex-col xm:flex-col sm:items-start xm:items-start">
          <div className="flex items-center gap-x-[10px]">
            <h1 className="paragraph font-medium font-NeueMontreal text-secondry opacity-40">
              © Soralabs 2024 – 2026.
            </h1>
            <LinkHover
              title="Legal Terms"
              href="/"
              className="before:h-[1px] after:h-[1px] paragraph font-medium text-secondry opacity-40 before:bottom-[-3px] after:bottom-[-3px]"
            />
          </div>
          <div>
            <LinkHover
              title="Built in Vietnam"
              href="https://github.com/axyl1410"
              className="before:h-[1px] after:h-[1px] paragraph font-medium text-secondry opacity-40 before:bottom-[-3px] after:bottom-[-3px]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
