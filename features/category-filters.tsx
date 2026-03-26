import { Button } from "@/components/ui/button";
import React from "react";
import PriceFilter from "./price-filter";

const categories = [
  { id: 1, name: "Men", slug: "men" },
  { id: 2, name: "Women", slug: "women" },
  { id: 3, name: "Accessories", slug: "accessories" },
  { id: 4, name: "Beauty", slug: "beauty" },
  { id: 5, name: "Shoes", slug: "shoes" },
  { id: 6, name: "Food & Drinks", slug: "food-drinks" },
  { id: 7, name: "Home Appliances", slug: "home-appliances" },
];

const CategoryFilters = () => {
  return (
    <>
      <div className="container mx-auto px-6 flex items-center gap-6 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            size="lg"
            variant="secondary"
            className="rounded-full bg-white! hover:bg-white! h-12 px-8 text-sm border-gray-200"
            style={{boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"}}
          >
            {category.name}
          </Button>
        ))}
        <PriceFilter />
      </div>
    </>
  );
};

export default CategoryFilters;
