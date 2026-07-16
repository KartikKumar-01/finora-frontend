import { Account, CreateAccountRequest, CreateAccountResponse } from "@/types/account.types";
import { api } from "../axios";
import { ApiResponse } from "@/types/auth.types";

export const accountApi = {
    create: async (data : CreateAccountRequest) : Promise<CreateAccountResponse> => {
        const response = await api.post("/account/create", data);
        return response.data;
    },
    getAccounts: async () : Promise<Account[]> => {
        const response = await api.get<ApiResponse<Account[]>>('/account');
        return response.data.data;
    }, makeDefault: async (accountId: string): Promise<ApiResponse<void>> => {
        const response = await api.patch<ApiResponse<void>>(`/account/make-default/${accountId}`);
        return response.data;
    },
    getAccount: async (accoundId: string) : Promise<Account> => {
        const response = await api.get<ApiResponse<Account>>(`/account/${accoundId}`)
        return response.data.data;
    }
}