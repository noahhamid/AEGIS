"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontal, Eye, Pencil, Trash2, QrCode } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface InventoryItem {
  id: string
  productName: string
  batchCode: string
  quantity: number
  unit: string
  manufactureDate: string
  expiryDate: string
  daysUntilExpiry: number
  riskLevel: "safe" | "warning" | "critical"
  location: string
}

interface InventoryTableProps {
  items: InventoryItem[]
  compact?: boolean
}

export function InventoryTable({ items, compact = false }: InventoryTableProps) {
  const getRiskBadge = (risk: InventoryItem["riskLevel"], days: number) => {
    const config = {
      safe: { className: "bg-success/15 text-success border-success/30", label: `${days}d left` },
      warning: { className: "bg-warning/15 text-warning-foreground border-warning/30", label: `${days}d left` },
      critical: { className: "bg-critical/15 text-critical border-critical/30", label: days <= 0 ? "Expired" : `${days}d left` },
    }
    return (
      <Badge variant="outline" className={cn("font-medium", config[risk].className)}>
        {config[risk].label}
      </Badge>
    )
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-semibold">Product</TableHead>
            <TableHead className="font-semibold">Batch Code</TableHead>
            <TableHead className="font-semibold text-right">Qty</TableHead>
            {!compact && <TableHead className="font-semibold">Location</TableHead>}
            <TableHead className="font-semibold">Mfg Date</TableHead>
            <TableHead className="font-semibold">Expiry</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className="group">
              <TableCell className="font-medium">{item.productName}</TableCell>
              <TableCell>
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                  {item.batchCode}
                </code>
              </TableCell>
              <TableCell className="text-right font-medium">
                {item.quantity} {item.unit}
              </TableCell>
              {!compact && <TableCell className="text-muted-foreground">{item.location}</TableCell>}
              <TableCell className="text-muted-foreground">{item.manufactureDate}</TableCell>
              <TableCell className="text-muted-foreground">{item.expiryDate}</TableCell>
              <TableCell>{getRiskBadge(item.riskLevel, item.daysUntilExpiry)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <QrCode className="mr-2 h-4 w-4" />
                      Show QR Code
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Batch
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-critical">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
