"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { AlertCard } from "@/components/alert-card"
import { alerts } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Bell,
  BellOff,
  Settings,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AlertsPage() {
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([])

  const criticalAlerts = alerts.filter((a) => a.type === "critical")
  const warningAlerts = alerts.filter((a) => a.type === "warning")
  const infoAlerts = alerts.filter((a) => a.type === "info")

  const toggleAlert = (id: string) => {
    setSelectedAlerts((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64 transition-all duration-300">
        <Header
          title="Alerts & Notifications"
          description="Monitor expiry warnings and system notifications"
        />

        <div className="p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-lg bg-critical/10 p-3">
                  <AlertCircle className="h-6 w-6 text-critical" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{criticalAlerts.length}</p>
                  <p className="text-sm text-muted-foreground">Critical</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-lg bg-warning/10 p-3">
                  <AlertTriangle className="h-6 w-6 text-warning-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{warningAlerts.length}</p>
                  <p className="text-sm text-muted-foreground">Warnings</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-lg bg-success/10 p-3">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{infoAlerts.length}</p>
                  <p className="text-sm text-muted-foreground">Info</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{alerts.length}</p>
                  <p className="text-sm text-muted-foreground">Total Alerts</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alert Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {selectedAlerts.length > 0 && (
                <>
                  <Badge variant="secondary">{selectedAlerts.length} selected</Badge>
                  <Button variant="outline" size="sm">
                    <Check className="mr-2 h-4 w-4" />
                    Mark as Read
                  </Button>
                  <Button variant="outline" size="sm">
                    <BellOff className="mr-2 h-4 w-4" />
                    Dismiss
                  </Button>
                </>
              )}
            </div>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Alert Settings
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">
                All Alerts
                <Badge variant="secondary" className="ml-2">
                  {alerts.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="critical">
                Critical
                <Badge className="ml-2 bg-critical/15 text-critical border-0">
                  {criticalAlerts.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="warning">
                Warning
                <Badge className="ml-2 bg-warning/15 text-warning-foreground border-0">
                  {warningAlerts.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="info">
                Info
                <Badge className="ml-2 bg-success/15 text-success border-0">
                  {infoAlerts.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    "relative cursor-pointer transition-all",
                    selectedAlerts.includes(alert.id) && "ring-2 ring-primary rounded-lg"
                  )}
                  onClick={() => toggleAlert(alert.id)}
                >
                  <AlertCard alert={alert} />
                </div>
              ))}
            </TabsContent>

            <TabsContent value="critical" className="space-y-3">
              {criticalAlerts.map((alert) => (
                <div key={alert.id} className="cursor-pointer" onClick={() => toggleAlert(alert.id)}>
                  <AlertCard alert={alert} />
                </div>
              ))}
            </TabsContent>

            <TabsContent value="warning" className="space-y-3">
              {warningAlerts.map((alert) => (
                <div key={alert.id} className="cursor-pointer" onClick={() => toggleAlert(alert.id)}>
                  <AlertCard alert={alert} />
                </div>
              ))}
            </TabsContent>

            <TabsContent value="info" className="space-y-3">
              {infoAlerts.map((alert) => (
                <div key={alert.id} className="cursor-pointer" onClick={() => toggleAlert(alert.id)}>
                  <AlertCard alert={alert} />
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
