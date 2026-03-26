"use client";

import { motion, Variants } from "framer-motion";
import MainSearch from "./main-search";

const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const bgLeftVariant: Variants = {
  hidden: { opacity: 0, x: -30, y: 20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 },
  },
};

const bgRightVariant: Variants = {
  hidden: { opacity: 0, x: 30, y: 20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.4, 0.25, 1], delay: 0.4 },
  },
};

const HomeHero = () => {
  return (
    <>
      <section
        className="relative w-full flex items-baseline-last overflow-hidden bg-cover bg-center min-h-[400px] pb-8"
        style={{ backgroundImage: "url('/images/marketplace-bg2.jpg')" }}
      >
         <motion.div
          variants={bgRightVariant}
          initial="hidden"
          animate="visible"
          className="absolute -right-20 bottom-0 w-[220px] h-[320px] bg-no-repeat bg-contain"
          style={{
            backgroundImage: "url('/images/bg-element-two.png')",
            backgroundPosition: "bottom right",
          }}
        />

        <motion.div
          variants={bgLeftVariant}
          initial="hidden"
          animate="visible"
          className="absolute -left-12 bottom-0 w-[220px] h-[320px] bg-no-repeat bg-contain"
          style={{
            backgroundImage: "url('/images/bg-element-one.png')",
            backgroundPosition: "bottom left",
          }}
        />

        <div className="relative z-10 w-full">
          <div className="container px-6 mx-auto flex lg:flex-row flex-col justify-center lg:items-center">
            <motion.div
              variants={containerVariant}
              initial="hidden"
              animate="visible"
              className="lg:w-[70%] w-full px-4"
            >
              <motion.div variants={itemVariant} className="text-center mb-5">
                <h1 className="text-midnight font-bold lg:text-5xl text-4xl tracking-wide">
                  Welcome to the Marketplace
                </h1>
              </motion.div>
              
              <motion.div variants={itemVariant} className="max-w-[850px] text-center mx-auto mb-10">
                <p className="text-muted-foreground font-normal text-base leading-relaxed">
                  Your one-stop destination for everything you need. Discover
                  thousands of products, unbeatable deals, and a seamless
                  shopping experience all in one place.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariant}>
                <MainSearch />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeHero;
