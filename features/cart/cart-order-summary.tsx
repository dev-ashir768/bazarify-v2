"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const cartItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

const CartItem = () => (
  <motion.div 
    variants={cartItemVariants}
    className="grid grid-cols-12 bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6 gap-y-2 xs:gap-y-0"
  >
    <div className="col-span-12 xs:col-span-8 flex flex-col xs:flex-row items-start sm:items-center gap-2 xs:gap-4">
      <div className="size-15 bg-card rounded-lg shrink-0"></div>
      <div className="mt-0.5">
        <h3 className="text-base font-medium text-muted-foreground">
          Men Stainless Steel Neck Chains
        </h3>
        <p className="font-semibold text-lg tracking-wide">Rs. 4,976.00</p>
      </div>
    </div>

    <div className="col-span-4 xs:col-span-3 flex items-center justify-between max-w-28 xs:px-2 py-1.5 w-full">
      <Button
        variant="ghost"
        size="icon"
        className="p-1 rounded-full bg-card hover:bg-card text-foreground hover:text-foreground"
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
      <span className="text-sm font-medium text-center">1</span>
      <Button
        variant="ghost"
        size="icon"
        className="p-1 rounded-full bg-card hover:bg-card text-foreground hover:text-foreground"
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

    <div className="col-span-2 xs:col-span-1 flex items-center justify-end">
      <Button
        variant="ghost"
        size="icon"
        className="p-0 bg-transparent hover:bg-transparent text-red-500 hover:text-red-500 [&_svg:not([class*='size-'])]:size-5.5"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
        </svg>
      </Button>
    </div>
  </motion.div>
);

const CartOrderSummary = () => {
  return (
    <div className="w-full bg-card rounded-4xl px-5 sm:px-7 py-5 sm:py-6">
      <h2 className="text-xl font-semibold mb-4 sm:mb-6">Your Order</h2>
      <div className="mb-6 sm:mb-8 flex flex-col gap-4">
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-3">Order Summary</h3>

        <div className="space-y-2 sm:space-y-3 text-base *:text-muted-foreground *:font-normal! *:flex *:justify-between">
          <div>
            <span>Sub Total:</span>
            <span className="font-semibold text-foreground">Rs. 5,650</span>
          </div>
          <div>
            <span>Shipping:</span>
            <span className="font-semibold text-foreground">Free</span>
          </div>
          <div>
            <span>Tax (Estimated 5%)</span>
            <span className="font-semibold text-foreground">Rs. 0</span>
          </div>
        </div>

        <div className="border-t pt-4 flex justify-between items-center font-bold text-base text-foreground">
          <span>Total</span>
          <span className="font-semibold text-foreground">Rs. 5,650</span>
        </div>

        <div>
          <h3 className="font-semibold text-base text-foreground mb-3">
            Payment Method
          </h3>
          <RadioGroup defaultValue="cod" className="flex flex-col gap-3">
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="cod"
                id="cod"
                className="border-primary text-primary border-2 h-5 w-5"
              />
              <label
                htmlFor="cod"
                className="text-sm font-medium text-muted-foreground cursor-pointer"
              >
                Cash on Delivery
              </label>
            </div>
          </RadioGroup>
        </div>

        <Button size="xl" className="w-full rounded-2xl text-lg">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartOrderSummary;
