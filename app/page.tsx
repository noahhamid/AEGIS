"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { StatsCard } from "@/components/stats-card"
import { InventoryTable } from "@/components/inventory-table"
import { AlertCard } from "@/components/alert-card"
import {
  StockTrendChart,
  RiskDistributionChart,
} from "@/components/dashboard-charts"
import { inventoryItems, alerts } from "@/lib/mock-data"
import { Package, AlertTriangle, TrendingUp, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  const criticalItems = inventoryItems.filter((item) => item.riskLevel === "critical")
  const warningItems = inventoryItems.filter((item) => item.riskLevel === "warning")

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64 transition-all duration-300">
        <Header
          title="Dashboard"
          description="Overview of your inventory health and alerts"
        />

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Batches"
              value="187"
              change="+12 this week"
              changeType="positive"
              icon={Package}
              iconColor="text-primary"
              iconBg="bg-primary/10"
            />
            <StatsCard
              title="Critical Alerts"
              value={criticalItems.length}
              change="Requires attention"
              changeType="negative"
              icon={AlertTriangle}
              iconColor="text-critical"
              iconBg="bg-critical/10"
            />
            <StatsCard
              title="FIFO Compliance"
              value="94.2%"
              change="+2.1% vs last month"
              changeType="positive"
              icon={TrendingUp}
              iconColor="text-success"
              iconBg="bg-success/10"
            />
            <StatsCard
              title="Avg. Shelf Life"
              value="18 days"
              change="Across all products"
              changeType="neutral"
              icon={Clock}
              iconColor="text-warning-foreground"
              iconBg="bg-warning/10"
            />
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 lg:grid-cols-3">
            <StockTrendChart />
            <RiskDistributionChart />
          </div>

          {/* Bottom Section */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent Alerts */}
            <Card className="lg:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold">Recent Alerts</CardTitle>
                <Link href="/alerts">
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    View All
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.slice(0, 4).map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </CardContent>
            </Card>

            {/* Expiring Soon Table */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold">Expiring Soon</CardTitle>
                <Link href="/inventory">
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    View All Inventory
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <InventoryTable
                  items={[...criticalItems, ...warningItems].slice(0, 5)}
                  compact
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
