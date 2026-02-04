"use client";
import { Banknote, Landmark } from "lucide-react";
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
import { useState, useEffect } from "react";
import { LoadingSpinner } from "../loading-spinner";
import { TransactionsDialog } from "./TransactionsDialog";
import FinanceAPI, { buildQuery } from "@/lib/FinanceAPI";
import { transactionCategories } from "@/lib/transaction-categories";
import { TransactionsDropdownActions } from "./TransactionsDropdownActions";
import { TransactionsFilter } from "./TransactionsFilter";
import { Button } from "../ui/button";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  const [transactionTypeFilter, setTransactionTypeFilter] = useState("");

  const setFilter = {
    setCategoryFilter,
    setPaymentMethodFilter,
    setTransactionTypeFilter,
  };

  const value = { categoryFilter, paymentMethodFilter, transactionTypeFilter };

  const fetchTransactions = async ({
    category = "",
    payment_method = "",
    transaction_type = "",
  }) => {
    setIsLoading(true);
    try {
      const response = await FinanceAPI.getTransactions({
        category,
        payment_method,
        transaction_type,
      });
      setTransactions(response);
      setTotalAmount(
        response.data.reduce((sum, item) => {
          if (item.transaction_type == "income") {
            return sum + item.amount;
          }
          return sum - item.amount;
        }, 0)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onExportPDF = () => {
    const value = {
      category: categoryFilter,
      payment_method: paymentMethodFilter,
      transaction_type: transactionTypeFilter,
    };

    const query = buildQuery(value);
    const url = query
      ? `${process.env.NEXT_PUBLIC_BASE_API}/pdf/transactions?${query}`
      : `${process.env.NEXT_PUBLIC_BASE_API}/pdf/transactions`;

    window.open(url, "_blank");
  };

  useEffect(() => {
    fetchTransactions({
      category: categoryFilter,
      payment_method: paymentMethodFilter,
      transactions_type: transactions,
    });
  }, []);
  return (
    <>
      <TransactionsDialog fetchData={fetchTransactions} />

      <TransactionsFilter
        valueFilter={value}
        setFilter={setFilter}
        fetchData={fetchTransactions}
      />

      <Button
        variant="outline"
        className="block w-30 bg-main text-white cursor-pointer"
        onClick={onExportPDF}
      >
        Export PDF
      </Button>

      <Table className={`bg-table ${isLoading ? "hidden" : ""}`}>
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
            <TableHead className="text-black dark:text-white font-semibold">
              Payment Method
            </TableHead>
            <TableHead className="text-right text-black dark:text-white font-semibold">
              Actions
            </TableHead>
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
                  className="capitalize flex gap-2 items-center
                   justify-start"
                >
                  {transaction.payment_method == "bank" ? (
                    <Landmark className={"text-blue-500 text-right"} />
                  ) : (
                    <Banknote className={"text-green-500 text-right"} />
                  )}
                  {transaction.payment_method}
                </TableCell>
                <TableCell className="text-right">
                  <TransactionsDropdownActions
                    data={transaction}
                    fetchData={fetchTransactions}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow className={"font-semibold"}>
            <TableCell colSpan="5">Total</TableCell>
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
