"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartStore, CartItem as ICartItem } from "@/store/useCartStore";
import { formattedAmount } from "@/lib/formated-amount";
import ImageFallback from "@/lib/image-fallback";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PUBLIC_ROUTES } from "@/lib/constants";

// ========================= Motion ========================= \\
const cartItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
};

const CartItemRow = ({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}: { 
  item: ICartItem; 
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) => (
  <motion.div 
    variants={cartItemVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    layout
    className="grid grid-cols-12 bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6 gap-y-2 xs:gap-y-0 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow border border-transparent hover:border-border/50"
  >
    <div className="col-span-12 xs:col-span-8 flex flex-col xs:flex-row items-start sm:items-center gap-2 xs:gap-4">
      <div className="size-20 bg-card rounded-lg shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
        <ImageFallback
          src={item.image}
          alt={item.productName}
          fill
          className="object-cover"
          fallbackSrc="https://placehold.co/100x100/F6F6F6/474747/png?text=Not+Found"
        />
      </div>
      <div className="mt-0.5 flex-1 min-w-0">
        <h3 className="text-base font-medium text-muted-foreground truncate">
          {item.productName}
        </h3>
        {item.variationLabel && (
          <p className="text-xs text-muted-foreground/70 mb-1 italic">
            {item.variationLabel}
          </p>
        )}
        <p className="font-semibold text-lg tracking-wide text-foreground">
          {formattedAmount(parseFloat(item.price))}
        </p>
      </div>
    </div>

    <div className="col-span-12 xs:col-span-3 flex items-center justify-between max-w-[124px] xs:px-2 py-1.5 w-full bg-card/30 rounded-full sm:bg-transparent">
      <Button
        variant="ghost"
        size="icon"
        disabled={item.quantity <= 1}
        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
        className="p-1 size-8 rounded-full bg-card hover:bg-muted text-foreground hover:text-foreground transition-colors"
      >
        <svg
          width="12"
          height="2"
          viewBox="0 0 15 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1H13.439"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </Button>
      <span className="text-sm font-bold text-center w-6">{item.quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        disabled={item.quantity >= item.maxStock}
        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
        className="p-1 size-8 rounded-full bg-card hover:bg-muted text-foreground hover:text-foreground transition-colors"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.56104 8.78052H15.0001"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M8.78052 15.0001V2.56104"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </Button>
    </div>

    <div className="col-span-1 xs:col-span-1 flex items-center justify-end">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(item.cartItemId)}
        className="p-0 bg-transparent hover:bg-red-50 text-red-500 hover:text-red-600 size-9 rounded-full transition-colors"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
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
  const { items, removeItem, updateQuantity, subTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Fix hydration for persisted store
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full bg-card rounded-4xl px-5 sm:px-7 py-5 sm:py-6 animate-pulse">
        <div className="h-8 w-40 bg-muted rounded mb-6"></div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 w-full bg-muted rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const orderSubTotal = subTotal();
  const taxRate = 0.05; // 5% tax
  const taxAmount = orderSubTotal * taxRate;
  const grandTotal = orderSubTotal + taxAmount;

  if (items.length === 0) {
    return (
      <div className="w-full bg-card rounded-4xl px-5 sm:px-7 py-20 flex flex-col items-center justify-center text-center">
        <div className="size-24 bg-background rounded-full flex items-center justify-center mb-6 text-muted-foreground shadow-inner">
           <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-8 max-w-xs">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link href={PUBLIC_ROUTES.HOME}>
          <Button size="xl" className="rounded-2xl px-10">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-card rounded-4xl px-5 sm:px-7 py-5 sm:py-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 sm:mb-6 flex items-center justify-between">
        <span>Your Order</span>
        <span className="text-sm font-normal text-muted-foreground bg-background px-3 py-1 rounded-full">
          {items.length} {items.length === 1 ? 'Item' : 'Items'}
        </span>
      </h2>
      
      <div className="mb-6 sm:mb-8 flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <CartItemRow 
              key={item.cartItemId} 
              item={item} 
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="space-y-4 border-t border-border/50 pt-6">
        <h3 className="text-lg font-semibold mb-3">Order Summary</h3>

        <div className="space-y-2 sm:space-y-3 text-base *:text-muted-foreground *:font-normal! *:flex *:justify-between">
          <div className="transition-all">
            <span>Sub Total:</span>
            <span className="font-semibold text-foreground">{formattedAmount(orderSubTotal)}</span>
          </div>
          <div>
            <span>Shipping:</span>
            <span className="font-semibold text-emerald-600">Free</span>
          </div>
          <div>
            <span>Tax (Estimated 5%)</span>
            <span className="font-semibold text-foreground">{formattedAmount(taxAmount)}</span>
          </div>
        </div>

        <div className="border-t border-dashed pt-4 flex justify-between items-center font-bold text-lg text-foreground">
          <span>Total</span>
          <span className="text-primary">{formattedAmount(grandTotal)}</span>
        </div>

        <div className="pt-2">
          <h3 className="font-semibold text-base text-foreground mb-3">
            Payment Method
          </h3>
          <RadioGroup defaultValue="cod" className="flex flex-col gap-3">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-background border-2 border-primary/10">
              <RadioGroupItem
                value="cod"
                id="cod"
                className="border-primary text-primary border-2 h-5 w-5"
              />
              <label
                htmlFor="cod"
                className="text-sm font-medium text-muted-foreground cursor-pointer flex-1"
              >
                Cash on Delivery
              </label>
            </div>
          </RadioGroup>
        </div>

        <Button size="xl" className="w-full rounded-2xl text-lg mt-4 shadow-lg active:scale-[0.98] transition-transform">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartOrderSummary;

