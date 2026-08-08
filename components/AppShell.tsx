"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FrozenRouter from "@/components/FrozenRouter";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      new LocomotiveScroll();
    })();
  }, []);

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.div
          key={pathname}
          className="relative min-h-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 1,
            transition: {
              duration: 1.1,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
}
