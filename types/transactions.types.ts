export enum TransactionType{
    EXPENSE = "EXPENSE",
    INCOME = "INCOME"
}

export enum TransactionStatus{
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}

export interface Transaction{
    transactionId: string;
    userId: string;
    accountId: string;
    categoryId: string;
    recurringTransactionId: string | null;
    transactionType: TransactionType;
    transactionStatus: TransactionStatus;
    amount: number;
    merchant: string | null;
    description: string | null;
    date: string;
    receiptUrl: string;
}

export type GetTransactionsResponse = ApiResponse<Transaction[]>



export interface ApiResponse<T>{
    success: boolean;
    message: string;
    data: T;
}