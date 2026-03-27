import ProductDetailWrapper from "@/features/products/product-detail-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Detail",
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <>
      <ProductDetailWrapper productId={id} />
    </>
  );
};

export default page;
