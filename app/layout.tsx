import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScrollVerse - Omnisovereign Digital Sovereignty",
  description: "Phase VII Omnisovereign ScrollVerse Expansion - Digital Sovereignty Infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
