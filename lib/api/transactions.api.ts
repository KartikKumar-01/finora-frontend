import { GetTransactionsResponse, Transaction } from "@/types/transactions.types";
import { api } from "../axios";

export const transactionsApi = {
  getTransactions: async (
    accountId: string
  ): Promise<Transaction[]> => {
    const response = await api.get<GetTransactionsResponse>(
      `/transactions/account/${accountId}`
    );
    console.log("In api: ", response.data)
    return response.data.data;
  },
};
