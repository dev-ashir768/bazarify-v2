"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { ProductServices } from "@/services/product.services";
import { GetProductsListParams } from "@/types";

export const useProductHooks = {
  GetList: (data: GetProductsListParams) => {
    return useQuery({
      queryKey: [
        QUERY_KEYS.PRODUCTS_LISTING,
        ...(data.categoryId ? [data.categoryId] : []),
        ...(data.maxPrice ? [data.maxPrice] : []),
        ...(data.minPrice ? [data.minPrice] : []),
      ],
      queryFn: () => ProductServices.getProductsByCategory(data),
    });
  },
};
