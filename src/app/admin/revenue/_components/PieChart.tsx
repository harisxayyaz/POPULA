"use client";

import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { PieChart, Pie, LabelList } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define chart config
const chartConfig = {
  successful: {
    label: "Successful",
    color: "hsl(var(--chart-1))",
  },
  unsuccessful: {
    label: "Unsuccessful",
    color: "hsl(var(--chart-2))",
  },
  failed: {
    label: "Failed",
    color: "hsl(var(--chart-3))",
  },
};

export function PieChartComponent() {
  interface Transaction {
    status: keyof typeof chartConfig;
    value: number;
  }

  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await fetch("/api/piechart");
        if (!response.ok) throw new Error("Failed to fetch transaction data");
        const data = await response.json();
        setTransactionData(data);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, []);
  // Prepare chart data in the required format
  const chartData = transactionData.map((transaction) => ({
    status: transaction.status,
    value: transaction.value,
    fill: chartConfig[transaction.status]?.color || "gray",
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Transaction Status</CardTitle>
        <CardDescription>Real-Time Stripe Transaction Data</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {loading ? (
          <div className="skeleton-chart shadow-md mx-auto aspect-square max-h-[250px]" />
        ) : (
          <ChartContainer
            className="mx-auto aspect-square max-h-[250px]"
            config={chartConfig}
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="value" hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                <LabelList
                  dataKey="status"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing real-time transaction status data
        </div>
      </CardFooter>
    </Card>
  );
}
