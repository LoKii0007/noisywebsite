import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NoisyBg — Noise Background Library for Next.js",
  description:
    "7 SVG-powered grainy texture variants with live customization. Drop-in noise backgrounds for any Next.js + Tailwind project.",
  keywords: ["noise background", "grain texture", "next.js", "tailwind", "ui library"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-zinc-950">{children}</body>
    </html>
  );
}
