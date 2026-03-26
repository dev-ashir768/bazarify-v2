"use client";

import { motion, Variants } from "framer-motion";
import CartShippingDetails from "./cart-shipping-details";
import CartOrderSummary from "./cart-order-summary";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const leftColumnVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

const rightColumnVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      type: "spring", stiffness: 80, damping: 20, delay: 0.2,
      staggerChildren: 0.15, delayChildren: 0.4
    },
  },
};

const CartWrapper = () => {
  return (
    <motion.section 
      className="container py-24 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16">
        <motion.div className="lg:col-span-5 2xl:col-span-6" variants={leftColumnVariants}>
          <CartShippingDetails />
        </motion.div>
        <motion.div className="lg:col-span-7 2xl:col-span-6" variants={rightColumnVariants}>
          <CartOrderSummary />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CartWrapper;
