"use client"

import { useAccount } from '@/lib/query/accounts.query';
import { useTransactions } from '@/lib/query/transactions.query';
import { AxiosError } from 'axios';
import { Loader } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import AccountDetails from '../_components/AccountDetails';
import { dummyTransactions } from '@/data/Pasted_code_updated';
import TransactionsTable from '../_components/TransactionsTable';
import { Suspense } from 'react';
import { BarLoader } from 'react-spinners';

const AccountPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data: account, isPending: isAccountPending, error: accountError } = useAccount(id);
  const { data: transactions, isPending: isTransactionPending, error } = useTransactions(id)
  // const transactions = dummyTransactions;
  console.log(transactions)

  const transactionCount = transactions?.length ?? 0;

  if (isTransactionPending) {
    return <div className="flex h-full w-full items-center justify-center gap-2">
      <Loader className="h-5 w-5 animate-spin" />
      <span>Loading transasctions...</span>
    </div>
  }
  if (error instanceof AxiosError) {
    if (error.response?.status === 404) {
      notFound();
    }

    return <div>Something went wrong.</div>;
  }

  return (
    <div className='space-y-8 px-8 md:px-15'>
      <AccountDetails account={account} isPending={isAccountPending} error={accountError} transactionCount={transactionCount} />
      <Suspense fallback={<BarLoader className='mt-4' width={'100%'} color='white' />}>
        <TransactionsTable transactions={transactions} accountId={id}/>
      </Suspense>
    </div>
  )
}

export default AccountPage