"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { auditLogs } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Download,
  Calendar,
  Filter,
  Package,
  UserCheck,
  AlertTriangle,
  Pencil,
  Trash2,
  RefreshCw,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"

const actionConfig: Record<string, { icon: typeof Package; color: string; bg: string }> = {
  BATCH_CREATED: { icon: Package, color: "text-success", bg: "bg-success/10" },
  STOCK_CONSUMED: { icon: RefreshCw, color: "text-primary", bg: "bg-primary/10" },
  FIFO_OVERRIDE: { icon: AlertTriangle, color: "text-warning-foreground", bg: "bg-warning/10" },
  BATCH_UPDATED: { icon: Pencil, color: "text-primary", bg: "bg-primary/10" },
  ALERT_GENERATED: { icon: AlertTriangle, color: "text-critical", bg: "bg-critical/10" },
  USER_LOGIN: { icon: UserCheck, color: "text-success", bg: "bg-success/10" },
  BATCH_DELETED: { icon: Trash2, color: "text-critical", bg: "bg-critical/10" },
}

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64 transition-all duration-300">
        <Header
          title="Audit Logs"
          description="Complete record of all system activities"
        />

        <div className="p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{auditLogs.length}</p>
                  <p className="text-sm text-muted-foreground">Total Logs</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-lg bg-success/10 p-3">
                  <Package className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {auditLogs.filter((l) => l.action.includes("BATCH")).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Batch Actions</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-lg bg-warning/10 p-3">
                  <AlertTriangle className="h-6 w-6 text-warning-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {auditLogs.filter((l) => l.action === "FIFO_OVERRIDE").length}
                  </p>
                  <p className="text-sm text-muted-foreground">FIFO Overrides</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-lg bg-critical/10 p-3">
                  <Trash2 className="h-6 w-6 text-critical" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {auditLogs.filter((l) => l.action === "BATCH_DELETED").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Deletions</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-3">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search logs..." className="pl-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="BATCH_CREATED">Batch Created</SelectItem>
                  <SelectItem value="STOCK_CONSUMED">Stock Consumed</SelectItem>
                  <SelectItem value="FIFO_OVERRIDE">FIFO Override</SelectItem>
                  <SelectItem value="BATCH_UPDATED">Batch Updated</SelectItem>
                  <SelectItem value="ALERT_GENERATED">Alert Generated</SelectItem>
                  <SelectItem value="USER_LOGIN">User Login</SelectItem>
                  <SelectItem value="BATCH_DELETED">Batch Deleted</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Logs
            </Button>
          </div>

          {/* Audit Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Activity Log</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-semibold w-[200px]">Action</TableHead>
                    <TableHead className="font-semibold">Description</TableHead>
                    <TableHead className="font-semibold">User</TableHead>
                    <TableHead className="font-semibold">Details</TableHead>
                    <TableHead className="font-semibold">Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => {
                    const config = actionConfig[log.action] || {
                      icon: FileText,
                      color: "text-muted-foreground",
                      bg: "bg-muted",
                    }
                    const Icon = config.icon

                    return (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={cn("rounded-lg p-2", config.bg)}>
                              <Icon className={cn("h-4 w-4", config.color)} />
                            </div>
                            <Badge variant="outline" className="font-mono text-xs">
                              {log.action.replace("_", " ")}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[300px]">
                          <p className="truncate text-sm">{log.description}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {log.user === "System" ? (
                              <Badge variant="secondary" className="text-xs">
                                System
                              </Badge>
                            ) : (
                              <>
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                                  {log.user
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <span className="text-sm">{log.user}</span>
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(log.details).map(([key, value]) => (
                              <Badge
                                key={key}
                                variant="outline"
                                className="text-xs font-normal"
                              >
                                {key}: {String(value)}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                          {log.timestamp}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {auditLogs.length} of {auditLogs.length} entries
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
