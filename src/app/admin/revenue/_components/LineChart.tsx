"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartData {
  month: string;
  revenue: number;
}

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LineChartComponent() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStripeData = async () => {
      try {
        const response = await fetch("/api/linechart");
        if (!response.ok) {
          throw new Error("Failed to fetch revenue data");
        }

        const data = await response.json();

        // Transform data into chart format
        const formattedData = Object.entries(data.monthlyRevenue).map(
          ([month, revenue]) => ({
            month,
            revenue: Number(revenue),
          })
        );

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching Stripe data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStripeData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stripe Revenue</CardTitle>
        <CardDescription>Monthly Revenue</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="skeleton-chart shadow-md w-full h-[250px]" />
        ) : (
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="revenue"
                type="linear"
                stroke="var(--color-revenue)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by X% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total revenue for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
