import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HaloHunt - Go Live. Sell Products. Instantly.",
  description: "HaloHunt lets you showcase products in real-time, tag them instantly, and sell to your audience with just a few taps.",
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
