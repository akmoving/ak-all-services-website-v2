
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A&K All Services, Inc. — Instant Quote",
  description: "Premium moving • packing • junk removal — Tampa Bay & surrounding.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}