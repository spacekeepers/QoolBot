import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/app/components/nav";

export const metadata: Metadata = {
  title: "QoolBot",
  description: "QoolBot — your AI coding companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
