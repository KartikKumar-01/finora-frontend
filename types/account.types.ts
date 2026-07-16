export enum AccountType{
    CASH = "CASH",
    SAVINGS = "SAVINGS",
    CURRENT = "CURRENT"
}

export interface Account{
    accountId: string;
    name: string;
    accountType: AccountType;
    balance: number;
    defaultAccount: boolean;
    createdAt: string;
}

export interface CreateAccountRequest{
    name: string;
    accountType: AccountType;
    balance: number;
    defaultAccount: boolean
}

export type CreateAccountResponse = ApiResponse<Account>

export interface ApiResponse<T>{
    success: boolean;
    message: string;
    data: T;
}

export const accountTypeItems = [
    { label: "CASH", value: AccountType.CASH },
    { label: "SAVINGS", value: AccountType.SAVINGS },
    { label: "CURRENT", value: AccountType.CURRENT },
]