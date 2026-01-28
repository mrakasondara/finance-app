"use client";
import { useState, useEffect } from "react";
import { Banknote, Film, Landmark } from "lucide-react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
} from "../ui/table";
import Link from "next/link";
import { motion } from "motion/react";
import { LoadingSpinner } from "../loading-spinner";
import FinanceAPI from "@/lib/FinanceAPI";
import { transactionCategories } from "@/lib/transaction-categories";

const TransactionsOverview = () => {
  const [transactions, setTransactions] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await FinanceAPI.getOverview("transactions");
      setTransactions(response);
      setIsLoading(false);
      setTotalAmount(
        response?.data?.reduce((sum, item) => {
          if (item.transaction_type == "income") {
            return sum + item.amount;
          }
          return sum - item.amount;
        }, 0)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner
          isLoading={isLoading}
          message={"Fetching Transactions...."}
        />
      ) : (
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className={`${isLoading ? "hidden" : "w-full"}`}
        >
          <Table className={`bg-table ${isLoading ? "hidden" : ""}`}>
            <TableCaption>
              A list of your recent transactions.{" "}
              <Link href={"/dashboard/transactions"} className="underline">
                See your all transactions
              </Link>
            </TableCaption>
            {transactions?.data?.length ? (
              ""
            ) : (
              <TableCaption>{transactions?.message}</TableCaption>
            )}

            <TableHeader>
              <TableRow>
                <TableHead className="text-black dark:text-white font-semibold">
                  Category
                </TableHead>
                <TableHead className="text-black dark:text-white font-semibold">
                  Purpose
                </TableHead>
                <TableHead className="text-black dark:text-white font-semibold">
                  Date
                </TableHead>
                <TableHead className="text-black dark:text-white font-semibold">
                  Amount
                </TableHead>
                <TableHead className="text-black text-right dark:text-white font-semibold">
                  Payment Method
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.data?.map((transaction, index) => {
                return (
                  <TableRow
                    className={"text-black dark:text-white"}
                    key={index++}
                  >
                    <TableCell>
                      {transactionCategories.map((category) => {
                        const Icon = category.icon;
                        if (category.id == transaction.category) {
                          return <Icon key={transaction._id} />;
                        }
                      })}
                    </TableCell>
                    <TableCell>{transaction.purpose}</TableCell>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      className={`${
                        transaction.transaction_type == "expense"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {transaction.transaction_type == "expense" ? "-" : "+"}
                      {new Intl.NumberFormat(["ban", "id"]).format(
                        transaction.amount
                      )}
                    </TableCell>
                    <TableCell
                      className="capitalize flex gap-2 items-center ${
                    justify-end"
                    >
                      {transaction.payment_method == "bank" ? (
                        <Landmark className={"text-blue-500 text-right"} />
                      ) : (
                        <Banknote className={"text-green-500 text-right"} />
                      )}
                      {transaction.payment_method}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow className={"font-semibold"}>
                <TableCell colSpan="4">Total</TableCell>
                <TableCell className="text-right">
                  Rp. {new Intl.NumberFormat(["ban", "id"]).format(totalAmount)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </motion.div>
      )}
    </>
  );
};

export default TransactionsOverview;
