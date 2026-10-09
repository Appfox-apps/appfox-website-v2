"use client";

import { createContext, useContext } from "react";
import type { DesignVariant } from "@/lib/flag-key";

const DesignContext = createContext<DesignVariant>("control");

export function DesignProvider({
  design,
  children,
}: {
  design: DesignVariant;
  children: React.ReactNode;
}) {
  return <DesignContext.Provider value={design}>{children}</DesignContext.Provider>;
}

export function useDesign(): DesignVariant {
  return useContext(DesignContext);
}
