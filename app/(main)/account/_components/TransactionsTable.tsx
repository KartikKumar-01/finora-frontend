import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/app/_components/ui/table';
import { Checkbox } from '@/app/_components/ui/checkbox';
import { Transaction, TransactionType } from '@/types/transactions.types'
import { format } from 'date-fns'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/_components/ui/tooltip';
import { Badge, Clock } from 'lucide-react';
import { Category } from '@/types/category.types';
import { useCategory } from '@/lib/query/category.query';
import { useMemo } from 'react';

interface TransactionsTableProps {
    transactions?: Transaction[];
}

enum Filter {
    DATE = "DATE",
    CATEGORY = "CATEGORY",
    AMOUNT = "AMOUNT"
}

enum RECURRING_INTERVAL {
    DAILY = "Daily",
    WEEKLY = "Weekly",
    MONTHLY = "Monthly",
    YEARLY = "Yearly"
}

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {

    const { data: categories } = useCategory();
    const filteredAndSortedTransactions = transactions;


    const categoryMap = useMemo(
        () =>
            new Map(
                (categories ?? []).map((category) => [
                    category.categoryId,
                    category,
                ])
            ),
        [categories]
    );

    const handleSort = (filter: Filter) => {

    }

    return (
        <div className='space-y-4'>
            <div className='overflow-hidden rounded-xl border border-zinc-800 bg-[#1E1B4B] backdrop-blur'>
                <Table>
                    <TableHeader>
                        <TableRow className="border-zinc-800">
                            <TableHead className="h-12 text-xs font-semibold uppercase tracking-wide">
                                <Checkbox />
                            </TableHead>
                            <TableHead className='cursor-pointer transition-colors hover:text-white text-zinc-400' onClick={() => handleSort(Filter.DATE)}>
                                <div className='flex items-center justify-start'>Date</div>
                            </TableHead>
                            <TableHead className="h-12 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                                <div className='flex items-center justify-start'>Description</div>
                            </TableHead>
                            <TableHead className='cursor-pointer transition-colors hover:text-white text-zinc-400' onClick={() => handleSort(Filter.CATEGORY)}>
                                <div className='flex items-center justify-start'>Category</div>
                            </TableHead>
                            <TableHead className='cursor-pointer transition-colors hover:text-white text-zinc-400' onClick={() => handleSort(Filter.AMOUNT)}>
                                <div className='flex items-center justify-start'>Amount</div>
                            </TableHead>
                            <TableHead>
                                <div className='flex items-center justify-end text-zinc-400'>Recurring</div>
                            </TableHead>
                            <TableHead className='w-[50px]' />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAndSortedTransactions?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className='text-center'>
                                    No transactions found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredAndSortedTransactions?.map((transaction) => (
                                <TableRow className='border-zinc-800 hover:bg-zinc-900/70 transition-colors' key={transaction.transactionId}>
                                    <TableCell className="font-medium">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(transaction.date), "PP")}
                                    </TableCell>
                                    <TableCell>
                                        {transaction.description}
                                    </TableCell>
                                    <TableCell>
                                        <span className='bg-amber-700 rounded px-2 py-1 text-sm'>{categoryMap.get(transaction.categoryId)?.name}</span>
                                    </TableCell>
                                    <TableCell
                                        className='text-right font-medium'
                                        style={{
                                            color: transaction.transactionType === TransactionType.EXPENSE ? "red" : "green"
                                        }}
                                    >
                                        {transaction.transactionType === TransactionType.EXPENSE ? "-" : "+"}
                                        ₹{transaction.amount}
                                    </TableCell>
                                    <TableCell>
                                        {transaction.recurringTransactionId !== null ? (
                                            <Tooltip>
                                                <TooltipTrigger>Hover</TooltipTrigger>
                                                <TooltipContent>
                                                    <span className='bg-[#1b1722] rounded py-1 px-2 flex w-1/2 items-center gap-2'>
                                                        <Clock width={'15px'} height={'15px'} />
                                                        {RECURRING_INTERVAL[transaction.recurringTransactionId]}
                                                    </span>
                                                </TooltipContent>
                                            </Tooltip>
                                        ) : (
                                            <span className='bg-[#1b1722] rounded py-1 px-2 flex w-1/2 items-center gap-2'>
                                                <Clock width={'15px'} height={'15px'} />
                                                One-time
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>Credit Card</TableCell>
                                </TableRow>
                            ))
                        )
                        }
                    </TableBody>
                </Table>
            </div>
        </div >
    )
}

export default TransactionsTable