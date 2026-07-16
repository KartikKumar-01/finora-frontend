import { useQuery } from "@tanstack/react-query"
import { categoryApi } from "../api/category.api"

export const useCategory = () => 
    useQuery({
        queryKey: ["categories"],
        queryFn: categoryApi.getCategories,
        staleTime: 1000 * 60 * 10
    })