"use client";
import { useAnimation } from "motion/react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewItem } from "./ReviewItem";
import { useState } from "react";
export const ReviewList = () => {
  const [activeTab, setActiveTab] = useState("review-1");
  const reviews = [
    {
      id: 1,
      name: "Jane",
      job: "Freelancer",
      review: `I love how simple the dashboard is. My subscriptions are all in one place.`,
    },
    {
      id: 2,
      name: "Kevin",
      job: "Marketing Professional",
      review: `Managing my finances used to feel overwhelming, especially with multiple subscriptions and daily expenses. This app changed everything—now I can see exactly where my money goes each day, week, and month. It’s like having a personal financial assistant in my pocket.`,
    },
    {
      id: 3,
      name: "Lina",
      job: "Small Business Owner",
      review: `I’ve tried several finance apps before, but none gave me the clarity I needed. The dynamic transaction tracking and detailed statistics make budgeting so much easier. I finally feel confident about my financial decisions, and I’ve even started saving more consistently.`,
    },
    {
      id: 4,
      name: "Alex",
      job: "Student",
      review: `This app makes tracking my expenses effortless. I finally feel in control of my budget`,
    },
  ];

  const animationProps = {
    motions: {
      visible: {
        opacity: 1,
        transition: { type: "spring", delay: 0.1 },
      },
      hidden: {
        opacity: 0.5,
      },
      exit: {
        transition: { ease: "easeInOut" },
      },
    },
    controls: useAnimation(),
  };

  return (
    <Tabs
      defaultValue="review-1"
      value={activeTab}
      onValueChange={setActiveTab}
      className="grid grid-cols-1 lg:grid-cols-2 mt-5 md:mt-3 mb-[3rem] lg:mt-[5rem] gap-x-5 p-3 items-center border-none shadow-none focus:outline-none h-[12rem]"
    >
      <TabsList className="flex gap-2 mt-4 lg:mt-0 mx-auto lg:justify-end bg-white lg:ml-auto mb-[3rem] lg:mb-0">
        {reviews.map((review) => {
          return (
            <TabsTrigger
              value={`review-${review.id}`}
              className="p-0 bg-transparent border-none shadow-none focus:outline-none"
              key={review.id}
              onClick={() => animationProps.controls.start("visible")}
            >
              <img
                src={`/landing-page/avatar/ava${review.id}.jpg`}
                alt={`avatar-${review.id}`}
                className={`w-[95px] md:w-[110px] lg:w-[170px] drop-shadow-lg border-main ${
                  activeTab == `review-${review.id}` ? "border" : ""
                } rounded-lg cursor-pointer`}
              />
            </TabsTrigger>
          );
        })}
      </TabsList>
      {reviews.map((review) => {
        return (
          <ReviewItem {...review} animation={animationProps} key={review.id} />
        );
      })}
    </Tabs>
  );
};
