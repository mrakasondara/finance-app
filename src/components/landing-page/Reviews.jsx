"use client";

import { motion } from "motion/react";
import { ReviewList } from "./ReviewList";

export const Reviews = () => {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", delay: 0.1 }}
      className="flex flex-col justify-center gap-4 -mt-[4rem] mb-[3rem] py-[1rem] pb-[3rem] px-[3rem]"
    >
      <span className="w-[100px] text-main backdrop-blur-lg backdrop-brightness-150 bg-main/30 py-1.4 text-center rounded-full font-semibold mx-auto text-[15px]">
        Reviews
      </span>

      <h5 className="text-2xl mx-auto text-[#090b0f] font-bold">
        Trusted by Users
      </h5>

      <p className="-mt-3 mx-auto text-slate-400 text-sm text-center">
        Various stories from people who manage their finances smarter with our
        app
      </p>

      <ReviewList />
    </motion.div>
  );
};
