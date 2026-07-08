"use client"
import React, { useEffect, useRef } from 'react'
import { authStore } from './auth.store'
import { Loader } from 'lucide-react';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const hydrate = authStore((s) => s.hydrate);
    const isLoading = authStore((s) => s.isLoading);
    const initialized = authStore((s) => s.initialized);
    const hadHydrated = useRef(false);

    useEffect(() => {
        if (initialized) return;
        hadHydrated.current = true;
        hydrate();
    }, [initialized, hydrate])

    useEffect(() => {
    console.log("AuthProvider mounted");

    if (!initialized) {
        console.log("Calling hydrate");
        hydrate();
    }
}, [initialized, hydrate]);

    if(isLoading){
        return(
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