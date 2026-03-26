import ImageFallback from "@/lib/image-fallback";
import Link from "next/link";

interface ProductCardProps {
  productname: string;
  variation_price: string;
  sku: string;
  variant_image: string;
  brandname: string;
  shopify_url: string;
  baseUrl: string;
}

const ProductCard = ({
  productname,
  variation_price,
  sku,
  variant_image,
  brandname,
  shopify_url,
}: ProductCardProps) => {
  const getBaseUrl = (url: string) => {
    try {
      return new URL(url).origin;
    } catch {
      return url || "#";
    }
  };
  const baseUrl = getBaseUrl(shopify_url);
  return (
    <>
      <div className="flex flex-col gap-3">
        <Link
          href={shopify_url}
          target="_blank"
          className="relative w-full aspect-square bg-[#F6F6F6] rounded-xl overflow-hidden"
        >
          <ImageFallback
            key={sku}
            alt={productname}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            src={variant_image}
            fallbackSrc={
              "https://placehold.co/251x251/F6F6F6/474747/png?text=Not+Found"
            }
            unoptimized
          />
        </Link>
        <div className="px-2">
          <Link
            href={shopify_url}
            target="_blank"
            className="text-sm text-charcoal mb-1 capitalize line-clamp-2"
          >
            {productname}
          </Link>
          <Link
            href={baseUrl}
            target="_blank"
            className="font-normal text-[15px] text-charcoal capitalize underline hover:text-primary transition-colors"
          >
            {brandname}
          </Link>
          <p className="font-bold text-[17px] text-[#000C19]">
            Rs. {variation_price}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
