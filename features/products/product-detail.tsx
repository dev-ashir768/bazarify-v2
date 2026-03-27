"use client";

import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import ImageFallback from "@/lib/image-fallback";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PUBLIC_ROUTES } from "@/lib/constants";

const product = {
  id: "hp-laptop-sku-1",
  name: "Men Stainless Steel Neck Chains",
  price: 4976.0,
  store: "Tiara",
  availability: "In stock",
  images: [
    "https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-6RqSDGaNJ5c",
    "https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-6RqSDGaNJ5c",
    "https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-6RqSDGaNJ5c",
    "https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-6RqSDGaNJ5c",
    "https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-6RqSDGaNJ5c",
    "https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-6RqSDGaNJ5c",
    "https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-6RqSDGaNJ5c",
    "https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-6RqSDGaNJ5c",
    "https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-6RqSDGaNJ5c",
    "https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-6RqSDGaNJ5c",
    "https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-6RqSDGaNJ5c",
    "https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-6RqSDGaNJ5c",
    "https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-6RqSDGaNJ5c",
    "https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-6RqSDGaNJ5c",
  ],
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ProductDetail = ({ productId }: { productId: string }) => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [activeThumb, setActiveThumb] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const onThumbClick = (index: number) => {
    if (!mainApi || !thumbApi) return;
    mainApi.scrollTo(index);
  };

  React.useEffect(() => {
    if (!mainApi || !thumbApi) return;

    const onSelect = () => {
      const selected = mainApi.selectedScrollSnap();
      setActiveThumb(selected);

      // Only scroll thumbnails if the active one isn't recently visible
      const inView = thumbApi.slidesInView();
      if (!inView.includes(selected)) {
        thumbApi.scrollTo(selected);
      }
    };

    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);

    return () => {
      mainApi.off("select", onSelect);
    };
  }, [mainApi, thumbApi]);

  return (
    <>
      <Breadcrumb className="mb-4 sm:mb-8">
        <BreadcrumbList className="text-sm! font-normal">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={PUBLIC_ROUTES.HOME}>Marketplace</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium truncate md:max-w-full max-w-[200px]">
              {product.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 xl:col-span-6 xl:max-w-[650px] w-full flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Main Carousel (Thumbnails) */}
          <div className="order-2 sm:order-1 shrink-0 sm:w-24">
            <Carousel
              setApi={setThumbApi}
              orientation="vertical"
              className="w-full"
              opts={{
                align: "start",
                containScroll: "keepSnaps",
                dragFree: true,
              }}
            >
              <CarouselContent 
                viewportClassName="max-h-[361px] lg:max-h-[427px]"
                className="flex-row sm:flex-col gap-2.5 ml-0 mt-0"
              >
                {product.images.map((img, idx) => (
                  <CarouselItem key={idx} className="pt-0 pl-0 basis-auto shrink-0">
                    <button
                      onClick={() => onThumbClick(idx)}
                      className={cn(
                        "relative aspect-square w-20 sm:w-full rounded-xl overflow-hidden bg-card border-2 transition-all cursor-pointer",
                        activeThumb === idx ? "border-primary" : "border-transparent",
                      )}
                    >
                      <ImageFallback
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        fallbackSrc="https://placehold.co/100x100/F6F6F6/474747/png?text=Preview"
                      />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="order-1 sm:order-2 flex-1 relative bg-card rounded-3xl overflow-hidden aspect-square sm:aspect-auto max-h-[361px] lg:max-h-[427px]">
            <Carousel setApi={setMainApi} className="w-full h-full">
              <CarouselContent className="h-full ml-0">
                {product.images.map((img, idx) => (
                  <CarouselItem key={idx} className="pl-0 h-full">
                    <div className="relative w-full h-full">
                      <ImageFallback
                        src={img}
                        alt={product.name}
                        fill
                        className="object-cover"
                        fallbackSrc="https://placehold.co/600x600/F6F6F6/474747/png?text=Not+Found"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 border-none bg-background hover:bg-background size-10 translate-y-0!">
                <svg
                  width="14"
                  height="21"
                  viewBox="0 0 14 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 19L2 10.5L12 2.00003"
                    stroke="black"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </CarouselPrevious>
              <CarouselNext className="right-4 border-none bg-background hover:bg-background size-10 translate-y-0!">
                <svg
                  width="14"
                  height="21"
                  viewBox="0 0 14 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 19L12 10.5L2 2.00003"
                    stroke="black"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </CarouselNext>
            </Carousel>
          </div>
        </div>

        <motion.div
          className="lg:col-span-5 xl:col-span-6 xl:max-w-[500px] w-full"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">
              {product.name}
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground">
              Rs.{" "}
              {product.price.toLocaleString("en-PK", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="flex items-center gap-2 text-base mb-4">
            <span className="font-medium text-foreground">Store Name:</span>
            <span className="text-muted-foreground">{product.store}</span>
          </div>

          <div className="flex items-center justify-between max-w-36 xs:px-2 py-1 w-full mb-8">
            <Button
              variant="ghost"
              size="icon"
              className="p-4 size-10 rounded-full bg-card hover:bg-card text-foreground hover:text-foreground [&_svg:not([class*='size-'])]:size-5"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
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
            <span className="text-base font-medium text-center">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="p-4 size-10 rounded-full bg-card hover:bg-card text-foreground hover:text-foreground [&_svg:not([class*='size-'])]:size-5"
              onClick={() => setQuantity(quantity + 1)}
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

          <div className="space-y-4 sm:max-w-[400px] mb-4">
            <Button
              variant="secondary"
              size="xl"
              className="w-full rounded-2xl text-base font-semibold "
            >
              Add to Cart
            </Button>
            <Button
              size="xl"
              className="w-full rounded-2xl text-base font-semibold "
            >
              Buy Now
            </Button>
          </div>

          <div className="flex items-center gap-2 text-base">
            <span className="font-semibold">Availability:</span>
            <span className="text-foreground">{product.availability}</span>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ProductDetail;
