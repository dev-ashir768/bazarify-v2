export interface CategoryListResponse {
  status: 1 | 0;
  message: string;
  payload: {
    id: number;
    name: string;
  }[];
}

export interface ProductListResponse {
  status: 1 | 0;
  message: string;
  payload: {
    id: string;
    acno: string;
    product_name: string;
    price: string;
    sale_price: string;
    inventory_policy: string;
    image: string;
    on_sale: "N" | "Y";
    product_weight: string;
    sku_code: string;
    type: string;
    business_name: string;
  }[];
}

export interface GetProductsListParams {
  categoryId?: [number];
  maxPrice?: number;
  minPrice?: number;
}
