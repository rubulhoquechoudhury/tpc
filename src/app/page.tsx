"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Briefcase, Building2, DollarSign, TrendingUp } from "lucide-react"

import type { ChartConfig } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import PageHeader from "@/components/page-header"

const placementData = [
  { month: "Jan", placements: 65, offers: 80 },
  { month: "Feb", placements: 72, offers: 95 },
  { month: "Mar", placements: 88, offers: 110 },
  { month: "Apr", placements: 95, offers: 125 },
  { month: "May", placements: 102, offers: 140 },
  { month: "Jun", placements: 110, offers: 150 },
]

const salaryData = [
  { range: "4-6 LPA", count: 25 },
  { range: "6-8 LPA", count: 45 },
  { range: "8-10 LPA", count: 30 },
  { range: "10-15 LPA", count: 20 },
  { range: "15+ LPA", count: 15 },
]

const lineChartConfig = {
  placements: {
    label: "Placements",
    color: "hsl(var(--primary))",
  },
  offers: {
    label: "Offers",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

const barChartConfig = {
  count: {
    label: "Number of Students",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <PageHeader
        title="Dashboard"
        description="Overview of placement statistics and trends."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Offers"
          value="485"
          icon={Briefcase}
          change="+20.1% from last month"
        />
        <StatsCard
          title="Companies Visited"
          value="73"
          icon={Building2}
          change="+15 since last month"
        />
        <StatsCard
          title="Average Salary"
          value="₹8.2 LPA"
          icon={DollarSign}
          change="+5% from last year"
        />
        <StatsCard
          title="Highest Salary"
          value="₹25 LPA"
          icon={TrendingUp}
          change="from TechCorp"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Placement Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={lineChartConfig} className="h-64 w-full">
              <ResponsiveContainer>
                <LineChart data={placementData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="placements"
                    stroke="var(--color-placements)"
                    strokeWidth={2}
                    dot={true}
                  />
                  <Line
                    type="monotone"
                    dataKey="offers"
                    stroke="var(--color-offers)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Salary Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barChartConfig} className="h-64 w-full">
              <ResponsiveContainer>
                <BarChart data={salaryData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="range" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatsCard({
  title,
  value,
  icon: Icon,
  change,
}: {
  title: string
  value: string
  icon: React.ElementType
  change: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  )
}
