import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#070312] p-4 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-3xl bg-[#0F0B18] shadow-2xl lg:grid-cols-[45%_55%] lg:min-h-[90vh]">
        {/* Left Side */}
        <div className="flex items-center justify-center bg-[#120F17] px-8 py-10 lg:px-14">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>

        {/* Right Side */}
        <div className="relative hidden overflow-hidden lg:flex items-center justify-center bg-gradient-to-br from-[#0E4B66] via-[#0A5D73] to-[#073B4C] p-12">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />

          <div className="relative z-10 flex max-w-lg flex-col items-center text-center text-white">
            <div className="mb-10 grid gap-6">
              <div className="h-44 w-72 rounded-3xl bg-white/95 p-6 shadow-2xl" />
              <div className="-mt-6 ml-24 h-40 w-64 rounded-3xl bg-white/95 p-6 shadow-2xl" />
              <div className="-mt-6 mr-24 h-48 w-72 rounded-3xl bg-white/95 p-6 shadow-2xl" />
            </div>

            <h1 className="text-4xl font-bold">AI-powered Personal Finance</h1>
            <p className="mt-5 text-lg text-white/80">
              Track expenses, manage budgets, and receive intelligent financial insights with Finora.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}