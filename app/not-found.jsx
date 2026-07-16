"use client"
import { useRouter } from 'next/navigation';
import MainShell from './_components/MainShell'
import { Button } from './_components/ui/button';
export default function NotFound() {
  const router = useRouter();
  return (
    <MainShell>
      <div className="flex flex-col h-[70vh] gap-2 items-center justify-center">
        <h1 className="text-4xl font-bold text-white">
          404 - Page Not Found
        </h1>
        <Button onClick={() => router.replace('/')} className="h-10 py-4 px-2 font-bold rounded-lg cursor-pointer bg-linear-to-r from-[#5227FF] to-[#B497CF]">
            Return Home
          </Button>
      </div>
    </MainShell>
  );
}