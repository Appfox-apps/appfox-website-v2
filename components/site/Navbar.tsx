"use client";

import { useDesign } from "./DesignProvider";
import { NavbarBrutalist } from "./NavbarBrutalist";
import { NavbarControl } from "./NavbarControl";

/** Header chrome follows the resolved design variant. Links stay the same. */
export function Navbar() {
  const design = useDesign();
  return design === "brutalist" ? <NavbarBrutalist /> : <NavbarControl />;
}
