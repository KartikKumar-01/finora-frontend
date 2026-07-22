import { ApiResponse, BulkDeleteRequest, CreateTransactionReq, GetTransactionsResponse, Transaction } from "@/types/transactions.types";
import { api } from "../axios";

export const transactionsApi = {
  getTransactions: async (
    accountId: string
  ): Promise<Transaction[]> => {
    const response = await api.get<GetTransactionsResponse>(
      `/transactions/account/${accountId}`
    );
    return response.data.data;
  },
  createTransaction: async (req: CreateTransactionReq): Promise<ApiResponse<void>> => {
    const response = await api.post<ApiResponse<void>>('/transactions/create', req)
    return response.data;
  },
  bulkDeleteTransactions: async (req: BulkDeleteRequest): Promise<ApiResponse<void>> => {
    const response = await api.post<ApiResponse<void>>('/transactions/delete', req);
    return response.data;
  }
};
