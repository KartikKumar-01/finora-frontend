import { TransactionType } from "./transactions.types";

export interface Category{
    categoryId: string;
    userId: string;
    name: string;
    transactionType: TransactionType;
    icon: string;
    colorHex: string;
}