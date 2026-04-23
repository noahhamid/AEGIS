"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { InventoryTable } from "@/components/inventory-table"
import { inventoryItems } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Search, Filter, Download, Upload } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.batchCode.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRisk = riskFilter === "all" || item.riskLevel === riskFilter
    return matchesSearch && matchesRisk
  })

  const safeCount = inventoryItems.filter((i) => i.riskLevel === "safe").length
  const warningCount = inventoryItems.filter((i) => i.riskLevel === "warning").length
  const criticalCount = inventoryItems.filter((i) => i.riskLevel === "critical").length

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64 transition-all duration-300">
        <Header
          title="Inventory Management"
          description="Track and manage all inventory batches"
        />

        <div className="p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card
              className="cursor-pointer transition-colors hover:bg-success/5"
              onClick={() => setRiskFilter("safe")}
            >
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Safe Stock</p>
                  <p className="text-2xl font-bold">{safeCount}</p>
                </div>
                <Badge className="bg-success/15 text-success border-success/30">8+ days</Badge>
              </CardContent>
            </Card>
            <Card
              className="cursor-pointer transition-colors hover:bg-warning/5"
              onClick={() => setRiskFilter("warning")}
            >
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Warning Stock</p>
                  <p className="text-2xl font-bold">{warningCount}</p>
                </div>
                <Badge className="bg-warning/15 text-warning-foreground border-warning/30">2-7 days</Badge>
              </CardContent>
            </Card>
            <Card
              className="cursor-pointer transition-colors hover:bg-critical/5"
              onClick={() => setRiskFilter("critical")}
            >
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Critical Stock</p>
                  <p className="text-2xl font-bold">{criticalCount}</p>
                </div>
                <Badge className="bg-critical/15 text-critical border-critical/30">{"<"} 2 days</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products or batch codes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="safe">Safe</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Batch
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Batch</DialogTitle>
                    <DialogDescription>
                      Register a new inventory batch with product details and expiry information.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="product">Product Name</Label>
                      <Input id="product" placeholder="Enter product name" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input id="quantity" type="number" placeholder="0" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="unit">Unit</Label>
                        <Select>
                          <SelectTrigger id="unit">
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="units">Units</SelectItem>
                            <SelectItem value="kg">Kilograms</SelectItem>
                            <SelectItem value="liters">Liters</SelectItem>
                            <SelectItem value="packs">Packs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="mfg">Manufacture Date</Label>
                        <Input id="mfg" type="date" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" type="date" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Storage Location</Label>
                      <Select>
                        <SelectTrigger id="location">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cold-a">Cold Storage A</SelectItem>
                          <SelectItem value="cold-b">Cold Storage B</SelectItem>
                          <SelectItem value="freezer">Freezer Unit 1</SelectItem>
                          <SelectItem value="bakery">Bakery Section</SelectItem>
                          <SelectItem value="beverage">Beverage Aisle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Create Batch</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                All Batches
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({filteredItems.length} items)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <InventoryTable items={filteredItems} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
