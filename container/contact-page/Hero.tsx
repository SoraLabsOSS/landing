"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { contactHero } from "@/public";
import { motion } from "framer-motion";

export default function Hero() {
  const imgInnerRef = useRef<HTMLSpanElement>(null);
  const [imgWidth, setImgWidth] = useState(0);

  const measure = useCallback(() => {
    if (imgInnerRef.current) {
      setImgWidth(imgInnerRef.current.scrollWidth);
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <section className="w-full padding-x">
      <div className="w-full flex flex-col">
        <div className="w-full margin">
          <h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
            <div className="flex flex-nowrap items-center gap-[5px] leading-[130px] lg:leading-[110px] md:leading-[85px] sm:leading-[50px] xm:leading-[45px]">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: imgWidth }}
                transition={{
                  ease: [0.86, 0, 0.07, 0.995],
                  duration: 1,
                  delay: 1.5,
                }}
                className="inline-block overflow-hidden shrink-0 leading-[inherit]"
              >
                <span ref={imgInnerRef} className="inline-block">
                  <Image
                    width={120}
                    height={50}
                    src={contactHero}
                    alt="Soralabs"
                    priority
                    onLoadingComplete={measure}
                    className="w-auto h-[95px] lg:w-auto lg:h-auto md:w-[100px] md:h-[63px] sm:w-[74px] sm:h-[45px] xm:w-[64px] xm:h-[40px] object-cover xl:mt-[15px] mt-[10px] rounded-[10px] max-w-none"
                  />
                </span>
              </motion.span>
              <span className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase shrink-0">
                LET’S START <br />
              </span>
            </div>
            A PROJECT TOGETHER
          </h1>
        </div>
        <div className="w-full pb-[15px]">
          <h3 className="paragraph font-medium text-secondry font-NeueMontreal">
            Fill the form below:
          </h3>
        </div>
      </div>
    </section>
  );
}
