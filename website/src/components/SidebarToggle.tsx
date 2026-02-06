"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function SidebarToggle() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        {open ? "\u2715" : "\u2630"}
      </button>
      {open && (
        <>
          <div className="sidebar-overlay" onClick={() => setOpen(false)} />
          <div className="sidebar-mobile">
            <Sidebar currentPath={pathname} onNavigate={() => setOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}
