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
  { month: "Mon", desktop: 186 },
  { month: "Tue", desktop: 305 },
  { month: "Wed", desktop: 237 },
  { month: "Thur", desktop: 73 },
  { month: "Fri", desktop: 209 },
  { month: "Sat", desktop: 214 },
  { month: "Sun ", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(300, 50.993377483443716%, 29.607843137254903%)",
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