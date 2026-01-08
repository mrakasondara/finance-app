"use client";
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
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "../loading-spinner";
import { TransactionsDialog } from "./TransactionsDialog";
import FinanceAPI from "@/lib/FinanceAPI";
import { transactionCategories } from "@/lib/transaction-categories";
import { TransactionsDropdownActions } from "./TransactionsDropdownActions";

const TransactionsTable = () => {
  const path = usePathname();
  const isOverview = !path?.startsWith("/dashboard/transactions");

  const [transactions, setTransactions] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await FinanceAPI.getTransactions();
      setTransactions(response);
      setIsLoading(false);
      setTotalAmount(response.data.reduce((sum, item) => sum + item.amount, 0));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <>
      {isOverview ? "" : <TransactionsDialog fetchData={fetchTransactions} />}

      <Table className={`bg-table ${isLoading ? "hidden" : ""}`}>
        {isOverview ? (
          <TableCaption>
            A list of your recent transactions.{" "}
            <Link href={"/dashboard/transactions"} className="underline">
              See your all transactions
            </Link>
          </TableCaption>
        ) : transactions?.data?.length ? (
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
            <TableHead
              className={`text-black ${
                isOverview ? "text-right" : "text-left"
              } dark:text-white font-semibold`}
            >
              Payment Method
            </TableHead>
            {isOverview ? (
              ""
            ) : (
              <TableHead className="text-right text-black dark:text-white font-semibold">
                Actions
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.data?.map((transaction, index) => {
            return (
              <TableRow className={"text-black dark:text-white"} key={index++}>
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
                <TableCell>
                  {new Intl.NumberFormat(["ban", "id"]).format(
                    transaction.amount
                  )}
                </TableCell>
                <TableCell
                  className={`capitalize flex gap-2 items-center ${
                    isOverview ? "justify-end" : "justify-start"
                  }`}
                >
                  {transaction.payment_method == "bank" ? (
                    <Landmark className={"text-blue-500 text-right"} />
                  ) : (
                    <Banknote className={"text-green-500 text-right"} />
                  )}
                  {transaction.payment_method}
                </TableCell>
                {isOverview ? (
                  ""
                ) : (
                  <TableCell className="text-right">
                    <TransactionsDropdownActions
                      data={transaction}
                      fetchData={fetchTransactions}
                    />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow className={"font-semibold"}>
            <TableCell colSpan={isOverview ? 4 : 5}>Total</TableCell>
            <TableCell className="text-right">
              Rp. {new Intl.NumberFormat(["ban", "id"]).format(totalAmount)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <LoadingSpinner
        isLoading={isLoading}
        message={"Fetching Transactions...."}
      />
    </>
  );
};

export default TransactionsTable;
