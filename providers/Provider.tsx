"use client"
import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import AuthProvider from './AuthProvider'
import { TooltipProvider } from '@/app/_components/ui/tooltip'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <TooltipProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </QueryClientProvider>
        </TooltipProvider>

    )
}

export default Providers