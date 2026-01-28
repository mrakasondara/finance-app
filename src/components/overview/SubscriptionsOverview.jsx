"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import FinanceAPI from "@/lib/FinanceAPI";
import { LoadingSpinner } from "../loading-spinner";
import { Banknote, Landmark } from "lucide-react";
import { transactionCategories } from "@/lib/transaction-categories";

const SubscriptionsOverview = () => {
  const path = usePathname();
  const [subscriptions, setSubscriptions] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSubscriptions = async () => {
    setIsLoading(true);
    try {
      const response = await FinanceAPI.getOverview("subscriptions");
      setSubscriptions(response);
      setIsLoading(false);
      setTotalAmount(response.data.reduce((sum, item) => sum + item.amount, 0));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className={`${isLoading ? "hidden" : ""}`}
      >
        <Table className={`bg-table ${isLoading ? "hidden" : ""}`}>
          {subscriptions?.data?.length ? (
            <TableCaption>
              A list of your recent subscriptions.{" "}
              <Link href={"/dashboard/subscriptions"} className="underline">
                See your all subscriptions
              </Link>
            </TableCaption>
          ) : (
            <TableCaption>{subscriptions?.message}</TableCaption>
          )}

          <TableHeader>
            <TableRow>
              <TableHead
                className={"w-[100px] text-black dark:text-white font-semibold"}
              >
                Category
              </TableHead>
              <TableHead className=" text-black dark:text-white font-semibold">
                Subscription
              </TableHead>
              <TableHead className={"text-black dark:text-white font-semibold"}>
                Due Date
              </TableHead>
              <TableHead className={"text-black dark:text-white font-semibold"}>
                Amount
              </TableHead>
              <TableHead className={"text-black dark:text-white font-semibold"}>
                Payment Method
              </TableHead>
              <TableHead className="text-black dark:text-white font-semibold text-right">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions?.data.map((subscription, index) => {
              return (
                <TableRow className="text-black dark:text-white" key={index++}>
                  <TableCell>
                    {transactionCategories.map((transaction) => {
                      const Icon = transaction.icon;
                      if (transaction.id == subscription.category) {
                        return <Icon key={subscription._id} />;
                      }
                    })}
                  </TableCell>
                  <TableCell>{subscription.subscription}</TableCell>
                  <TableCell>
                    {new Date(subscription.due_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat(["ban", "id"]).format(
                      subscription.amount
                    )}
                  </TableCell>
                  <TableCell className="capitalize flex gap-2 items-center">
                    {subscription.payment_method == "bank" ? (
                      <Landmark className={"text-blue-500 text-right"} />
                    ) : (
                      <Banknote className={"text-green-500 text-right"} />
                    )}
                    {subscription.payment_method}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={`capitalize ${
                        subscription.status == "paid"
                          ? "bg-green-500/50"
                          : "bg-red-500/50"
                      } text-white`}
                    >
                      {subscription.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow className="font-semibold text-black dark:text-white">
              <TableCell colSpan="5">Total</TableCell>
              <TableCell className="text-right">
                Rp. {new Intl.NumberFormat(["ban", "id"]).format(totalAmount)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </motion.div>
      <LoadingSpinner
        isLoading={isLoading}
        message={"Fetching Subscriptions...."}
      />
    </>
  );
};

export default SubscriptionsOverview;
