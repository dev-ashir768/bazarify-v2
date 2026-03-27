"use client";

import { LoadingSkeleton } from "@/components/shared/loading-skeleton";
import CategoryFilters from "../category-filter/category-filters";
import ProductCard from "../products/product-card";
import HomeHero from "./home-hero";
import { useProductHooks } from "@/hooks/useProductHooks";
import { ErrorState } from "@/components/shared/error-state";
import { useSearchParams } from "next/navigation";
import { useCategoryHooks } from "@/hooks/useCategoryHooks";
import { GetProductsListParams } from "@/types";

const HomeWrapper = () => {
  // ========================= URL Params ========================= \\
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  // ========================= Data Fetching ========================= \\
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesIsError,
    refetch: categoriesRefetch,
  } = useCategoryHooks.getList();

  const categoryId = categories?.payload?.find(
    (item) => item.name.toLowerCase() === category?.toLowerCase(),
  )?.id;

  const data: GetProductsListParams = {
    categoryId: categoryId ? [categoryId] : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
  };

  const {
    data: products,
    isLoading: productsLoading,
    isError: productsIsError,
    refetch: productsRefetch,
  } = useProductHooks.GetList(data);

  // ========================= Render ========================= \\
  const isLoading = categoriesLoading || productsLoading;
  const isError = categoriesIsError || productsIsError;
  const refetch = () => {
    productsRefetch();
    categoriesRefetch();
  };

  const renderProductCards = () => {
    if (isLoading)
      return Array.from({ length: 10 }).map((_, i) => (
        <LoadingSkeleton.ProductCardSkeleton key={i} />
      ));

    if (isError)
      return (
        <div className="col-span-full py-10">
          <ErrorState onRetry={() => refetch()} />
        </div>
      );

    if (products?.payload?.length === 0) {
      return (
        <div className="col-span-full py-10">
          <ErrorState
            title="No products found"
            message="No products found matching your criteria"
          />
        </div>
      );
    }

    return products?.payload?.map((item) => (
      <ProductCard key={item.id} {...item} />
    ));
  };

  return (
    <>
      <section className="pb-8">
        <HomeHero />
        <CategoryFilters />
      </section>
      <section className="container pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-8">
          {renderProductCards()}
        </div>
      </section>
    </>
  );
};

export default HomeWrapper;
