import { Account } from '@/types/account.types'
import { AxiosError } from 'axios';
import { Loader } from 'lucide-react';
import { notFound } from 'next/navigation';
import GradientText from '@/app/_components/GradientText';

interface AccountDetailsProp {
    account?: Account;
    isPending: boolean;
    error: AxiosError | null
    transactionCount: number
}

const AccountDetails = ({ account, isPending, error, transactionCount }: AccountDetailsProp) => {
    if (isPending) {
        return <div className="flex h-full w-full items-center justify-center gap-2">
            <Loader className="h-5 w-5 animate-spin" />
            <span>Loading account details...</span>
        </div>
    }

    if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
            notFound();
        }

        return <div>Something went wrong.</div>;
    }
    return (
        <div className='flex gap-4 items-center justify-between'>
            <div>
                <h1 className='text-5xl sm:text-6xl font-bold tracking-tight'>
                    <GradientText
                        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
                        animationSpeed={0}
                        showBorder={false}
                        className="text-4xl tracking-wider"
                    >
                        {account?.name.toUpperCase()}
                    </GradientText></h1>
                <p className='text-muted-foreground pl-1'>{account?.accountType} Account</p>
            </div>
            <div className='text-right pb-2'>
                <div className='text-xl sm:text-2xl font-bold'>₹{account?.balance}</div>
                <p className='text-sm'>{transactionCount} Transactions</p>
            </div>
        </div>
    )
}

export default AccountDetails