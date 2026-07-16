"use client"
import React from 'react'
import { useMediaQuery } from "@/hooks/use-media-query"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../_components/ui/dialog'
import { Button } from '../../../_components/ui/button'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '../../../_components/ui/drawer'
import { Label } from '../../../_components/ui/label'
import { Input } from '../../../_components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import createAccountSchema from '@/schemas/createAccount'
import { zodResolver } from '@hookform/resolvers/zod'
import { AccountType, accountTypeItems } from '@/types/account.types'
import { z } from 'zod'
import { Field, FieldError, FieldGroup, FieldLabel } from '../../../_components/ui/field'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../_components/ui/select'
import { Switch } from '../../../_components/ui/switch'
import { toast } from 'sonner'
import { useCreateAccount } from '@/lib/query/accounts.mutation'
import { Loader2 } from 'lucide-react'

type AccountFormProps = React.ComponentProps<"form"> & {
    onSuccess: () => void;
};


const CreateAccountDrawer = ({children} : {children: React.ReactNode}) => {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const handleSuccess = () => {
        setOpen(false)
    }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-[#1b1722] border-none">
                    <DialogHeader>
                        <DialogTitle>Create Account</DialogTitle>
                        <DialogDescription>
                            Create an account to start calculating expenses.
                        </DialogDescription>
                    </DialogHeader>
                    <AccountForm onSuccess={handleSuccess} />
                </DialogContent>
            </Dialog>
        )
    }
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className='border-none bg-[#1b1722]'>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Create Account</DrawerTitle>
                    <DrawerDescription>
                        Create an account to start calculating expenses.
                    </DrawerDescription>
                </DrawerHeader>
                <AccountForm onSuccess={handleSuccess} className="p-4" />
            </DrawerContent>
        </Drawer>
    )
}
function AccountForm({ className, onSuccess }: AccountFormProps) {

    const createAccount = useCreateAccount()


    const createAccountForm = useForm<z.infer<typeof createAccountSchema>>({
        resolver: zodResolver(createAccountSchema),
        defaultValues: {
            name: "",
            balance: 0,
            accountType: AccountType.SAVINGS,
            defaultAccount: false,
        }
    })

    const handleFormSubmit = async (values: z.infer<typeof createAccountSchema>) => {
        try {
            const { success, message } = await createAccount.mutateAsync(values)
            if (!success) throw new Error(message);

            toast.success(message);
            createAccountForm.reset();
            onSuccess();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to create account.");
        }
    }

    return (
        <div className='m-5'>
            <form id="form-create-account" onSubmit={createAccountForm.handleSubmit(handleFormSubmit)}>
                <FieldGroup>
                    <Controller
                        name="name"
                        control={createAccountForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-create-account-name">
                                    Name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-create-account-name"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter name of the account"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="balance"
                        control={createAccountForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-create-account-balance">
                                    Balance
                                </FieldLabel>
                                <Input
                                    type="number"
                                    value={field.value}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name='accountType'
                        control={createAccountForm.control}
                        render={({ field, fieldState }) => (
                            <div className="space-y-2 ">
                                <p>Choose account type</p>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full max-w-48 border-zinc-500">
                                        <SelectValue placeholder="Select account type" />
                                    </SelectTrigger>
                                    <SelectContent className='bg-[#1b1722] border-zinc-500'>
                                        <SelectGroup className='border-zinc-500'>
                                            <SelectLabel>Account Type</SelectLabel>
                                            {accountTypeItems.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {fieldState.error && (
                                    <p className="text-sm text-red-500">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                    <Controller
                        name='defaultAccount'
                        control={createAccountForm.control}
                        render={({ field, fieldState }) => (
                            <div className="flex items-center space-x-2 border px-2 py-3 border-zinc-500 rounded-lg">
                                <Switch className='data-[state=checked]:bg-violet-600 data-[state=unchecked]:bg-zinc-700' id="default-account" checked={field.value} onCheckedChange={field.onChange} />
                                <div className='flex flex-col gap-1'>
                                    <Label htmlFor="default-account">Set as Default</Label>
                                    <p className='text-sm text-zinc-400'>This account will be selected by default for transations.</p>
                                </div>
                                {fieldState.error && (
                                    <p className="text-sm text-red-500">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                </FieldGroup>
                <Button type="submit" disabled={createAccount.isPending} form="form-create-account" className="w-full font-semibold bg-violet-600 h-10 mt-4">
                    {createAccount.isPending ? <Loader2 /> : "Create Account"}
                </Button>
            </form>
        </div>
    )
}

export default CreateAccountDrawer