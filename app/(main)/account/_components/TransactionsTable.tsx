import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/_components/ui/table';
import { Checkbox } from '@/app/_components/ui/checkbox';
import { Transaction, TransactionType } from '@/types/transactions.types'
import { format } from 'date-fns'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/_components/ui/tooltip';
import { ChevronDown, ChevronUp, Clock, MoreHorizontal, Pencil, RefreshCw, Search, Trash, Trash2, XIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/app/_components/ui/dropdown-menu';
import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/app/_components/ui/select';
import { useTransactionDelete } from '@/lib/query/transactions.mutation';
import DeleteTransactionsDialog from './DeleteTransactionsDialog';

interface TransactionsTableProps {
    accountId: string;
    transactions?: Transaction[];
}

enum Filter {
    DATE = "DATE",
    CATEGORY = "CATEGORY",
    AMOUNT = "AMOUNT"
}


const TransactionsTable = ({ transactions = [], accountId }: TransactionsTableProps) => {

    const [seletedIds, setSelectedIds] = useState<string[]>([]);

    const defaultSort = {
        field: Filter.DATE,
        direction: "desc",
    };
    const [sortConfig, setSortConfig] = useState(defaultSort)

    const [searchTerm, setSearchTerm] = useState<string>("")
    const [typeFilter, setTypeFilter] = useState<string>("")
    const [recurringFilter, setRecurringFilter] = useState<string>("")

    const hasSortChanges = sortConfig.field !== defaultSort.field || sortConfig.direction !== defaultSort.direction

    const filteredAndSortedTransactions = useMemo(() => {
        let result = [...transactions]

        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            result = result.filter((transaction) =>
                transaction.description?.toLowerCase().includes(searchLower)
            )
        }

        if (recurringFilter) {
            result = result.filter((transaction) => {
                if (recurringFilter === "recurring") return transaction.recurringTransaction !== null;
                return transaction.recurringTransaction === null
            })
        }

        if (typeFilter) {
            result = result.filter((transaction) => transaction.transactionType === typeFilter)
        }

        result.sort((a, b) => {
            let comparison: number = 0;
            switch (sortConfig.field) {
                case Filter.DATE:
                    comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
                    break;
                case Filter.CATEGORY:
                    comparison = a.category.name.localeCompare(b.category.name)
                    break;
                case Filter.AMOUNT:
                    comparison = a.amount - b.amount
                    break;
                default:
                    comparison = 0;
                    break;
            }
            return sortConfig.direction === "asc" ? comparison : -comparison
        })

        return result;
    }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);

    const handleSort = (filter: Filter) => {
        setSortConfig((current) => ({
            field: filter,
            direction: current.field == filter && current.direction === "asc" ? "desc" : "asc"
        }))
    }

    const handleSelect = (id: string) => {
        setSelectedIds((current) => current.includes(id) ? current.filter(item => item != id) : [...current, id])
    }

    const handleSelectAll = () => {
        setSelectedIds((current) =>
            current.length === filteredAndSortedTransactions.length
                ? []
                : filteredAndSortedTransactions.map(t => t.transactionId)
        );
    };

    const handleClearFilter = () => {
        setSearchTerm("");
        setTypeFilter("");
        setRecurringFilter("");
        setSelectedIds([]);
        setSortConfig(defaultSort)
    }

    return (
        <div className='space-y-4'>

            <div className='flex flex-col sm:flex-row gap-4 items-center justify-center'>
                <div className='relative flex-1'>
                    <Search className='absolute left-2 top-2.5 h-4 w-4 ' />
                    <Input
                        className='pl-8'
                        placeholder='Search transactions...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className='flex gap-2'>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger
                            className="w-[150px] rounded-lg border-[#3a3150] bg-[#201a2d] text-gray-200 shadow-sm hover:bg-[#2a2436] focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500"
                        >
                            <SelectValue placeholder="All Types" />
                        </SelectTrigger>

                        <SelectContent
                            className="rounded-xl border border-[#3a3150] bg-[#201a2d] text-gray-200 shadow-xl"
                            position='popper'
                            align='start'
                            side='bottom'
                            sideOffset={4}
                        >
                            <SelectGroup>
                                <SelectItem
                                    value={TransactionType.INCOME}
                                    className="cursor-pointer rounded-md focus:bg-[#2a2436] focus:text-white"
                                >
                                    Income
                                </SelectItem>

                                <SelectItem
                                    value={TransactionType.EXPENSE}
                                    className="cursor-pointer rounded-md focus:bg-[#2a2436] focus:text-white"
                                >
                                    Expense
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Select value={recurringFilter} onValueChange={setRecurringFilter}>
                        <SelectTrigger
                            className="w-[150px] rounded-lg border-[#3a3150] bg-[#201a2d] text-gray-200 shadow-sm hover:bg-[#2a2436] focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500"
                        >
                            <SelectValue placeholder="All Transactions" />
                        </SelectTrigger>

                        <SelectContent
                            className=" rounded-xl border border-[#3a3150] bg-[#201a2d] text-gray-200 shadow-xl"
                            position='popper'
                            align='start'
                            side='bottom'
                            sideOffset={4}
                        >
                            <SelectGroup>
                                <SelectItem
                                    value="recurring"
                                    className="cursor-pointer rounded-md focus:bg-[#2a2436] focus:text-white"
                                >
                                    Recurring Only
                                </SelectItem>

                                <SelectItem
                                    value="non-recurring"
                                    className="cursor-pointer rounded-md focus:bg-[#2a2436] focus:text-white"
                                >
                                    One-time Only
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {
                        seletedIds.length > 0 &&
                        <div className='flex items-center gap-1'>
                            <DeleteTransactionsDialog transactionIds={seletedIds} accountId={accountId} clearSelected={setSelectedIds}>
                                <div>
                                    <Button variant={"destructive"}>
                                        <Trash className='h-4 w-4' />
                                        Delete Selected ({seletedIds.length})
                                    </Button>
                                </div>
                            </DeleteTransactionsDialog>
                        </div>
                    }

                    {
                        (searchTerm || typeFilter || recurringFilter || seletedIds.length !== 0 || hasSortChanges) &&
                        <Button variant={"outline"} size={"icon"} onClick={handleClearFilter} title='Clear Filters'>
                            <XIcon className='h-4 w-5' />
                        </Button>
                    }
                </div>
            </div>


            <div className='overflow-hidden rounded-xl border border-zinc-800 bg-[#1E1B4B] backdrop-blur'>
                <Table>
                    <TableHeader>
                        <TableRow className="border-zinc-800">
                            <TableHead className="h-12 text-xs font-semibold uppercase tracking-wide">
                                <Checkbox
                                    onCheckedChange={handleSelectAll}
                                    checked={
                                        seletedIds.length === filteredAndSortedTransactions.length && filteredAndSortedTransactions.length > 0
                                    }
                                />
                            </TableHead>
                            <TableHead className='cursor-pointer transition-colors hover:text-white text-zinc-400' onClick={() => handleSort(Filter.DATE)}>
                                <div className='flex items-center justify-start'>Date {sortConfig.field === Filter.DATE && (
                                    sortConfig.direction === "asc" ? <ChevronUp className='ml-1 h-4 w4' /> : <ChevronDown className='ml-1 h-4 w4' />
                                )}</div>
                            </TableHead>
                            <TableHead className="h-12 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                                <div className='flex items-center justify-start'>Description</div>
                            </TableHead>
                            <TableHead className='cursor-pointer transition-colors hover:text-white text-zinc-400' onClick={() => handleSort(Filter.CATEGORY)}>
                                <div className='flex items-center justify-start'>Category {sortConfig.field === Filter.CATEGORY && (
                                    sortConfig.direction === "asc" ? <ChevronUp className='ml-1 h-4 w4' /> : <ChevronDown className='ml-1 h-4 w4' />
                                )}</div>
                            </TableHead>
                            <TableHead className='cursor-pointer transition-colors hover:text-white text-zinc-400' onClick={() => handleSort(Filter.AMOUNT)}>
                                <div className='flex items-center justify-start'>Amount {sortConfig.field === Filter.AMOUNT && (
                                    sortConfig.direction === "asc" ? <ChevronUp className='ml-1 h-4 w4' /> : <ChevronDown className='ml-1 h-4 w4' />
                                )}</div>
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
                                        <Checkbox
                                            onCheckedChange={() => handleSelect(transaction.transactionId)}
                                            checked={seletedIds.includes(transaction.transactionId)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(transaction.date), "PP")}
                                    </TableCell>
                                    <TableCell>
                                        {transaction.description}
                                    </TableCell>
                                    <TableCell>
                                        <span className='rounded px-2 py-1 text-sm'
                                            style={{
                                                backgroundColor: transaction.category.colorHex
                                            }}
                                        >{transaction.category.name}</span>
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
                                        {transaction.recurringTransaction !== null ? (
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <span className='bg-[#1b1722] rounded py-1 px-2 w-28 flex items-center gap-2'>
                                                        <RefreshCw width={'15px'} height={'15px'} />
                                                        {transaction.recurringTransaction.interval.toString()}
                                                    </span>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <div className='text-sm bg-zinc-800 p-2 rounded'>
                                                        <div className='font-medium'>Next date:</div>
                                                        <div>
                                                            {format(new Date(transaction.recurringTransaction.nextRun), "PP")}
                                                        </div>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        ) : (
                                            <span className='bg-[#1b1722] rounded py-1 px-2 flex w-28 items-center gap-2'>
                                                <Clock width={'15px'} height={'15px'} />
                                                One-time
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-lg hover:bg-[#2a2436]"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="w-40 rounded-xl border border-[#2d2737] bg-[#201a2d] p-1 shadow-xl ring-0"
                                            >
                                                <DropdownMenuItem
                                                    className="cursor-pointer rounded-md text-gray-200 hover:bg-[#2a2436] focus:bg-[#2a2436] focus:text-white"
                                                >
                                                    <Pencil className="mr-2 h-4 w-4 text-blue-400" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-[#2d2737]" />
                                                <DeleteTransactionsDialog transactionIds={[transaction.transactionId]} accountId={accountId}>
                                                    <DropdownMenuItem
                                                        onSelect={(e) => e.preventDefault()}
                                                        className="cursor-pointer rounded-md text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-400"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DeleteTransactionsDialog>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
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