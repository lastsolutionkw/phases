import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainNavbar from "@/components/navigation/MainNavbar";
import Footer from "@/components/navigation/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phases - Your AI Mental Wellness Companion",
  description: "24/7 empathetic AI support for mental health and wellness. Chat anonymously or create an account to track your progress in a safe, judgment-free space.",
  keywords: "mental health, AI companion, wellness, support, anxiety, depression, therapy, meditation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <MainNavbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
