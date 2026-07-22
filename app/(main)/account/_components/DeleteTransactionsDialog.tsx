import { Button } from '@/app/_components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/_components/ui/dialog';
import { useTransactionDelete } from '@/lib/query/transactions.mutation';
import { Loader2 } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { BarLoader } from 'react-spinners';
import { toast } from 'sonner';

interface DeleteTransactionsDialogProps {
    children: React.ReactNode;
    transactionIds: string[];
    accountId: string;
    clearSelected?: Dispatch<SetStateAction<string[]>>
}

const DeleteTransactionsDialog = ({ children, transactionIds, accountId, clearSelected }: DeleteTransactionsDialogProps) => {
    const [open, setOpen] = useState(false);
    const deleteTransactions = useTransactionDelete(() => setOpen(false));
    const handleBulkDelete = async () => {
        try {
            await deleteTransactions.mutateAsync({ transactionIds, accountId })
            if(clearSelected) clearSelected([])
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to delete selected transactions.");
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className='border-none bg-[#1b1722]'>
                {<BarLoader  width={"95%"} color='#6366F1' loading={deleteTransactions.isPending}/>}
                <DialogHeader>
                    <DialogTitle>Delete Transactions?</DialogTitle>
                    <DialogDescription>
                        <span className='inline-block'>This action will permanently delete {transactionIds.length} transactions and update your account balance accordingly.</span>
                        <span className='inline-block'>This action cannot be undone.</span>
                    </DialogDescription>
                    <div className='flex gap-1 items-end justify-center'>
                        <Button onClick={() => setOpen(false)} className="flex-1 font-semibold bg-zinc-700" variant={"ghost"} disabled={deleteTransactions.isPending}>
                            {deleteTransactions.isPending ? <Loader2 /> : "Cancel"}
                        </Button>
                        <Button onClick={handleBulkDelete} disabled={deleteTransactions.isPending} className="flex-1 font-semibold" variant={"destructive"}>
                            {deleteTransactions.isPending ? <Loader2 /> : `Delete (${transactionIds.length}) transactions`}
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteTransactionsDialog