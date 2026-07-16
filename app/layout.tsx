import type { Metadata } from "next";
import "./globals.css";

import { Geist, Poppins } from "next/font/google";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "sonner";
import Providers from "@/providers/Provider";

const geistSans = Geist({

  variable: "--font-geist-sans",

  subsets: ["latin"],

});


const poppins = Poppins({

  variable: "--font-heading",

  subsets: ["latin"],

  weight: ["600", "700", "800"],

});

export const metadata: Metadata = {
  title: "Finora",
  description: "Smart AI Finance Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.className} ${poppins.variable} h-full antialiased bg-[#120f17]`}
    >
      <body className="min-h-full flex flex-col text-white bg-[#120f17]">
        <Providers>
            {children}
            <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
