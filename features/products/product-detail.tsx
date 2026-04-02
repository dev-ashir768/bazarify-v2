"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import ImageFallback from "@/lib/image-fallback";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PUBLIC_ROUTES } from "@/lib/constants";
import { useProductHooks } from "@/hooks/useProductHooks";
import ProductDetailSkeleton from "@/components/shared/product-detail-skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { Lens } from "@/components/ui/lens";
import { FloatingSelect } from "@/components/ui/floating-select";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProductInventory, ProductVariation } from "@/types";
import { formattedAmount } from "@/lib/formated-amount";

interface ProductDetailProps {
  productId: number;
  acno: string;
}

const ProductDetail = ({ productId, acno }: ProductDetailProps) => {
  // ========================= Hooks ========================= \\
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [activeThumb, setActiveThumb] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [hovering, setHovering] = useState(false);

  React.useEffect(() => {
    if (!mainApi || !thumbApi) return;
    const onSelect = () => {
      const selected = mainApi.selectedScrollSnap();
      setActiveThumb(selected);

      const inView = thumbApi.slidesInView();
      if (!inView.includes(selected)) {
        thumbApi.scrollTo(selected);
      }
    };

    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);

    return () => {
      mainApi.off("select", onSelect);
    };
  }, [mainApi, thumbApi, setQuantity]);

  // ========================= Data Fetching ========================= \\
  const {
    data: productDetail,
    isLoading,
    isError,
    error,
    refetch,
  } = useProductHooks.GetDetail({
    product_id: productId,
    acno: acno,
  });

  // ========================= Handlers ========================= \\
  const onThumbClick = (index: number) => {
    if (!mainApi || !thumbApi) return;
    mainApi.scrollTo(index);
  };

  const handleAttributeSelection = (attrName: string, value: string | null) => {
    setSelectedAttributes((prev) => {
      const updatedAttributes = { ...prev };

      if (!value) {
        delete updatedAttributes[attrName];
      } else {
        updatedAttributes[attrName] = value;
      }

      return updatedAttributes;
    });
  };

  // Router for navigation
  const router = useRouter();

  // Add to cart handler
  const handleAddToCart = () => {
    // Determine which variation (if any) is selected
    const variation = selectedVariation;
    const cartItemId = `${productId}__${variation?.variation_id ?? "default"}`;
    const price = isSimpleProduct
      ? productDetail?.payload.default_price
      : variation?.price ?? productDetail?.payload.default_price;

    const variationLabel = variation
      ? Object.entries(variation.combination)
          .map(([k, v]) => `${k}: ${v}`)
          .join(" / ")
      : undefined;
    const skuCode = variation?.sku_code ?? productDetail?.payload.default_sku_code;

    // Get values safely with fallbacks to avoid lint errors on ! assertions
    const pPayload = productDetail?.payload;
    if (!pPayload) return;

    useCartStore.getState().addItem({
      cartItemId,
      productId: pPayload.id,
      acno,
      productName: pPayload.product_name,
      image,
      price: price || pPayload.default_price,
      variationId: variation?.variation_id,
      variationLabel,
      skuCode: skuCode || pPayload.default_sku_code,
      maxStock: stock,
      quantity,
    });
    toast.success("Added to cart");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push(PUBLIC_ROUTES.CART);
  };

  const isPartialMatch = (
    variation: ProductVariation,
    selectedAttributes: Record<string, string>,
  ) => {
    return Object.entries(selectedAttributes).every(
      ([key, value]) => variation.combination[key] === value,
    );
  };

  const selectedVariation = productDetail?.payload.variations.find((v) =>
    isPartialMatch(v, selectedAttributes),
  );

  const isOptionAvailable = (attrName: string, optionValue: string) => {
    return productDetail?.payload.variations.some((v) =>
      isPartialMatch(v, {
        ...selectedAttributes,
        [attrName]: optionValue,
      }),
    );
  };
  // Resolve the full image URL to display for the cart item
  const resolvedImage = useMemo(() => {
    const filename = selectedVariation?.variation_image || productDetail?.payload.default_image;
    
    if (!filename) {
      return "https://placehold.co/600x600/F6F6F6/474747/png?text=No+Image";
    }

    return `${process.env.NEXT_PUBLIC_API_BASE_URL_GET_ORIO}/uploads/${acno}/${filename}`;
  }, [selectedVariation, productDetail, acno]);
  const image = resolvedImage;
  const isSimpleProduct =
    !productDetail?.payload.attributes.length &&
    !productDetail?.payload.variations.length;

  const getStock = (variation: ProductVariation) => {
    return variation.inventory.reduce(
      (total: number, inv: ProductInventory) => {
        return total + inv.quantity;
      },
      0,
    );
  };

  const getDefaultStock = () => {
    return (
      productDetail?.payload.default_inventory.reduce(
        (total: number, inv: ProductInventory) => total + inv.quantity,
        0,
      ) || 0
    );
  };

  const stock = isSimpleProduct
    ? getDefaultStock()
    : selectedVariation
      ? getStock(selectedVariation)
      : 0;

  useEffect(() => {
    if (isSimpleProduct) {
      if (stock === 0) {
        setQuantity(0);
      } else if (quantity > stock) {
        setQuantity(stock);
      } else if (quantity === 0) {
        setQuantity(1);
      }
      return;
    }

    if (!selectedVariation) {
      setQuantity(1);
      return;
    }

    if (stock === 0) {
      setQuantity(0);
    } else if (quantity > stock) {
      setQuantity(stock);
    } else if (quantity === 0) {
      setQuantity(1);
    }
  }, [selectedVariation, stock, isSimpleProduct, quantity]);

  // ========================= Render ========================= \\
  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (isError) {
    return <ErrorState onRetry={refetch} message={error?.message} />;
  }

  return (
    <>
      <Breadcrumb className="mb-4 sm:mb-8">
        <BreadcrumbList className="text-sm! font-normal">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={PUBLIC_ROUTES.HOME}>Marketplace</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium truncate md:max-w-full max-w-[200px]">
              {productDetail?.payload.product_name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <div className="lg:col-span-7 xl:col-span-6 xl:max-w-[650px] w-full flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="order-2 sm:order-1 shrink-0 sm:w-24">
            <Carousel
              setApi={setThumbApi}
              orientation="vertical"
              className="w-full"
              opts={{
                align: "start",
                containScroll: "keepSnaps",
                dragFree: true,
              }}
            >
              <CarouselContent
                viewportClassName="max-h-[361px] lg:max-h-[427px]"
                className="flex-row sm:flex-col gap-2.5 ml-0 mt-0"
              >
                <CarouselItem className="pt-0 pl-0 basis-auto shrink-0">
                  <button
                    onClick={() => onThumbClick(0)}
                    className={cn(
                      "relative aspect-square w-20 sm:w-full rounded-xl overflow-hidden bg-card border-2 transition-all cursor-pointer",
                      activeThumb === 0
                        ? "border-primary"
                        : "border-transparent",
                    )}
                  >
                    <ImageFallback
                      src={
                        process.env.NEXT_PUBLIC_API_BASE_URL_GET_ORIO +
                        "/uploads/" +
                        acno +
                        "/" +
                        productDetail?.payload.default_image
                      }
                      alt={`Thumbnail ${0 + 1}`}
                      fill
                      className="object-cover"
                      fallbackSrc="https://placehold.co/100x100/F6F6F6/474747/png?text=Not+Found"
                    />
                  </button>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>

          <div className="order-1 sm:order-2 flex-1 relative bg-card rounded-3xl overflow-hidden aspect-square sm:aspect-auto h-[361px] lg:h-[427px]">
            <Carousel
              setApi={setMainApi}
              className="w-full h-full [&>.overflow-hidden]:w-full [&>.overflow-hidden]:h-full cursor-zoom-in"
            >
              <CarouselContent className="w-full h-full ml-0">
                <CarouselItem className="pl-0 h-full">
                  <div className="relative w-full h-full *:w-full *:h-full">
                    <Lens hovering={hovering} setHovering={setHovering}>
                      <ImageFallback
                        src={
                          process.env.NEXT_PUBLIC_API_BASE_URL_GET_ORIO +
                          "/uploads/" +
                          acno +
                          "/" +
                          (productDetail?.payload.default_image || "")
                        }
                        alt={productDetail?.payload.product_name || "Product Image"}
                        fill
                        className="object-contain"
                        fallbackSrc="https://placehold.co/600x600/F6F6F6/474747/png?text=Not+Found"
                      />
                    </Lens>
                  </div>
                </CarouselItem>
              </CarouselContent>
              {/* <CarouselPrevious className="left-4 border-none bg-background hover:bg-background size-10 translate-y-0!">
                <svg
                  width="14"
                  height="21"
                  viewBox="0 0 14 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 19L2 10.5L12 2.00003"
                    stroke="black"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </CarouselPrevious>
              <CarouselNext className="right-4 border-none bg-background hover:bg-background size-10 translate-y-0!">
                <svg
                  width="14"
                  height="21"
                  viewBox="0 0 14 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 19L12 10.5L2 2.00003"
                    stroke="black"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </CarouselNext> */}
            </Carousel>
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-6 xl:max-w-[500px] w-full">
          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">
              {productDetail?.payload.product_name}
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground">
              {isSimpleProduct
                ? formattedAmount(Number(productDetail?.payload.default_price))
                : selectedVariation
                  ? formattedAmount(Number(selectedVariation.price))
                  : formattedAmount(Number(productDetail?.payload.default_price))}
            </p>
          </div>

          <div className="flex items-center gap-2 text-base mb-4">
            <span className="font-semibold text-foreground">Store Name:</span>
            <span className="text-muted-foreground">
              {productDetail?.payload.business_name}
            </span>
          </div>

          <div className="flex items-center justify-between max-w-36 xs:px-2 py-1 w-full mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="p-4 size-10 rounded-full bg-card hover:bg-card text-foreground hover:text-foreground [&_svg:not([class*='size-'])]:size-5"
              disabled={
                isSimpleProduct
                  ? stock === 0 || quantity <= 1
                  : !selectedVariation || stock === 0 || quantity <= 1
              }
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              <svg
                width="15"
                height="2"
                viewBox="0 0 15 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1H13.439"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </Button>
            <span className="text-base font-medium text-center">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="p-4 size-10 rounded-full bg-card hover:bg-card text-foreground hover:text-foreground [&_svg:not([class*='size-'])]:size-5"
              disabled={
                isSimpleProduct
                  ? stock === 0 || quantity >= stock
                  : !selectedVariation || stock === 0 || quantity >= stock
              }
              onClick={() => setQuantity((prev) => Math.min(prev + 1, stock))}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.56104 8.78052H15.0001"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M8.78052 15.0001V2.56104"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </Button>
          </div>

          {productDetail?.payload.attributes &&
            productDetail.payload.attributes.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                {productDetail.payload.attributes.map((attr) => (
                  <FloatingSelect
                    key={attr.name}
                    label={attr.name}
                    options={attr.options.map((opt) => ({
                      value: opt,
                      label: opt,
                      isDisabled: !isOptionAvailable(attr.name, opt),
                    }))}
                    value={
                      selectedAttributes[attr.name]
                        ? {
                            value: selectedAttributes[attr.name],
                            label: selectedAttributes[attr.name],
                          }
                        : null
                    }
                    onChange={(val) => {
                      const opt = val as {
                        value: string;
                        label: string;
                      };
                      handleAttributeSelection(attr.name, opt?.value || null);
                    }}
                    isSearchable
                    isClearable
                  />
                ))}
              </div>
            )}

          <div className="space-y-4 sm:max-w-[400px] mb-4">
            <Button
              variant="secondary"
              size="xl"
              className="w-full rounded-2xl text-base font-semibold"
              disabled={stock === 0}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              size="xl"
              className="w-full rounded-2xl text-base font-semibold"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>

          <div className="flex items-center gap-2 text-base">
            <span className="font-semibold">Availability:</span>
            <span className="text-foreground">
              {isSimpleProduct
                ? stock > 0
                  ? "In Stock"
                  : "Out of Stock"
                : selectedVariation
                  ? stock > 0
                    ? "In Stock"
                    : "Out of Stock"
                  : "Select options"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
