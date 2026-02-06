"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function SidebarDesktop() {
  const pathname = usePathname();
  return <Sidebar currentPath={pathname} />;
}
