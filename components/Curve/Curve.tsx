"use client";

import { motion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { text, curve, translate } from "@/motion";

const routes: Record<string, string> = {
	"/": "Home",
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

type CurveProps = {
  children: ReactNode;
  backgroundColor: string;
};

export default function Curve({ children, backgroundColor }: CurveProps) {
  // Live destination path (updates as soon as navigation starts), same as Pages router.route
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

  return (
    <div style={{ backgroundColor }} className="relative">
      <div
        style={{ opacity: dimensions.width == null ? 1 : 0 }}
        className="fixed h w-full pointer-events-none left-0 top-0 z-50 bg-black"
      />
      <motion.p
        className="fixed left-1/2 top-[40%] -translate-x-1/2 text-white text-[50px] z-[60] text-center pointer-events-none whitespace-nowrap"
        {...anim(text)}
      >
        {routes[pathname] ?? "Soralabs"}
      </motion.p>
      {dimensions.width != null && dimensions.height != null && (
        <SVG width={dimensions.width} height={dimensions.height} />
      )}
      {children}
    </div>
  );
}

function SVG({ height, width }: { height: number; width: number }) {
  const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `;

  const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `;

  return (
    <motion.svg
      className="fixed h w-full pointer-events-none left-0 top-0 z-50"
      {...anim(translate)}
    >
      <motion.path fill="black" {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
}
