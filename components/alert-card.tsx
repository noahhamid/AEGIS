import { cn } from "@/lib/utils"
import { AlertTriangle, AlertCircle, CheckCircle, Clock } from "lucide-react"

export interface AlertItem {
  id: string
  type: "critical" | "warning" | "info"
  title: string
  message: string
  timestamp: string
  batchCode?: string
}

interface AlertCardProps {
  alert: AlertItem
}

export function AlertCard({ alert }: AlertCardProps) {
  const config = {
    critical: {
      icon: AlertCircle,
      bg: "bg-critical/10",
      border: "border-critical/30",
      iconColor: "text-critical",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-warning/10",
      border: "border-warning/30",
      iconColor: "text-warning-foreground",
    },
    info: {
      icon: CheckCircle,
      bg: "bg-success/10",
      border: "border-success/30",
      iconColor: "text-success",
    },
  }

  const { icon: Icon, bg, border, iconColor } = config[alert.type]

  return (
    <div
      className={cn(
        "flex gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50",
        bg,
        border
      )}
    >
      <div className={cn("mt-0.5", iconColor)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-medium leading-tight">{alert.title}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {alert.timestamp}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{alert.message}</p>
        {alert.batchCode && (
          <code className="inline-block rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
            {alert.batchCode}
          </code>
        )}
      </div>
    </div>
  )
}
