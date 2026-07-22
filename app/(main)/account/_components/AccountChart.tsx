"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/app/_components/ui/select';
import { Transaction, TransactionType } from '@/types/transactions.types';
import { endOfDay, format, startOfDay, subDays } from 'date-fns';
import React, { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface AccountChartProps {
    transactions?: Transaction[];
}

const DATE_RANGES = {
    "7D": { label: "Last 7 Days", days: 7 },
    "1M": { label: "Last Month", days: 30 },
    "3M": { label: "Last 3 Months", days: 90 },
    "6M": { label: "Last 6 Months", days: 180 },
    ALL: { label: "All Time", days: null },

}

type GroupedTransaction = {
    [key: string]: {
        date: string;
        income: number;
        expense: number;
    };
};

type DateRange = keyof typeof DATE_RANGES;

const AccountChart = ({ transactions = [] }: AccountChartProps) => {
    const [dateRange, setDateRange] = useState<DateRange>("1M")

    const filteredData = useMemo(() => {
        const range = DATE_RANGES[dateRange];
        const now = new Date();

        const startDate = range.days ? startOfDay(subDays(now, range.days)) : startOfDay(new Date(0));

        const filtered = transactions.filter(
            (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
        )

        const grouped = filtered.reduce<GroupedTransaction>((acc, transaction) => {
            const date = format(new Date(transaction.date), "MMM dd")

            if (!acc[date]) {
                acc[date] = { date, income: 0, expense: 0 }
            }

            if (transaction.transactionType === TransactionType.EXPENSE) acc[date].expense += transaction.amount;
            else acc[date].income += transaction.amount;
            return acc;
        }, {})

        return Object.values(grouped).sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )
    }, [transactions, dateRange])

    const totals = useMemo(() => {
        return filteredData.reduce((acc, day) => ({
            income: acc.income + day.income,
            expense: acc.expense + day.expense
        }), { income: 0, expense: 0 })
    }, [filteredData])

    return (
        <Card className='ring-1 ring-zinc-500'>
            <CardHeader className='flex items-center justify-between space-y-0 pb-7'>
                <CardTitle className='text-base font-normal'>Transaction Overview</CardTitle>
                <Select defaultValue={dateRange} onValueChange={(value) => setDateRange(value as DateRange)}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select Range" />
                    </SelectTrigger>
                    <SelectContent className='bg-[#1b1722] border-zinc-500'>
                        {Object.entries(DATE_RANGES).map(([key, { label }]) => (
                            <SelectItem key={key} value={key}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className='flex justify-around mb-6 text-sm'>
                    <div className='text-center'>
                        <p>Total Income</p>
                        <p className='text-lg font-bold text-green-500'>₹{totals.income}</p>
                    </div>
                    <div className='text-center'>
                        <p>Total Expenses</p>
                        <p className='text-lg font-bold text-red-500'>₹{totals.expense}</p>
                    </div>
                    <div className='text-center'>
                        <p>Net</p>
                        <p className={`text-lg font-bold ${totals.income - totals.expense >= 0 ? "text-green-500" : "text-red-500"}`}>₹{totals.income - totals.expense}</p>
                    </div>
                </div>
                <div className='h-[300px]'>
                    <ResponsiveContainer>
                        <BarChart
                            data={filteredData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 10,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" />
                            <YAxis tickFormatter={(value) => `₹${value}`} />
                            <Tooltip
                                formatter={(value) => `₹${value}`}
                                labelStyle={{
                                    color: "#111827",
                                    fontWeight: 600,
                                }}
                                contentStyle={{
                                    backgroundColor: "#fff",
                                    border: "1px solid #d4d4d8",
                                    borderRadius: "8px"
                                }}
                            />                            <Legend />
                            <Bar dataKey="income" name={"Income"} fill="#8884d8" activeBar={<Rectangle fill='pink' stroke='white' />} radius={[10, 10, 0, 0]} />
                            <Bar dataKey="expense" name={"Expense"} fill="#82ca9d" activeBar={<Rectangle fill='gold' stroke='grey' />} radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export default AccountChart