import { Category } from "@/types/category.types";


export const getCategoryFromTransactionId = (categoryId: string, categories: Category[]): Category | undefined => {
    return categories.find((c) => c.categoryId === categoryId);
}