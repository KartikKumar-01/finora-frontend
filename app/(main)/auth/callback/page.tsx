"use client"
import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation';
import { authStore } from '@/store/auth.store';

const AuthCallBackPage = () => {
  const isAuthenticated = authStore((s) => s.isAuthenticated);
  const isLoading = authStore((s) => s.isLoading);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      router.replace("/");
    } else {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  return (
    <div className='w-full h-full flex items-center justify-center'>
      Signing you in...
    </div>
  )
}

export default AuthCallBackPage;