"use client"
import React, { useEffect, useRef } from 'react'
import { authStore } from '@/store/auth.store'
import { Loader } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const hydrate = authStore((s) => s.hydrate);
    const isLoading = authStore((s) => s.isLoading);
    const initialized = authStore((s) => s.initialized);
    const isAuthenticated = authStore((s) => s.isAuthenticated);
    const pathName = usePathname();
    const hadHydrated = useRef(false);
    
    const router = useRouter();

    useEffect(() => {
        if(initialized && !isAuthenticated && pathName != '/'){
            router.replace('/login');
        }
    }, [isAuthenticated, router, initialized, pathName])

    useEffect(() => {

        if (!initialized) {
            hydrate();
        }
    }, [initialized, hydrate]);

    if (isLoading) {
        return (
            <div className='w-full h-full flex items-center justify-center'><Loader /></div>
        )
    }
    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider