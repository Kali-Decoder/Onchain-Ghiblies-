"use client";
import "./globals.css";
import Providers from "@/provider/Provider";
import { Toaster } from "react-hot-toast";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster position="top-left" />
      </body>
    </html>
  );
}
