import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/_components/ui/card';
import { Switch } from '@/app/_components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/_components/ui/tooltip';
import { useMakeDefault } from '@/lib/query/accounts.mutation';
import { Account } from '@/types/account.types';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { toast } from 'sonner';

interface AccountCardProp {
  account: Account;
}

const AccountCard = ({ account }: AccountCardProp) => {
  const makeDefault = useMakeDefault();
  const { accountId, name, accountType, balance, defaultAccount } = account

  const handleCheckChange = (checked: boolean) => {
    if (!checked) {
      toast.error("One account must be default.");
      return;
    }
    if (defaultAccount) return;
    makeDefault.mutate(accountId);
  }

  return (
    <Card className='bg-[#1E1B4B] border border-[#4338CA80] hover:shadow-md transition-shadow group relative'>
      <CardHeader className='flex items-center justify-between pb-2'>
        <CardTitle className='text-sm font-semibold'>{name.toUpperCase()}</CardTitle>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="inline-flex">
              <Switch disabled={makeDefault.isPending} checked={defaultAccount} onCheckedChange={(checked) => handleCheckChange(checked)} className='data-[state=checked]:bg-violet-600 data-[state=unchecked]:bg-zinc-700 cursor-pointer' id="default-account" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className='bg-[#1E1A27] rounded-md p-1'>{defaultAccount ? "Default Account" : "Make account default"}</p>
          </TooltipContent>
        </Tooltip>
      </CardHeader>
      <Link href={`/account/${accountId}`}>
        <CardContent>
          <div className='text-2xl font-bold'>
            ₹{balance}
          </div>
          <p className='text-xs text-muted-foreground capitalize'>
            {accountType} Account
          </p>
        </CardContent>
        <CardFooter className='flex justify-between text-sm'>
          <div className='flex items-center'>
            <ArrowUpRight className='mr-1 h-4 w-4 text-green-500' />
            Income
          </div>
          <div className='flex items-center'>
            <ArrowDownRight className='mr-1 h-4 w-4 text-red-500' />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}

export default AccountCard