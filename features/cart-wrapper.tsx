"use client";

import React from "react";
import CartShippingDetails from "./cart-shipping-details";
import CartOrderSummary from "./cart-order-summary";

const CartWrapper = () => {
  return (
    <section className="container mx-auto py-24 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16">
        <div className="lg:col-span-5 2xl:col-span-6">
          <CartShippingDetails />
        </div>
        <div className="lg:col-span-7 2xl:col-span-6">
          <CartOrderSummary />
        </div>
      </div>
    </section>
  );
};

export default CartWrapper;
