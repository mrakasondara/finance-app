"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartStatistic } from "./ChartStatistic";
import FinanceAPI from "@/lib/FinanceAPI";
import { LoadingSpinner } from "../loading-spinner";

const chartConfig = {
  views: {
    label: "Page Views",
  },
  month: {
    label: "Month",
    color: "#59ac77",
  },
  week: {
    label: "Week",
    color: "#59ac77",
  },
};

export const TransactionsStatistic = () => {
  const [activeChart, setActiveChart] = useState("month");
  const [transactions, setTransactions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactionsStatistic = async () => {
    setIsLoading(true);
    try {
      const response = await FinanceAPI.getTransactionsStatistic();
      setTransactions(response);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactionsStatistic();
  }, []);

  const income = useMemo(() => {
    if (!transactions.data) return { week: 0, month: 0 };

    const week = transactions.data.lastWeek[0]
      ? transactions.data.lastWeek.length > 1
        ? transactions.data.lastWeek
            ?.filter((data) => data.transaction_type == "income")
            .reduce((acc, curr) => acc + curr.amount, 0)
        : weekChartData?.filter((data) => data.transaction_type == "income")[0]
            ?.amount
      : 0;
    const month = transactions.data.lastMonth[0]
      ? transactions.data.lastMonth.length > 1
        ? transactions.data.lastMonth
            ?.filter((data) => data.transaction_type == "income")
            .reduce((acc, curr) => acc + curr.amount, 0)
        : transactions.data.lastMonth?.filter(
            (data) => data.transaction_type == "income"
          )[0]?.amount
      : 0;
    return { week, month };
  }, [transactions]);

  const expense = useMemo(() => {
    if (!transactions.data) return { week: 0, month: 0 };

    const week = transactions.data.lastWeek[0]
      ? transactions.data.lastWeek.length > 1
        ? transactions.data.lastWeek
            ?.filter((data) => data.transaction_type == "expense")
            .reduce((acc, curr) => acc + curr.amount, 0)
        : weekChartData?.filter((data) => data.transaction_type == "expense")[0]
            ?.amount
      : 0;
    const month = transactions.data.lastMonth[0]
      ? transactions.data.lastMonth.length > 1
        ? transactions.data.lastMonth
            ?.filter((data) => data.transaction_type == "expense")
            .reduce((acc, curr) => acc + curr.amount, 0)
        : transactions.data.lastMonth?.filter(
            (data) => data.transaction_type == "expense"
          )[0]?.amount
      : 0;
    return { week, month };
  }, [transactions]);

  const totalValue = useMemo(() => {
    if (!transactions.data) return { week: 0, month: 0 };
    const month = income.month - expense.month;
    const week = income.week - expense.week;

    return { month, week };
  }, [transactions]);

  const chartProps = {
    transactions: transactions?.data,
    activeChart,
    chartConfig,
  };

  return (
    <>
      <LoadingSpinner isLoading={isLoading} message={"Fetching Statistic..."} />
      <Card className={`py-4 sm:py-0 ${isLoading ? "hidden" : ""}`}>
        <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
            <CardTitle>Transaction Statistic</CardTitle>
            <CardDescription>
              Showing total income and expense transaction for the last month or
              week
            </CardDescription>
          </div>
          <div className="flex">
            {["month", "week"].map((key) => {
              const chart = key;
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-muted-foreground text-xs">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg leading-none font-bold sm:text-3xl">
                    {!income[key] || !expense[key]
                      ? ""
                      : income[key] > expense[key]
                      ? ""
                      : "-"}
                    {totalValue[key].toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </CardHeader>
        <ChartStatistic {...chartProps} />
      </Card>
    </>
  );
};
