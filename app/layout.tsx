import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import ParallaxProvider from "@/components/provider/ParallaxProvider";
import Head from "next/head";
import NewBlogPostHeader from "@/components/NewBlogPostHeader";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Email Wallet",
  description: "Email money to anyone.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(inter.className, "overflow-x-clip overflow-y-scroll")}
      >
        <ParallaxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NewBlogPostHeader />
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </ParallaxProvider>
      </body>
    </html>
  );
}
