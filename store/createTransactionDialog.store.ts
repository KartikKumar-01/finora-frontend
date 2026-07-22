import { create } from "zustand";

type CreateTransactionDialogStore = {
  isOpen: boolean;
  accountId?: string;
  open: (accountId?: string) => void;
  close: () => void;
};

export const useTransactionDialogStore = create<CreateTransactionDialogStore>(
  (set) => ({
    isOpen: false,
    accountId: undefined,
    open: (accountId?: string) =>
      set({
        isOpen: true,
        accountId,
      }),

    close: () =>
      set({
        isOpen: false,
        accountId: undefined,
      }),
  })
);
