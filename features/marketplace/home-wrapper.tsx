import CategoryFilters from "../category-filter/category-filters";
import ProductCard from "../product/product-card";
import HomeHero from "./home-hero";

const products = [
  {
    productname: "Wireless Noise Cancelling Headphones",
    variation_price: "100",
    sku: "SKU001",
    variant_image: "https://example.com/image1.jpg",
    brandname: "SoundMax",
    shopify_url: "https://shopify.com/product1",
    baseUrl: "https://example.com",
  },
  {
    productname: "Smart Fitness Watch Pro",
    variation_price: "120",
    sku: "SKU002",
    variant_image: "https://example.com/image2.jpg",
    brandname: "FitCore",
    shopify_url: "https://shopify.com/product2",
    baseUrl: "https://example.com",
  },
  {
    productname: "Portable Bluetooth Speaker",
    variation_price: "150",
    sku: "SKU003",
    variant_image: "https://example.com/image3.jpg",
    brandname: "BoomBeat",
    shopify_url: "https://shopify.com/product3",
    baseUrl: "https://example.com",
  },
  {
    productname: "Ultra HD 4K Action Camera",
    variation_price: "200",
    sku: "SKU004",
    variant_image: "https://example.com/image4.jpg",
    brandname: "CaptureX",
    shopify_url: "https://shopify.com/product4",
    baseUrl: "https://example.com",
  },
  {
    productname: "Ergonomic Office Chair",
    variation_price: "180",
    sku: "SKU005",
    variant_image: "https://example.com/image5.jpg",
    brandname: "ComfortZone",
    shopify_url: "https://shopify.com/product5",
    baseUrl: "https://example.com",
  },
  {
    productname: "Gaming Mechanical Keyboard RGB",
    variation_price: "90",
    sku: "SKU006",
    variant_image: "https://example.com/image6.jpg",
    brandname: "KeyStrike",
    shopify_url: "https://shopify.com/product6",
    baseUrl: "https://example.com",
  },
  {
    productname: "Wireless Gaming Mouse",
    variation_price: "110",
    sku: "SKU007",
    variant_image: "https://example.com/image7.jpg",
    brandname: "ClickPro",
    shopify_url: "https://shopify.com/product7",
    baseUrl: "https://example.com",
  },
  {
    productname: "LED Ring Light Kit",
    variation_price: "130",
    sku: "SKU008",
    variant_image: "https://example.com/image8.jpg",
    brandname: "GlowLite",
    shopify_url: "https://shopify.com/product8",
    baseUrl: "https://example.com",
  },
  {
    productname: "Adjustable Laptop Stand",
    variation_price: "170",
    sku: "SKU009",
    variant_image: "https://example.com/image9.jpg",
    brandname: "DeskEase",
    shopify_url: "https://shopify.com/product9",
    baseUrl: "https://example.com",
  },
  {
    productname: "Fast Charging Power Bank 20000mAh",
    variation_price: "210",
    sku: "SKU010",
    variant_image: "https://example.com/image10.jpg",
    brandname: "ChargeUp",
    shopify_url: "https://shopify.com/product10",
    baseUrl: "https://example.com",
  },
  {
    productname: "Smart Home WiFi Camera",
    variation_price: "95",
    sku: "SKU011",
    variant_image: "https://example.com/image11.jpg",
    brandname: "SecureCam",
    shopify_url: "https://shopify.com/product11",
    baseUrl: "https://example.com",
  },
  {
    productname: "Noise Isolating Earbuds",
    variation_price: "140",
    sku: "SKU012",
    variant_image: "https://example.com/image12.jpg",
    brandname: "AudioZen",
    shopify_url: "https://shopify.com/product12",
    baseUrl: "https://example.com",
  },
  {
    productname: "Adjustable Dumbbell Set",
    variation_price: "160",
    sku: "SKU013",
    variant_image: "https://example.com/image13.jpg",
    brandname: "PowerLift",
    shopify_url: "https://shopify.com/product13",
    baseUrl: "https://example.com",
  },
  {
    productname: "Electric Kettle Stainless Steel",
    variation_price: "220",
    sku: "SKU014",
    variant_image: "https://example.com/image14.jpg",
    brandname: "HomeChef",
    shopify_url: "https://shopify.com/product14",
    baseUrl: "https://example.com",
  },
  {
    productname: "Air Fryer Digital 5L",
    variation_price: "175",
    sku: "SKU015",
    variant_image: "https://example.com/image15.jpg",
    brandname: "CookEase",
    shopify_url: "https://shopify.com/product15",
    baseUrl: "https://example.com",
  },
  {
    productname: "Cordless Vacuum Cleaner",
    variation_price: "105",
    sku: "SKU016",
    variant_image: "https://example.com/image16.jpg",
    brandname: "CleanMax",
    shopify_url: "https://shopify.com/product16",
    baseUrl: "https://example.com",
  },
  {
    productname: "Smart LED Light Bulb",
    variation_price: "115",
    sku: "SKU017",
    variant_image: "https://example.com/image17.jpg",
    brandname: "Brightify",
    shopify_url: "https://shopify.com/product17",
    baseUrl: "https://example.com",
  },
  {
    productname: "Digital Alarm Clock with LED Display",
    variation_price: "135",
    sku: "SKU018",
    variant_image: "https://example.com/image18.jpg",
    brandname: "TimeTech",
    shopify_url: "https://shopify.com/product18",
    baseUrl: "https://example.com",
  },
  {
    productname: "Mini Projector HD Portable",
    variation_price: "155",
    sku: "SKU019",
    variant_image: "https://example.com/image19.jpg",
    brandname: "ViewBox",
    shopify_url: "https://shopify.com/product19",
    baseUrl: "https://example.com",
  },
  {
    productname: "USB-C Multiport Adapter",
    variation_price: "250",
    sku: "SKU020",
    variant_image: "https://example.com/image20.jpg",
    brandname: "ConnectPro",
    shopify_url: "https://shopify.com/product20",
    baseUrl: "https://example.com",
  },
];

const HomeWrapper = () => {
  return (
    <>
      <section className="pb-8">
        <HomeHero />
        <CategoryFilters />
      </section>
      <section className="container pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-8">
          {products.map((item) => (
            <ProductCard key={item.sku} {...item} />
          ))}
        </div>
      </section>
    </>
  );
};

export default HomeWrapper;
