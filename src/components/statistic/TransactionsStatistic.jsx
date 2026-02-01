"use client";

import { useState, useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const monthChartData = [
  { date: "2024-04-01", income: 150000, expense: 15000 },
  { date: "2024-04-05", income: 250000, expense: 50000 },
  { date: "2024-04-10", income: 180000, expense: 30000 },
  { date: "2024-04-15", income: 220000, expense: 80000 },
  { date: "2024-04-20", income: 270000, expense: 90000 },
  { date: "2024-04-25", income: 320000, expense: 1200000 },
  { date: "2024-04-30", income: 210000, expense: 60000 },
];
const weekChartData = [
  { date: "2024-05-01", income: 200000, expense: 50000 },
  { date: "2024-05-02", income: 180000, expense: 40000 },
  { date: "2024-05-03", income: 220000, expense: 70000 },
  { date: "2024-05-04", income: 250000, expense: 80000 },
  { date: "2024-05-05", income: 190000, expense: 60000 },
  { date: "2024-05-06", income: 210000, expense: 50000 },
  { date: "2024-05-07", income: 230000, expense: 90000 },
];

//   { date: "2024-04-01", desktop: 222, mobile: 150 },
//   { date: "2024-04-02", desktop: 97, mobile: 180 },
//   { date: "2024-04-03", desktop: 167, mobile: 120 },
//   { date: "2024-04-04", desktop: 242, mobile: 260 },
//   { date: "2024-04-05", desktop: 373, mobile: 290 },
//   { date: "2024-04-06", desktop: 301, mobile: 340 },
//   { date: "2024-04-07", desktop: 245, mobile: 180 },
//   { date: "2024-04-08", desktop: 409, mobile: 320 },
//   { date: "2024-04-09", desktop: 59, mobile: 110 },
//   { date: "2024-04-10", desktop: 261, mobile: 190 },
//   { date: "2024-04-11", desktop: 327, mobile: 350 },
//   { date: "2024-04-12", desktop: 292, mobile: 210 },
//   { date: "2024-04-13", desktop: 342, mobile: 380 },
//   { date: "2024-04-14", desktop: 137, mobile: 220 },
//   { date: "2024-04-15", desktop: 120, mobile: 170 },
//   { date: "2024-04-16", desktop: 138, mobile: 190 },
//   { date: "2024-04-17", desktop: 446, mobile: 360 },
//   { date: "2024-04-18", desktop: 364, mobile: 410 },
//   { date: "2024-04-19", desktop: 243, mobile: 180 },
//   { date: "2024-04-20", desktop: 89, mobile: 150 },
//   { date: "2024-04-21", desktop: 137, mobile: 200 },
//   { date: "2024-04-22", desktop: 224, mobile: 170 },
//   { date: "2024-04-23", desktop: 138, mobile: 230 },
//   { date: "2024-04-24", desktop: 387, mobile: 290 },
//   { date: "2024-04-25", desktop: 215, mobile: 250 },
//   { date: "2024-04-26", desktop: 75, mobile: 130 },
//   { date: "2024-04-27", desktop: 383, mobile: 420 },
//   { date: "2024-04-28", desktop: 122, mobile: 180 },
//   { date: "2024-04-29", desktop: 315, mobile: 240 },
//   { date: "2024-04-30", desktop: 454, mobile: 380 },
//   { date: "2024-05-01", desktop: 165, mobile: 220 },
//   { date: "2024-05-02", desktop: 293, mobile: 310 },
//   { date: "2024-05-03", desktop: 247, mobile: 190 },
//   { date: "2024-05-04", desktop: 385, mobile: 420 },
//   { date: "2024-05-05", desktop: 481, mobile: 390 },
//   { date: "2024-05-06", desktop: 498, mobile: 520 },
//   { date: "2024-05-07", desktop: 388, mobile: 300 },
//   { date: "2024-05-08", desktop: 149, mobile: 210 },
//   { date: "2024-05-09", desktop: 227, mobile: 180 },
//   { date: "2024-05-10", desktop: 293, mobile: 330 },
//   { date: "2024-05-11", desktop: 335, mobile: 270 },
//   { date: "2024-05-12", desktop: 197, mobile: 240 },
//   { date: "2024-05-13", desktop: 197, mobile: 160 },
//   { date: "2024-05-14", desktop: 448, mobile: 490 },
//   { date: "2024-05-15", desktop: 473, mobile: 380 },
//   { date: "2024-05-16", desktop: 338, mobile: 400 },
//   { date: "2024-05-17", desktop: 499, mobile: 420 },
//   { date: "2024-05-18", desktop: 315, mobile: 350 },
//   { date: "2024-05-19", desktop: 235, mobile: 180 },
//   { date: "2024-05-20", desktop: 177, mobile: 230 },
//   { date: "2024-05-21", desktop: 82, mobile: 140 },
//   { date: "2024-05-22", desktop: 81, mobile: 120 },
//   { date: "2024-05-23", desktop: 252, mobile: 290 },
//   { date: "2024-05-24", desktop: 294, mobile: 220 },
//   { date: "2024-05-25", desktop: 201, mobile: 250 },
//   { date: "2024-05-26", desktop: 213, mobile: 170 },
//   { date: "2024-05-27", desktop: 420, mobile: 460 },
//   { date: "2024-05-28", desktop: 233, mobile: 190 },
//   { date: "2024-05-29", desktop: 78, mobile: 130 },
//   { date: "2024-05-30", desktop: 340, mobile: 280 },
//   { date: "2024-05-31", desktop: 178, mobile: 230 },
//   { date: "2024-06-01", desktop: 178, mobile: 200 },
//   { date: "2024-06-02", desktop: 470, mobile: 410 },
//   { date: "2024-06-03", desktop: 103, mobile: 160 },
//   { date: "2024-06-04", desktop: 439, mobile: 380 },
//   { date: "2024-06-05", desktop: 88, mobile: 140 },
//   { date: "2024-06-06", desktop: 294, mobile: 250 },
//   { date: "2024-06-07", desktop: 323, mobile: 370 },
//   { date: "2024-06-08", desktop: 385, mobile: 320 },
//   { date: "2024-06-09", desktop: 438, mobile: 480 },
//   { date: "2024-06-10", desktop: 155, mobile: 200 },
//   { date: "2024-06-11", desktop: 92, mobile: 150 },
//   { date: "2024-06-12", desktop: 492, mobile: 420 },
//   { date: "2024-06-13", desktop: 81, mobile: 130 },
//   { date: "2024-06-14", desktop: 426, mobile: 380 },
//   { date: "2024-06-15", desktop: 307, mobile: 350 },
//   { date: "2024-06-16", desktop: 371, mobile: 310 },
//   { date: "2024-06-17", desktop: 475, mobile: 520 },
//   { date: "2024-06-18", desktop: 107, mobile: 170 },
//   { date: "2024-06-19", desktop: 341, mobile: 290 },
//   { date: "2024-06-20", desktop: 408, mobile: 450 },
//   { date: "2024-06-21", desktop: 169, mobile: 210 },
//   { date: "2024-06-22", desktop: 317, mobile: 270 },
//   { date: "2024-06-23", desktop: 480, mobile: 530 },
//   { date: "2024-06-24", desktop: 132, mobile: 180 },
//   { date: "2024-06-25", desktop: 141, mobile: 190 },
//   { date: "2024-06-26", desktop: 434, mobile: 380 },
//   { date: "2024-06-27", desktop: 448, mobile: 490 },
//   { date: "2024-06-28", desktop: 149, mobile: 200 },
//   { date: "2024-06-29", desktop: 103, mobile: 160 },
//   { date: "2024-06-30", desktop: 446, mobile: 400 },
// ];

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

  const income = useMemo(
    () => ({
      month:
        monthChartData.length > 1
          ? monthChartData.reduce((acc, curr) => acc + curr.income, 0)
          : monthChartData[0].income,
      week:
        weekChartData.length > 1
          ? weekChartData.reduce((acc, curr) => acc + curr.income, 0)
          : weekChartData[0].income,
    }),
    []
  );

  const expense = useMemo(
    () => ({
      month:
        monthChartData.length > 1
          ? monthChartData.reduce((acc, curr) => acc + curr.expense, 0)
          : monthChartData[0].expense,
      week:
        weekChartData.length > 1
          ? weekChartData.reduce((acc, curr) => acc + curr.expense, 0)
          : weekChartData[0].expense,
    }),
    []
  );

  return (
    <Card className="py-4 sm:py-0">
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
                  {income[key] > expense[key] ? "+" : ""}
                  {(income[key] - expense[key]).toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={activeChart == "month" ? monthChartData : weekChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="income"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="income"
              type="monotone"
              stroke={
                activeChart == "month"
                  ? chartConfig.month.color
                  : chartConfig.week.color
              }
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="expense"
              type="monotone"
              stroke="red"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
