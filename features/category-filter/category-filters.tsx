"use client";

import { Button } from "@/components/ui/button";
import PriceFilter from "./price-filter";
import { motion, Variants } from "framer-motion";

const categories = [
  { id: 1, name: "Men", slug: "men" },
  { id: 2, name: "Women", slug: "women" },
  { id: 3, name: "Accessories", slug: "accessories" },
  { id: 4, name: "Beauty", slug: "beauty" },
  { id: 5, name: "Shoes", slug: "shoes" },
  { id: 6, name: "Food & Drinks", slug: "food-drinks" },
  { id: 7, name: "Home Appliances", slug: "home-appliances" },
  // { id: 8, name: "Others", slug: "others" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const CategoryFilters = () => {
  return (
    <motion.div 
      className="container flex items-center gap-6 justify-center flex-wrap"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {categories.map((category) => (
        <motion.div key={category.id} variants={itemVariants}>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full bg-white! hover:bg-white! h-12 px-8 text-sm border-gray-200"
            style={{boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"}}
          >
            {category.name}
          </Button>
        </motion.div>
      ))}
      <motion.div variants={itemVariants}>
        <PriceFilter />
      </motion.div>
    </motion.div>
  );
};

export default CategoryFilters;
