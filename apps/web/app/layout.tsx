import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { DocumentMetadata } from "@/components/document-metadata";
import { getLanguage } from "@/stores/language.store";
import { NavigationTracker } from "@/components/layout/navegation-track";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const defaultLanguage = getLanguage("pt");

export const metadata: Metadata = {
  title: defaultLanguage.common.title,
  description: defaultLanguage.common.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body>
        <NavigationTracker />
        <DocumentMetadata />
        <Header />
        {children}
      </body>
    </html>
  );
}
