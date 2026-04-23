"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ScanLine,
  Camera,
  Check,
  AlertTriangle,
  Package,
  Calendar,
  MapPin,
  Hash,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function ScannerPage() {
  const [scanResult, setScanResult] = useState<"idle" | "scanning" | "success" | "warning" | "error">("idle")
  const [manualCode, setManualCode] = useState("")

  const simulateScan = (type: "success" | "warning" | "error") => {
    setScanResult("scanning")
    setTimeout(() => {
      setScanResult(type)
    }, 1500)
  }

  const resetScan = () => {
    setScanResult("idle")
    setManualCode("")
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64 transition-all duration-300">
        <Header
          title="QR Scanner"
          description="Scan batch QR codes for validation and tracking"
        />

        <div className="p-6">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Scanner Area */}
              <Card className="lg:row-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Camera Scanner
                  </CardTitle>
                  <CardDescription>
                    Position the QR code within the frame to scan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Scanner Preview */}
                  <div
                    className={cn(
                      "relative aspect-square w-full rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-colors",
                      scanResult === "idle" && "border-muted-foreground/25 bg-muted/30",
                      scanResult === "scanning" && "border-primary bg-primary/5",
                      scanResult === "success" && "border-success bg-success/5",
                      scanResult === "warning" && "border-warning bg-warning/5",
                      scanResult === "error" && "border-critical bg-critical/5"
                    )}
                  >
                    {/* Scanner Frame Overlay */}
                    <div className="absolute inset-8 border-2 border-foreground/20 rounded-lg">
                      <div className="absolute -left-0.5 -top-0.5 h-6 w-6 border-l-4 border-t-4 border-primary rounded-tl-lg" />
                      <div className="absolute -right-0.5 -top-0.5 h-6 w-6 border-r-4 border-t-4 border-primary rounded-tr-lg" />
                      <div className="absolute -bottom-0.5 -left-0.5 h-6 w-6 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                      <div className="absolute -bottom-0.5 -right-0.5 h-6 w-6 border-b-4 border-r-4 border-primary rounded-br-lg" />
                    </div>

                    {/* Status Display */}
                    {scanResult === "idle" && (
                      <div className="text-center space-y-3">
                        <ScanLine className="h-16 w-16 mx-auto text-muted-foreground/50" />
                        <p className="text-sm text-muted-foreground">
                          Camera ready. Click below to simulate a scan.
                        </p>
                      </div>
                    )}

                    {scanResult === "scanning" && (
                      <div className="text-center space-y-3">
                        <div className="h-16 w-16 mx-auto rounded-full border-4 border-primary border-t-transparent animate-spin" />
                        <p className="text-sm text-primary font-medium">Scanning...</p>
                      </div>
                    )}

                    {scanResult === "success" && (
                      <div className="text-center space-y-3">
                        <div className="h-16 w-16 mx-auto rounded-full bg-success flex items-center justify-center">
                          <Check className="h-8 w-8 text-success-foreground" />
                        </div>
                        <p className="text-sm text-success font-medium">FIFO Validated</p>
                      </div>
                    )}

                    {scanResult === "warning" && (
                      <div className="text-center space-y-3">
                        <div className="h-16 w-16 mx-auto rounded-full bg-warning flex items-center justify-center">
                          <AlertTriangle className="h-8 w-8 text-warning-foreground" />
                        </div>
                        <p className="text-sm text-warning-foreground font-medium">FIFO Warning</p>
                      </div>
                    )}

                    {scanResult === "error" && (
                      <div className="text-center space-y-3">
                        <div className="h-16 w-16 mx-auto rounded-full bg-critical flex items-center justify-center">
                          <X className="h-8 w-8 text-critical-foreground" />
                        </div>
                        <p className="text-sm text-critical font-medium">Stock Expired</p>
                      </div>
                    )}

                    {/* Scanning Line Animation */}
                    {scanResult === "scanning" && (
                      <div className="absolute inset-x-8 top-8 h-0.5 bg-primary animate-pulse" 
                        style={{ animation: "scan 1.5s ease-in-out infinite" }} 
                      />
                    )}
                  </div>

                  {/* Demo Scan Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className="border-success/30 text-success hover:bg-success/10"
                      onClick={() => simulateScan("success")}
                      disabled={scanResult === "scanning"}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Valid
                    </Button>
                    <Button
                      variant="outline"
                      className="border-warning/30 text-warning-foreground hover:bg-warning/10"
                      onClick={() => simulateScan("warning")}
                      disabled={scanResult === "scanning"}
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Warning
                    </Button>
                    <Button
                      variant="outline"
                      className="border-critical/30 text-critical hover:bg-critical/10"
                      onClick={() => simulateScan("error")}
                      disabled={scanResult === "scanning"}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Expired
                    </Button>
                  </div>

                  {scanResult !== "idle" && scanResult !== "scanning" && (
                    <Button variant="outline" className="w-full" onClick={resetScan}>
                      Scan Another
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Manual Entry */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5" />
                    Manual Entry
                  </CardTitle>
                  <CardDescription>
                    Enter batch code manually if QR is damaged
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter batch code (e.g., MLK-2024-0892)"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                    />
                    <Button disabled={!manualCode} onClick={() => simulateScan("success")}>
                      Lookup
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Scan Result Details */}
              {(scanResult === "success" || scanResult === "warning" || scanResult === "error") && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Scan Result</CardTitle>
                      <Badge
                        className={cn(
                          scanResult === "success" && "bg-success/15 text-success border-success/30",
                          scanResult === "warning" && "bg-warning/15 text-warning-foreground border-warning/30",
                          scanResult === "error" && "bg-critical/15 text-critical border-critical/30"
                        )}
                      >
                        {scanResult === "success" && "FIFO Compliant"}
                        {scanResult === "warning" && "FIFO Violation"}
                        {scanResult === "error" && "Expired"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <Package className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Product</p>
                          <p className="font-medium">Whole Milk 1L</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <Hash className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Batch Code</p>
                          <p className="font-medium font-mono text-sm">MLK-2024-0892</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Expiry Date</p>
                          <p className="font-medium">Apr 29, 2026</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="font-medium">Cold Storage A</p>
                        </div>
                      </div>
                    </div>

                    {scanResult === "warning" && (
                      <div className="rounded-lg border border-warning/30 bg-warning/5 p-4">
                        <p className="text-sm font-medium text-warning-foreground mb-1">
                          ⚠️ Older Stock Available
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Batch <code className="bg-muted px-1 rounded">MLK-2024-0845</code> should be used first (manufactured Apr 10, 2026).
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            Override with Approval
                          </Button>
                          <Button size="sm">
                            Select Older Batch
                          </Button>
                        </div>
                      </div>
                    )}

                    {scanResult === "success" && (
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <Check className="mr-2 h-4 w-4" />
                          Confirm Selection
                        </Button>
                        <Button variant="outline" className="flex-1">
                          View Details
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
