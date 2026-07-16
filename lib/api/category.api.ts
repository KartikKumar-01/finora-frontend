import { Category } from "@/types/category.types";
import { api } from "../axios";
import { ApiResponse } from "@/types/transactions.types";

export const categoryApi = {
    getCategories: async (): Promise<Category[]> => {
        const response = await api.get<ApiResponse<Category[]>>('/transactions/categories');
        return response.data.data
    }
}