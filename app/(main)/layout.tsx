import type { Metadata } from "next";
import "../globals.css";
import Navbar from '@/app/_components/Navbar'

import { Geist, Geist_Mono, Oswald, Poppins } from "next/font/google";
import AuthProvider from "@/store/AuthProvider";

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

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AuthProvider>
                <header><Navbar /></header>
                <main className="w-full flex flex-col items-center  pt-25 bg-[#120f17]">
                    {children}
                </main>
            </AuthProvider>
        </>
    );
}
