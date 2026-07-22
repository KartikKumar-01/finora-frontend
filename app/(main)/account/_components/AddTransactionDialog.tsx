"use client"

import { Button } from '@/app/_components/ui/button';
import { Calendar } from '@/app/_components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/app/_components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/app/_components/ui/field';
import { Input } from '@/app/_components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/app/_components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/_components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/app/_components/ui/select';
import { useAccount, useAccounts } from '@/lib/query/accounts.query';
import { useCategory } from '@/lib/query/category.query';
import { useTransactionCreate } from '@/lib/query/transactions.mutation';
import { addTransactionSchema } from '@/schemas/addTransaction';
import { useTransactionDialogStore } from '@/store/createTransactionDialog.store';
import { Account } from '@/types/account.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ChevronDownIcon, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod'

const AddTransacitonDialog = () => {

  const [dateOpen, setDateOpen] = useState(false);
  const createTransaction = useTransactionCreate()
  const { isOpen, close, accountId } = useTransactionDialogStore();
  const { data: categories } = useCategory()

  const { data: account } = useAccount(accountId!)

  const { data: accounts } = useAccounts();


  const form = useForm<z.input<typeof addTransactionSchema>>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      accountId: accountId ?? "",
      categoryId: "",
      merchant: "",
      description: "",
      date: new Date(),
      amount: 0,
      receiptUrl: ""
    },
  })

  useEffect(() => {
    if (accountId) form.setValue("accountId", accountId);
  }, [accountId, form])

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset({
        accountId: accountId ?? "",
        categoryId: "",
        merchant: "",
        description: "",
        amount: 0,
        date: new Date(),
        receiptUrl: "",
      });

      close();
    }
  };

  const addTransaction = async (data: z.infer<typeof addTransactionSchema>) => {
    try {
      const { success, message } = await createTransaction.mutateAsync(data)
      if (!success) throw new Error(message);

      form.reset({
        accountId: accountId ?? "",
        categoryId: "",
        merchant: "",
        description: "",
        amount: 0,
        date: new Date(),
        receiptUrl: "",
      });

      close();
      createTransaction.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create account.");
    }
  }



  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-[#1b1722] border-none">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <div className='m-4'>
          <form id="form-add-transaction" onSubmit={form.handleSubmit(addTransaction)}>
            <FieldGroup>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

                <Controller
                  name="accountId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      {
                        accountId ? (
                          <div className='space-y-2 w-full'>
                            <p>Selected account</p>
                            <Input
                              value={account?.name ?? ""}
                              disabled
                              className='h-8'
                            />
                          </div>
                        ) : (
                          <div className='space-y-2 w-full'>
                            <p>Choose account</p>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full border-zinc-500">
                                <SelectValue placeholder="Select account" />
                              </SelectTrigger>
                              <SelectContent className='bg-[#1b1722] border-zinc-500'>
                                <SelectGroup className='border-zinc-500'>
                                  <SelectLabel>Account</SelectLabel>
                                  {accounts?.map((a) => (
                                    <SelectItem key={a.accountId} value={a.accountId}>
                                      {a.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        )
                      }
                      {fieldState.error && (
                        <p className="text-sm text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name='categoryId'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-2 w-full">
                      <p>Choose category</p>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full border-zinc-500">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className='bg-[#1b1722] border-zinc-500'>
                          <SelectGroup className='border-zinc-500'>
                            <SelectLabel>Categorye</SelectLabel>
                            {categories?.map((item) => (
                              <SelectItem key={item.categoryId} value={item.categoryId}>
                                {item.name}
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
              </div>

              <Controller
                name="merchant"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Merchant</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. Amazon, Starbucks, Reliance Fresh (optional)"
                      autoComplete="off"
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-description">
                      Description
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="form-add-transaction-description"
                        placeholder="Add a note about this transaction (optional)"
                        rows={6}
                        className="min-h-18 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                    </InputGroup>
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="amount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-create-account-balance">
                      Amount
                    </FieldLabel>
                    <Input
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="date"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Date & Time</FieldLabel>

                    <div className="flex gap-4">
                      {/* Date Picker */}
                      <Popover open={dateOpen} onOpenChange={setDateOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-44 justify-between font-normal"
                          >
                            {field.value
                              ? format(field.value, "PPP")
                              : "Select date"}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent
                          className="w-auto overflow-hidden p-0 bg-[#1b1722]"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            captionLayout="dropdown"
                            defaultMonth={field.value}
                            onSelect={(selectedDate) => {
                              if (!selectedDate) return;

                              const current = field.value ?? new Date();
                              const newDate = new Date(selectedDate);

                              // Preserve the current time
                              newDate.setHours(current.getHours());
                              newDate.setMinutes(current.getMinutes());
                              newDate.setSeconds(current.getSeconds());
                              newDate.setMilliseconds(current.getMilliseconds());

                              field.onChange(newDate);
                              setDateOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>

                      {/* Time Picker */}
                      <Input
                        className='h-8'
                        type="time"
                        value={field.value ? format(field.value, "HH:mm") : ""}
                        onChange={(e) => {
                          const [hours, minutes] = e.target.value.split(":").map(Number);

                          const newDate = new Date(field.value ?? new Date());

                          newDate.setHours(hours);
                          newDate.setMinutes(minutes);
                          newDate.setSeconds(0);
                          newDate.setMilliseconds(0);

                          field.onChange(newDate);
                        }}
                      />
                    </div>

                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="receiptUrl"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Upload Receipt</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="(optional)"
                      autoComplete="off"
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </div>
        <Button type="submit" disabled={createTransaction.isPending} form="form-add-transaction" className="w-full font-semibold bg-violet-600 h-10 mt-4">
          {createTransaction.isPending ? <Loader2 /> : "Add Transaction"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default AddTransacitonDialog