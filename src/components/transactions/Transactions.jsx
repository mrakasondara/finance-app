"use client";
import { useEffect, useState } from "react";
import { BanknoteArrowDown, Calendar } from "lucide-react";
import { motion } from "motion/react";
import FinanceAPI from "@/lib/FinanceAPI";
import TransactionsOverview from "../overview/TransactionsOverview";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { LoadingSpinner } from "../loading-spinner";

const Transactions = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await FinanceAPI.getOverview("bill");
    setData(response.data ? response.data[0] : []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-5 relative">
      <div className="order-2 md:order-1 flex w-full md:w-[60%] lg:w-[70%] items-center justify-center bg-white dark:bg-table">
        <TransactionsOverview />
      </div>

      <div className="md:order-2 order-1 grid w-full md:w-[40%] lg:w-[30%] grid-template-columns-1 md:grid-template-columns-2 gap-5">
        {isLoading ? (
          <LoadingSpinner isLoading={isLoading} message={"Loading Bills..."} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <Card className={"bg-main/60 dark:bg-table mb-4"}>
              <CardHeader>
                <Calendar color="#ffffff" />
                <CardTitle className={"text-white"}>
                  Next Billing Date
                </CardTitle>
                <CardDescription className={"text-white"}>
                  {data["next_billings"] ? (
                    <>
                      <p className="text-red-500 dark:text-white">
                        {new Date(
                          data["next_billings"].due_date
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        {data["next_billings"]?.subscription} - Rp.{" "}
                        {new Intl.NumberFormat(["ban", "id"]).format(
                          data["next_billings"]?.amount
                        )}
                      </p>
                    </>
                  ) : (
                    "No Active Bill"
                  )}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className={"bg-blue-500/60 dark:bg-table mb-5"}>
              <CardHeader>
                <BanknoteArrowDown color="#ffffff" />
                <CardTitle className={"text-white"}>Total Payment</CardTitle>
                <CardDescription className={"text-white"}>
                  {data.total_payment ? (
                    <p>
                      Rp.{" "}
                      {new Intl.NumberFormat(["ban", "id"]).format(
                        data.total_payment
                      )}
                    </p>
                  ) : (
                    "No Active Bill"
                  )}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
