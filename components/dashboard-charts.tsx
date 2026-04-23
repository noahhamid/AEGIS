"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts"

const stockTrendData = [
  { month: "Jan", inbound: 420, outbound: 380, waste: 12 },
  { month: "Feb", inbound: 380, outbound: 340, waste: 8 },
  { month: "Mar", inbound: 450, outbound: 420, waste: 15 },
  { month: "Apr", inbound: 520, outbound: 480, waste: 10 },
  { month: "May", inbound: 480, outbound: 450, waste: 6 },
  { month: "Jun", inbound: 550, outbound: 520, waste: 5 },
]

const riskDistributionData = [
  { name: "Safe", value: 156, color: "oklch(0.65 0.18 145)" },
  { name: "Warning", value: 23, color: "oklch(0.75 0.15 85)" },
  { name: "Critical", value: 8, color: "oklch(0.55 0.22 25)" },
]

const categoryData = [
  { category: "Dairy", batches: 45, value: 12500 },
  { category: "Produce", batches: 62, value: 8200 },
  { category: "Meat", batches: 28, value: 18700 },
  { category: "Bakery", batches: 35, value: 4500 },
  { category: "Beverages", batches: 17, value: 6800 },
]

export function StockTrendChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Stock Movement Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stockTrendData}>
              <defs>
                <linearGradient id="inboundGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.55 0.15 200)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.55 0.15 200)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="outboundGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.65 0.18 145)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.65 0.18 145)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-xs" tick={{ fill: "oklch(0.45 0.02 240)" }} />
              <YAxis className="text-xs" tick={{ fill: "oklch(0.45 0.02 240)" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.90 0.01 220)",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="inbound"
                stroke="oklch(0.55 0.15 200)"
                strokeWidth={2}
                fill="url(#inboundGradient)"
                name="Inbound"
              />
              <Area
                type="monotone"
                dataKey="outbound"
                stroke="oklch(0.65 0.18 145)"
                strokeWidth={2}
                fill="url(#outboundGradient)"
                name="Outbound"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function RiskDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Risk Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {riskDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.90 0.01 220)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function CategoryChart() {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Inventory by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
              <XAxis type="number" tick={{ fill: "oklch(0.45 0.02 240)" }} />
              <YAxis
                dataKey="category"
                type="category"
                width={80}
                tick={{ fill: "oklch(0.45 0.02 240)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.90 0.01 220)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="batches" fill="oklch(0.55 0.15 200)" radius={[0, 4, 4, 0]} name="Batches" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
