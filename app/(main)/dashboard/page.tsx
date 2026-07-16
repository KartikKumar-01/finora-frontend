"use client"
import AccountCard from '@/app/(main)/dashboard/_components/AccountCard'
import CreateAccountDrawer from '@/app/(main)/dashboard/_components/CreateAccountDrawer'
import { Card, CardContent } from '@/app/_components/ui/card'
import { useAccounts } from '@/lib/query/accounts.query'
import { Plus } from 'lucide-react'
import React from 'react'

const DashboardPage = () => {
    const {data: accounts, isLoading} = useAccounts();
    console.log(accounts);
    return (
        <div className='px-5'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                <CreateAccountDrawer>
                    <Card className='flex items-center justify-center hover:shadow-md transition-shadow cursor-pointer border-dashed border-zinc-500 bg-[#1E1A27]'>
                        <CardContent className='flex flex-col items-center justify-center border-dashed border-zinc-500 bg-[#1E1A27]'>
                                <Plus className='h-10 w-10 mb-2' />
                                <p className='text-sm font-medium'>Add new account</p>
                        </CardContent>
                    </Card>
                </CreateAccountDrawer>
                {accounts?.map((account) => (
                    <AccountCard key={account.accountId} account={account} />
                ))}
            </div>
        </div>
    )
}

export default DashboardPage