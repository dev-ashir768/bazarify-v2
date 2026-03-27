import { apiPost, marketplaceApi } from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { GetProductsListParams, ProductListResponse } from "@/types";

export const ProductServices = {
  getProductsByCategory: (data: GetProductsListParams) => {
    const response = apiPost<ProductListResponse>(
      marketplaceApi,
      API_ENDPOINTS.PRODUCTS,
      {
        limit: data.limit ?? 20,
        offset: data.offset ?? 0,
        ...(data.categoryId && { marketplace_category_id: data.categoryId }),
        ...(data.minPrice !== undefined && { min_price: data.minPrice }),
        ...(data.maxPrice !== undefined && { max_price: data.maxPrice }),
      },
    );
    return response;
  },
};
