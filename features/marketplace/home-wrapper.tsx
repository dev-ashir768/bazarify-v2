import CategoryFilters from "../category-filter/category-filters";
import ProductSection from "../product/product-section";
import HomeHero from "./home-hero";

const HomeWrapper = () => {
  return (
    <>
      <section>
        <HomeHero />
        <CategoryFilters />
      </section>
      <ProductSection />
    </>
  );
};

export default HomeWrapper;
