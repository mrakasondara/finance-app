"use client";
import { easeInOut, motion } from "motion/react";
import { redirect, RedirectType } from "next/navigation";
import { HeaderLanding } from "../layout/HeaderLanding";
import { Button } from "../ui/button";

export const Hero = () => {
  return (
    <section className="relative flex flex-col h-[40rem] lg:h-[45rem]">
      <img
        src="/background/hero.png"
        className="h-[40rem] lg:h-[45rem] w-full absolute top-0 -z-1"
      />
      <HeaderLanding />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: easeInOut }}
        className="flex flex-col items-center text-center gap-5 mt-[10rem]"
      >
        <h3 className="text-md text-green-500 border border-main py-2 px-3 rounded-xl font-bold">
          Finance Management App
        </h3>
        <h4 className="text-white text-6xl font-bold">
          Every Rupiah Matters More
        </h4>
        <p className="text-white text-sm">
          Help you manage your expenses wisely and achieve your financial goals
          faster.
        </p>
        <Button
          className="bg-main text-white hover:backdrop-blur-sm hover:bg-white/30 hover:border hover:border-main font-semibold hover:text-main rounded-xl text-md cursor-pointer transition-colors"
          onClick={() => redirect("/register", RedirectType.replace)}
        >
          Get Started
        </Button>
      </motion.div>
      <motion.img
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.7, ease: easeInOut }}
        src="/landing-page/preview2.jpeg"
        className="w-1/2 md:w-[40%] lg:w-[30%] absolute top-[100%] scale-170 left-[50%] right-[50%] -translate-1/2 shadow rounded-lg"
        alt="preview"
      />
    </section>
  );
};
