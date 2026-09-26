import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/shared/Navbar";
import PlanProvider from "@/context/PlanContext";
import Footer from "@/components/shared/Footer";

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="fitlog">
      <body className={`${oswald.variable} ${inter.variable} antialiased`}>
        <PlanProvider>
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
           <Footer />
          <ToastContainer position="top-right" theme="dark" autoClose={2500} />
        </PlanProvider>
      </body>
    </html>
  );
}
