"use client";

import { useState } from "react";
import { FaqItems } from "@/constants";
import { motion, AnimatePresence } from "framer-motion";

export default function Faq() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(
    FaqItems[0].id,
  );

  const toggleAccordion = (itemId: number) => {
    setActiveAccordion((prev) => (prev === itemId ? null : itemId));
  };

  return (
    <section className="w-full padding-y mt-[-10px] bg-background z-30 relative rounded-t-[20px]">
      <h1 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry pb-[50px]">
        A few things you <br />
        may want to ask us:
      </h1>
      {FaqItems.map((item) => (
        <div
          key={item.id}
          className={`w-full flex py-[10px] flex-col ${
            item.id == 1
              ? "border-y border-[#21212155]"
              : "border-b border-[#21212155]"
          }`}
        >
          <div className="w-full flex items-center justify-between sm:gap-[15px] xm:gap-[15px] py-[10px] padding-x">
            <div className="w-[50%] sm:w-full xm:w-full">
              <h1 className="paragraph font-normal font-NeueMontreal text-secondry">
                {item.question}
              </h1>
            </div>
            <div className="w-[50%] sm:w-full xm:w-full flex items-center justify-between">
              <div>
                <h3 className="paragraph font-normal font-NeueMontreal text-secondry">
                  {item.title}
                </h3>
              </div>
              <div className="flex items-end justify-end">
                <button
                  type="button"
                  className={`paragraph font-normal font-NeueMontreal uppercase ${
                    activeAccordion === item.id
                      ? "text-gray-300"
                      : "text-secondry link-flash"
                  }`}
                  onClick={() => toggleAccordion(item.id)}
                >
                  read
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between padding-x">
            <div className="w-[50%] sm:hidden xm:hidden" />
            <div className="w-[50%] sm:w-full xm:w-full">
              <AnimatePresence initial={false}>
                {activeAccordion === item.id && (
                  <motion.div
                    key={item.id}
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{
                      ease: [0.4, 0, 0.2, 1],
                      duration: 0.55,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-[20px] py-[30px]">
                      <p className="paragraph tracking-wider font-normal font-NeueMontreal text-secondry">
                        {item.description}
                      </p>
                      {item.links.map((link) => (
                        <div
                          key={link.id}
                          className="flex pt-[20px] sm:flex-col xm:flex-col sm:gap-[20px] xm:gap-[20px] justify-between gap-[80px]"
                        >
                          <span className="paragraph tracking-wider font-normal font-NeueMontreal text-secondry">
                            {link.title}
                          </span>
                          <p className="paragraph tracking-wider font-normal font-NeueMontreal text-secondry">
                            {link.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
