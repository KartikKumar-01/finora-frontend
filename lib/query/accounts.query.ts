import { useQuery } from "@tanstack/react-query";
import { accountApi } from "../api/account.api";
import { Account } from "@/types/account.types";
import { AxiosError } from "axios";

export const useAccounts = () =>
  useQuery({
    queryKey: ["accounts"],
    queryFn: accountApi.getAccounts,
  });

export const useAccount = (accountId: string) =>
  useQuery<Account, AxiosError>({
    queryKey: ["account", accountId],
    queryFn: () =>  accountApi.getAccount(accountId),
  });
