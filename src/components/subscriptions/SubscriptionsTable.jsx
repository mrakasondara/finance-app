"use client";
import { useState, useEffect } from "react";
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
import FinanceAPI, { buildQuery } from "@/lib/FinanceAPI";
import { SubscriptionsDialog } from "./SubscriptionsDialog";
import { LoadingSpinner } from "../loading-spinner";
import { Banknote, Landmark } from "lucide-react";
import { transactionCategories } from "@/lib/transaction-categories";
import { SubscriptionsDropdownActions } from "./SubscriptionsDropdownActions";
import { SubscriptionsFilter } from "./SubscriptionsFilter";
import { Button } from "../ui/button";

const SubscriptionsTable = () => {
  const [subscriptions, setSubscriptions] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const setFilter = {
    setCategoryFilter,
    setPaymentMethodFilter,
    setStatusFilter,
  };

  const value = {
    categoryFilter,
    paymentMethodFilter,
    statusFilter,
  };

  const fetchSubscriptions = async ({ category, payment_method, status }) => {
    setIsLoading(true);
    try {
      const response = await FinanceAPI.getSubcriptions({
        category,
        payment_method,
        status,
      });
      setSubscriptions(response);
      setIsLoading(false);
      setTotalAmount(response.data.reduce((sum, item) => sum + item.amount, 0));
    } catch (error) {
      console.error(error);
    }
  };

  const onExportPDF = () => {
    const value = {
      category: categoryFilter,
      payment_method: paymentMethodFilter,
      status: statusFilter,
    };
    const query = buildQuery(value);
    const url = query
      ? `${process.env.NEXT_PUBLIC_BASE_API}/pdf/subscriptions?${query}`
      : `${process.env.NEXT_PUBLIC_BASE_API}/pdf/subscriptions`;

    window.open(url, "_blank");
  };

  useEffect(() => {
    fetchSubscriptions({
      category: categoryFilter,
      payment_method: paymentMethodFilter,
      status: statusFilter,
    });
  }, []);

  return (
    <>
      <SubscriptionsDialog fetchData={fetchSubscriptions} />
      <SubscriptionsFilter
        valueFilter={value}
        setFilter={setFilter}
        fetchData={fetchSubscriptions}
      />
      <Button
        variant="outline"
        className="block w-30 bg-main text-white cursor-pointer"
        onClick={onExportPDF}
      >
        Export PDF
      </Button>
      <Table className={`bg-table ${isLoading ? "hidden" : ""}`}>
        {subscriptions?.data?.length ? (
          ""
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
            <TableHead className="text-black dark:text-white font-semibold text-left">
              Status
            </TableHead>
            <TableHead className="text-right text-black dark:text-white font-semibold">
              Actions
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
                <TableCell className="text-left">
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
                <TableCell className={"text-right"}>
                  <SubscriptionsDropdownActions
                    data={subscription}
                    fetchData={fetchSubscriptions}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow className="font-semibold text-black dark:text-white">
            <TableCell colSpan="6">Total</TableCell>
            <TableCell className="text-right">
              Rp. {new Intl.NumberFormat(["ban", "id"]).format(totalAmount)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <LoadingSpinner
        isLoading={isLoading}
        message={"Fetching Subscriptions...."}
      />
    </>
  );
};

export default SubscriptionsTable;
