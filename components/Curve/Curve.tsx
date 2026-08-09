"use client";

import { motion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { text, curve } from "@/motion";

const routes: Record<string, string> = {
  "/": "Home",
  "/contact": "Contact",
};

function normalizePathname(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function anim(variants: Variants) {
  return {
    variants,
    initial: "initial",
    animate: "enter",
    exit: "exit",
  };
}

/** Keep curve roundness similar across widths (fixed 300px is too sharp on mobile). */
function getCurveHeight(width: number) {
  return Math.round(Math.min(300, Math.max(90, width * 0.2)));
}

type CurveProps = {
  children: ReactNode;
  backgroundColor: string;
};

export default function Curve({ children, backgroundColor }: CurveProps) {
  const pathname = normalizePathname(usePathname() ?? "/");
  const [dimensions, setDimensions] = useState<{
    width: number | null;
    height: number | null;
  }>({
    width: null,
    height: null,
  });

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const curveHeight =
    dimensions.width != null ? getCurveHeight(dimensions.width) : 300;

  return (
    <div style={{ backgroundColor }} className="relative">
      <div
        style={{
          opacity: dimensions.width == null ? 1 : 0,
          height: `calc(100vh + ${curveHeight * 2}px)`,
        }}
        className="fixed w-full pointer-events-none left-0 top-0 z-50 bg-black"
      />
      <motion.p
        className="fixed left-1/2 top-[40%] -translate-x-1/2 text-white text-[50px] md:text-[40px] sm:text-[32px] xm:text-[28px] z-[60] text-center pointer-events-none whitespace-nowrap"
        {...anim(text)}
      >
        {routes[pathname] ?? "Soralabs"}
      </motion.p>
      {dimensions.width != null && dimensions.height != null && (
        <SVG
          width={dimensions.width}
          height={dimensions.height}
          curveHeight={curveHeight}
        />
      )}
      {children}
    </div>
  );
}

function SVG({
  height,
  width,
  curveHeight,
}: {
  height: number;
  width: number;
  curveHeight: number;
}) {
  const initialPath = `
        M0 ${curveHeight}
        Q${width / 2} 0 ${width} ${curveHeight}
        L${width} ${height + curveHeight}
        Q${width / 2} ${height + curveHeight * 2} 0 ${height + curveHeight}
        L0 0
    `;

  const targetPath = `
        M0 ${curveHeight}
        Q${width / 2} 0 ${width} ${curveHeight}
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `;

  const translate: Variants = {
    initial: {
      top: -curveHeight,
    },
    enter: {
      top: "-100vh",
      transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
      transitionEnd: {
        top: "100vh",
      },
    },
    exit: {
      top: -curveHeight,
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <motion.svg
      className="fixed w-full pointer-events-none left-0 top-0 z-50"
      style={{ height: `calc(100vh + ${curveHeight * 2}px)` }}
      {...anim(translate)}
    >
      <motion.path fill="black" {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
}
