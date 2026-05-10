import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "AEGIS - Inventory Intelligence Platform",
  description:
    "Smart inventory management with FIFO compliance and expiry tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${jetbrainsMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#e8f4f8" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
