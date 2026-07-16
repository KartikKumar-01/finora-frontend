import { AccountType } from "@/types/account.types";
import {z} from "zod";

const createAccountSchema = z.object({
    name: z.string().min(3, "Please enter atleast 3 characters.")
    .max(50, "Account name cannot exceed 50 characters."),
    accountType: z.enum(AccountType),
    balance: z.number().min(0.0, "Balance cannot be negative."),
    defaultAccount: z.boolean()
})

export default createAccountSchema;