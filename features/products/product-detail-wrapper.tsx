import ProductCard from "./product-card";
import ProductDetail from "./product-detail";

interface ProductDetailWrapperProps {
  productId: string;
}

const products = [
  {
    id: 1,
    productname: "Wireless Noise Cancelling Headphones",
    variation_price: "100",
    sku: "SKU001",
    variant_image: "https://example.com/image1.jpg",
    brandname: "SoundMax",
    shopify_url: "https://shopify.com/product1",
    baseUrl: "https://example.com",
  },
  {
    id: 2,
    productname: "Smart Fitness Watch Pro",
    variation_price: "120",
    sku: "SKU002",
    variant_image: "https://example.com/image2.jpg",
    brandname: "FitCore",
    shopify_url: "https://shopify.com/product2",
    baseUrl: "https://example.com",
  },
  {
    id: 3,
    productname: "Portable Bluetooth Speaker",
    variation_price: "150",
    sku: "SKU003",
    variant_image: "https://example.com/image3.jpg",
    brandname: "BoomBeat",
    shopify_url: "https://shopify.com/product3",
    baseUrl: "https://example.com",
  },
  {
    id: 4,
    productname: "Ultra HD 4K Action Camera",
    variation_price: "200",
    sku: "SKU004",
    variant_image: "https://example.com/image4.jpg",
    brandname: "CaptureX",
    shopify_url: "https://shopify.com/product4",
    baseUrl: "https://example.com",
  },
  {
    id: 5,
    productname: "Ergonomic Office Chair",
    variation_price: "180",
    sku: "SKU005",
    variant_image: "https://example.com/image5.jpg",
    brandname: "ComfortZone",
    shopify_url: "https://shopify.com/product5",
    baseUrl: "https://example.com",
  },
  {
    id: 6,
    productname: "Gaming Mechanical Keyboard RGB",
    variation_price: "90",
    sku: "SKU006",
    variant_image: "https://example.com/image6.jpg",
    brandname: "KeyStrike",
    shopify_url: "https://shopify.com/product6",
    baseUrl: "https://example.com",
  },
  {
    id: 7,
    productname: "Wireless Gaming Mouse",
    variation_price: "110",
    sku: "SKU007",
    variant_image: "https://example.com/image7.jpg",
    brandname: "ClickPro",
    shopify_url: "https://shopify.com/product7",
    baseUrl: "https://example.com",
  },
  {
    id: 8,
    productname: "LED Ring Light Kit",
    variation_price: "130",
    sku: "SKU008",
    variant_image: "https://example.com/image8.jpg",
    brandname: "GlowLite",
    shopify_url: "https://shopify.com/product8",
    baseUrl: "https://example.com",
  },
  {
    id: 9,
    productname: "Adjustable Laptop Stand",
    variation_price: "170",
    sku: "SKU009",
    variant_image: "https://example.com/image9.jpg",
    brandname: "DeskEase",
    shopify_url: "https://shopify.com/product9",
    baseUrl: "https://example.com",
  },
  {
    id: 10,
    productname: "Fast Charging Power Bank 20000mAh",
    variation_price: "210",
    sku: "SKU010",
    variant_image: "https://example.com/image10.jpg",
    brandname: "ChargeUp",
    shopify_url: "https://shopify.com/product10",
    baseUrl: "https://example.com",
  },
  {
    id: 11,
    productname: "Smart Home WiFi Camera",
    variation_price: "95",
    sku: "SKU011",
    variant_image: "https://example.com/image11.jpg",
    brandname: "SecureCam",
    shopify_url: "https://shopify.com/product11",
    baseUrl: "https://example.com",
  },
  {
    id: 12,
    productname: "Noise Isolating Earbuds",
    variation_price: "140",
    sku: "SKU012",
    variant_image: "https://example.com/image12.jpg",
    brandname: "AudioZen",
    shopify_url: "https://shopify.com/product12",
    baseUrl: "https://example.com",
  },
  {
    id: 13,
    productname: "Adjustable Dumbbell Set",
    variation_price: "160",
    sku: "SKU013",
    variant_image: "https://example.com/image13.jpg",
    brandname: "PowerLift",
    shopify_url: "https://shopify.com/product13",
    baseUrl: "https://example.com",
  },
  {
    id: 14,
    productname: "Electric Kettle Stainless Steel",
    variation_price: "220",
    sku: "SKU014",
    variant_image: "https://example.com/image14.jpg",
    brandname: "HomeChef",
    shopify_url: "https://shopify.com/product14",
    baseUrl: "https://example.com",
  }
];

const ProductDetailWrapper = ({ productId }: ProductDetailWrapperProps) => {
  return (
    <>
      <section className="container pb-16 pt-[96px]">
        <ProductDetail productId={productId} />
      </section>
      <section className="container pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">
            Related Products
          </h2>
          <p className="text-muted-foreground text-base">
            Explore our handpicked related products and find exactly what&apos;ve
            been looking for.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-8">
          {products.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductDetailWrapper;
