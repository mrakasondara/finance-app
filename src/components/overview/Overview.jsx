"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import OverviewCard from "./OverviewCard";
import FinanceAPI from "@/lib/FinanceAPI";
import { LoadingSpinner } from "../loading-spinner";

const Overview = () => {
  const [dataOverview, setDataOverview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOverview = async () => {
    try {
      setIsLoading(true);
      const response = await FinanceAPI.getOverview();
      setDataOverview(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <>
      <h1 className="text-xl text-black dark:text-[#E0E0E0] font-semibold">
        Overview
      </h1>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner
            isLoading={isLoading}
            message={"Fetching Overview..."}
          />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="-mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:px-15"
        >
          {dataOverview?.map((data, index) => (
            <OverviewCard data={data} key={index++} />
          ))}
        </motion.div>
      )}
    </>
  );
};

export default Overview;
