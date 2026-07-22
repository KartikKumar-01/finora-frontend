import { z } from "zod";

export const addTransactionSchema = z.object({
  accountId: z.string().uuid("Please select an account"),

  categoryId: z.string().uuid("Please select a category"),

  merchant: z.string().optional(),

  description: z.string().optional(),

  date: z.date({
    error: "Please select a valid date",
  }),

  amount: z.number({
      error: "Amount is required",
    })
    .positive("Amount must be greater than 0"),

  receiptUrl: z.string().url("Invalid receipt URL").or(z.literal("")).optional(),
});

export type CreateTransactionForm = z.infer<typeof addTransactionSchema>;
