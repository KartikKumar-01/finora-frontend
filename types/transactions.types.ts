export enum TransactionType {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
}

export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum RecurringInterval {
  DAILY = "Daily",
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
  YEARLY = "Yearly",
}

export interface CategorySummary {
  categoryId: string;
  name: string;
  icon: string;
  colorHex: string;
}

export interface RecurringSummary {
  recurringTransactionId: string;
  interval: RecurringInterval;
  active: boolean;
  nextRun: string;
}

export interface Transaction {
  transactionId: string;
  userId: string;
  accountId: string;
  transactionType: TransactionType;
  transactionStatus: TransactionStatus;
  amount: number;
  merchant: string | null;
  description: string | null;
  date: string;
  receiptUrl: string;
  category: CategorySummary;
  recurringTransaction: RecurringSummary | null;
}

export interface CreateTransactionReq{
    accountId: string;
    categoryId: string;
    merchant?: string;
    description?: string;
    date: Date;
    amount: number;
    receiptUrl?: string
}

export type GetTransactionsResponse = ApiResponse<Transaction[]>;
export type BulkDeleteRequest = {
  accountId: string;
  transactionIds: string[];
};

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
