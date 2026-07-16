import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountApi } from "../api/account.api";
import { toast } from "sonner";

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });
};

export const useMakeDefault = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (accountId: string) =>  accountApi.makeDefault(accountId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      })
      toast.success(data.message)
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to update default account.");
    }
  })
}
