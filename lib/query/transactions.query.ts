import { useQuery } from "@tanstack/react-query";
import { transactionsApi } from "../api/transactions.api";

export const useTransactions = (accountId: string) =>
  useQuery({
    queryKey: ["transactions", accountId],
    queryFn: () => transactionsApi.getTransactions(accountId),
    enabled: !!accountId,
    retry: false,
  });
