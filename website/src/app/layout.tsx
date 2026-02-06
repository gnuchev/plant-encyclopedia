import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SidebarDesktop from "@/components/SidebarDesktop";
import SidebarToggle from "@/components/SidebarToggle";
import Footer from "@/components/Footer";
import "./globals.css";
import "./layout.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Plants Encyclopedia",
    template: "%s | Plants Encyclopedia",
  },
  description:
    "A comprehensive guide to landscape design, plant care, and garden planning for Florida (Zone 10A) and California (Zone 9).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SidebarToggle />
        <div className="layout">
          <aside className="sidebar-desktop">
            <SidebarDesktop />
          </aside>
          <main className="main-content">
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
