"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart with a label";

const chartData = [
  { month: "Mon", desktop: 20 },
  { month: "Tue", desktop: 12 },
  { month: "Wed", desktop: 123 },
  { month: "Thur", desktop: 11 },
  { month: "Fri", desktop: 50 },
  { month: "Sat", desktop: 70 },
  { month: "Sun ", desktop: 123 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#0F8595",
  },
} satisfies ChartConfig;

export function Barchart() {
  return (
    <ChartContainer className="max-h-[200px] w-full " config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
