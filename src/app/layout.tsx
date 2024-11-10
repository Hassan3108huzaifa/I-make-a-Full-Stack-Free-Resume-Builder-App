import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/Footer";
import { ClientWrapper } from "@/components/ClientWrapper";
import { Toaster } from 'react-hot-toast'
import { Suspense } from "react";
import Loader from "@/components/Loader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Free Resume Builder | Create Professional Resumes Effortlessly",
  description: "Free Resume Builder offers a seamless way to craft professional, ATS-optimized resumes. Start building your perfect resume today with ease!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ClientWrapper>
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<div className="mt-auto h-screen flex items-center justify-center bg-white bg-opacity-80 z-50">
              <Loader />
            </div>}>
              {children}
            </Suspense>
          </main>
          <Footer />
        </ClientWrapper>
        <Toaster />
      </body>
    </html>
  );
}