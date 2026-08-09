"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { heroSide } from "@/public";

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
    <section
      className="w-full h-screen sm:mb-[-10px] xm:mb-[-10px]"
      data-scroll
      data-scroll-speed="-.3"
    >
      <div className="w-full h-full flex flex-col justify-between">
        <div />
        <div className="w-full flex flex-col justify-between h-[75vh] sm:h-[85vh] xm:h-[85vh]">
          <div className="w-full flex justify-between gap-[20px] pl-[50px] md:pl-[30px] sm:pl-[20px] xm:pl-[20px]">
            <div>
              <h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
                we build <br />
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
                        width={280}
                        height={164}
                        src={heroSide}
                        alt="Soralabs"
                        priority
                        onLoadingComplete={measure}
                        className="h-[95px] w-[162px] lg:h-[85px] lg:w-[145px] md:h-[63px] md:w-[108px] sm:h-[45px] sm:w-[77px] xm:h-[40px] xm:w-[68px] object-cover xl:mt-[15px] mt-[10px] md:mt-[6px] sm:mt-0 xm:mt-0 rounded-[10px] max-w-none"
                      />
                    </span>
                  </motion.span>
                  <span className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase shrink-0">
                    polished
                  </span>
                </div>
                products
              </h1>
            </div>
            <div />
          </div>
          <div className="w-full flex flex-col h-[22vh] border-t border-[#21212155] py-[20px] sm:mb-[80px] xm:mb-[80px] gap-[30px]">
            <div className="flex justify-between items-center padding-x gap-[20px] sm:flex-col sm:items-start xm:flex-col xm:items-start">
              <div className="w-[50%] xm:w-full sm:w-full">
                <p className="paragraph font-NeueMontreal text-secondry">
                  For startups and product teams
                </p>
              </div>
              <div className="w-[50%] xm:w-full sm:w-full flex justify-between xm:flex-col xm:items-start sm:flex-col sm:items-start gap-[20px]">
                <div>
                  <p className="paragraph font-NeueMontreal text-secondry">
                    From ideas to interfaces
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="flex items-center gap-[5px] group"
                >
                  <div className="rounded-[50px] border border-[#21212155] group-hover:bg-secondry py-[3px] px-[12px] transition-all duration-200 ease-in">
                    <span className="paragraph font-NeueMontreal text-secondry uppercase group-hover:text-background transition-all duration-200 ease-in">
                      let&apos;s work together
                    </span>
                  </div>
                  <div className="w-[33px] flex items-center justify-center h-[33px] border border-[#21212155] rounded-full p-[1px] group-hover:bg-secondry transition-all duration-200 ease-in xm:hidden sm:hidden">
                    <p className="font-normal text-secondry group-hover:text-background transition-all duration-200 ease-in">
                      <ArrowUpRight size={24} strokeWidth={1.25} />
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="w-full flex items-center overflow-hidden justify-center xm:hidden sm:hidden">
              <motion.p
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: "100%", opacity: 0.5 }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: [0.3, 0.86, 0.36, 0.95],
                }}
                className="paragraph opacity-50 font-NeueMontreal text-secondry"
              >
                scroll down
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
