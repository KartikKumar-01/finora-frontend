import {
  BulkDeleteRequest,
  CreateTransactionReq,
} from "@/types/transactions.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsApi } from "../api/transactions.api";
import { toast } from "sonner";
import { CreateAccountRequest } from "@/types/account.types";

export const useTransactionDelete = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: BulkDeleteRequest) =>
      transactionsApi.bulkDeleteTransactions(req),
    onSuccess: async (data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["transactions", variables.accountId],
        }),

        queryClient.invalidateQueries({
          queryKey: ["account", variables.accountId],
        }),

        queryClient.invalidateQueries({
          queryKey: ["accounts"],
        }),
      ]);
      toast.success(data.message);
      onSuccess?.();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to delete the transactions.");
    },
  });
};

export const useTransactionCreate = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: CreateTransactionReq) =>
      transactionsApi.createTransaction(req),
    onSuccess: async (data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["transactions", variables.accountId],
        }),

        queryClient.invalidateQueries({
          queryKey: ["account", variables.accountId],
        }),

        queryClient.invalidateQueries({
          queryKey: ["accounts"],
        }),
      ]);
      toast.success(data.message);
      onSuccess?.();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create the transaction.");
    },
  });
};
