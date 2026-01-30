import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";

export const ReviewItem = ({ id, name, job, review, animation }) => {
  return (
    <TabsContent
      value={`review-${id}`}
      className="mt-5 md:mt-0 flex flex-col shadow-lg lg:w-3/4 rounded-lg p-3 gap-1 h-full"
    >
      <motion.div
        variants={animation.motions}
        initial={animation.motions.hidden}
        animate={animation.controls}
        exit="exit"
        className="relative flex flex-col mt-1"
      >
        <h6 className="text-lg text-main font-semibold">{name}</h6>
        <span className="text-slate-400 text-sm mb-1">{job}</span>
        <Quote className="absolute right-0 top-3 text-main" />
        <hr />
      </motion.div>
      <motion.p
        variants={animation.motions}
        initial={animation.motions.hidden}
        animate={animation.controls}
        exit="exit"
        className="mt-2 text-[13px]"
      >
        {review}
      </motion.p>
    </TabsContent>
  );
};
