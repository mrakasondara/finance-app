"use client";
import { CardContent } from "@/components/ui/card";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const ChartStatistic = ({ transactions, activeChart, chartConfig }) => {
  const monthData = [];
  const weekData = [];

  transactions?.lastMonth.forEach((data) => monthData.push(data));
  transactions?.lastWeek.forEach((data) => weekData.push(data));

  const monthChartData = monthData.map((data) => ({
    _id: data._id,
    expense: data.transaction_type == "expense" ? data.amount : 0,
    income: data.transaction_type == "income" ? data.amount : 0,
    date: data.date,
  }));

  const weekChartData = weekData.map((data) => ({
    _id: data._id,
    expense: data.transaction_type == "expense" ? data.amount : 0,
    income: data.transaction_type == "income" ? data.amount : 0,
    date: data.date,
  }));

  return (
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
  );
};
