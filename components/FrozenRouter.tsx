"use client";

import { useContext, useRef, type ReactNode } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

/** Keeps exiting route content frozen while AnimatePresence runs exit animations. */
export default function FrozenRouter({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}
