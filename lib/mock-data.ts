// Type definitions
export interface InventoryItem {
  id: string;
  productName: string;
  batchCode: string;
  quantity: number;
  unit: string;
  manufactureDate: string;
  expiryDate: string;
  daysUntilExpiry: number;
  riskLevel: 'critical' | 'warning' | 'safe';
  location: string;
}

export interface AlertItem {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  batchCode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Staff';
  status: 'active' | 'inactive';
  lastActive: string;
  avatar: string;
}

export interface AuditLog {
  id: string;
  action: string;
  description: string;
  user: string;
  timestamp: string;
  details: Record<string, any>;
}

export const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    productName: "Whole Milk 1L",
    batchCode: "MLK-2024-0892",
    quantity: 48,
    unit: "units",
    manufactureDate: "Apr 15, 2026",
    expiryDate: "Apr 29, 2026",
    daysUntilExpiry: 6,
    riskLevel: "warning",
    location: "Cold Storage A",
  },
  {
    id: "2",
    productName: "Fresh Bread Loaf",
    batchCode: "BRD-2024-1245",
    quantity: 24,
    unit: "units",
    manufactureDate: "Apr 22, 2026",
    expiryDate: "Apr 25, 2026",
    daysUntilExpiry: 2,
    riskLevel: "critical",
    location: "Bakery Section",
  },
  {
    id: "3",
    productName: "Organic Eggs (12pk)",
    batchCode: "EGG-2024-0567",
    quantity: 120,
    unit: "packs",
    manufactureDate: "Apr 18, 2026",
    expiryDate: "May 18, 2026",
    daysUntilExpiry: 25,
    riskLevel: "safe",
    location: "Cold Storage B",
  },
  {
    id: "4",
    productName: "Greek Yogurt 500g",
    batchCode: "YGT-2024-0334",
    quantity: 36,
    unit: "units",
    manufactureDate: "Apr 10, 2026",
    expiryDate: "Apr 24, 2026",
    daysUntilExpiry: 1,
    riskLevel: "critical",
    location: "Cold Storage A",
  },
  {
    id: "5",
    productName: "Chicken Breast 1kg",
    batchCode: "CHK-2024-0789",
    quantity: 85,
    unit: "kg",
    manufactureDate: "Apr 20, 2026",
    expiryDate: "Apr 27, 2026",
    daysUntilExpiry: 4,
    riskLevel: "warning",
    location: "Freezer Unit 1",
  },
  {
    id: "6",
    productName: "Orange Juice 2L",
    batchCode: "OJC-2024-0456",
    quantity: 60,
    unit: "bottles",
    manufactureDate: "Apr 12, 2026",
    expiryDate: "May 12, 2026",
    daysUntilExpiry: 19,
    riskLevel: "safe",
    location: "Beverage Aisle",
  },
  {
    id: "7",
    productName: "Cheddar Cheese 500g",
    batchCode: "CHS-2024-0123",
    quantity: 42,
    unit: "blocks",
    manufactureDate: "Apr 5, 2026",
    expiryDate: "Jun 5, 2026",
    daysUntilExpiry: 43,
    riskLevel: "safe",
    location: "Cold Storage A",
  },
  {
    id: "8",
    productName: "Fresh Salmon Fillet",
    batchCode: "SAL-2024-0678",
    quantity: 25,
    unit: "kg",
    manufactureDate: "Apr 21, 2026",
    expiryDate: "Apr 23, 2026",
    daysUntilExpiry: 0,
    riskLevel: "critical",
    location: "Seafood Counter",
  },
]

export const alerts: AlertItem[] = [
  {
    id: "1",
    type: "critical",
    title: "Expired Stock Detected",
    message: "Fresh Salmon Fillet has reached its expiry date. Immediate action required.",
    timestamp: "2 min ago",
    batchCode: "SAL-2024-0678",
  },
  {
    id: "2",
    type: "critical",
    title: "Stock Expiring Tomorrow",
    message: "Greek Yogurt 500g will expire in 1 day. Consider discounting or relocating.",
    timestamp: "15 min ago",
    batchCode: "YGT-2024-0334",
  },
  {
    id: "3",
    type: "warning",
    title: "FIFO Violation Warning",
    message: "Newer batch of Whole Milk selected before older stock. Please verify selection.",
    timestamp: "1 hour ago",
    batchCode: "MLK-2024-0892",
  },
  {
    id: "4",
    type: "warning",
    title: "Low Stock Alert",
    message: "Fresh Bread Loaf inventory is running low. Current stock: 24 units.",
    timestamp: "2 hours ago",
    batchCode: "BRD-2024-1245",
  },
  {
    id: "5",
    type: "info",
    title: "Stock Replenished",
    message: "Organic Eggs inventory has been successfully restocked with 120 new packs.",
    timestamp: "3 hours ago",
    batchCode: "EGG-2024-0567",
  },
]

export const users: User[] = [
  {
    id: "1",
    name: "Abebe Tekle",
    email: "abebe.tekle@aegis.com",
    role: "Admin",
    status: "active",
    lastActive: "2 min ago",
    avatar: "AT",
  },
  {
    id: "2",
    name: "Almaz Belay",
    email: "almaz.belay@aegis.com",
    role: "Manager",
    status: "active",
    lastActive: "5 min ago",
    avatar: "AB",
  },
  {
    id: "3",
    name: "Kebede Assefa",
    email: "kebede.assefa@aegis.com",
    role: "Staff",
    status: "active",
    lastActive: "1 hour ago",
    avatar: "KA",
  },
  {
    id: "4",
    name: "Fatima Mohammed",
    email: "fatima.mohammed@aegis.com",
    role: "Staff",
    status: "inactive",
    lastActive: "2 days ago",
    avatar: "FM",
  },
  {
    id: "5",
    name: "Girma Yohannes",
    email: "girma.yohannes@aegis.com",
    role: "Admin",
    status: "active",
    lastActive: "30 min ago",
    avatar: "GY",
  },
  {
    id: "6",
    name: "Selamawit Haile",
    email: "selamawit.haile@aegis.com",
    role: "Staff",
    status: "active",
    lastActive: "45 min ago",
    avatar: "SH",
  },
]

export const auditLogs: AuditLog[] = [
  {
    id: "1",
    action: "BATCH_CREATED",
    description: "New batch created for Organic Eggs (12pk)",
    user: "Abebe Tekle",
    timestamp: "Apr 23, 2026 09:45 AM",
    details: { batchCode: "EGG-2024-0567", quantity: 120 },
  },
  {
    id: "2",
    action: "STOCK_CONSUMED",
    description: "Stock consumed from Whole Milk 1L batch",
    user: "Almaz Belay",
    timestamp: "Apr 23, 2026 09:30 AM",
    details: { batchCode: "MLK-2024-0892", quantity: 12 },
  },
  {
    id: "3",
    action: "FIFO_OVERRIDE",
    description: "FIFO validation overridden for Chicken Breast",
    user: "Kebede Assefa",
    timestamp: "Apr 23, 2026 09:15 AM",
    details: { batchCode: "CHK-2024-0789", reason: "Customer request" },
  },
  {
    id: "4",
    action: "BATCH_UPDATED",
    description: "Batch location updated for Greek Yogurt 500g",
    user: "Abebe Tekle",
    timestamp: "Apr 23, 2026 08:50 AM",
    details: { batchCode: "YGT-2024-0334", oldLocation: "Storage", newLocation: "Cold Storage A" },
  },
  {
    id: "5",
    action: "ALERT_GENERATED",
    description: "Expiry alert generated for Fresh Salmon Fillet",
    user: "System",
    timestamp: "Apr 23, 2026 08:00 AM",
    details: { batchCode: "SAL-2024-0678", alertType: "CRITICAL" },
  },
  {
    id: "6",
    action: "USER_LOGIN",
    description: "User logged into the system",
    user: "Fatima Mohammed",
    timestamp: "Apr 22, 2026 04:30 PM",
    details: { ipAddress: "192.168.1.45" },
  },
  {
    id: "7",
    action: "BATCH_DELETED",
    description: "Expired batch removed from inventory",
    user: "Girma Yohannes",
    timestamp: "Apr 22, 2026 03:15 PM",
    details: { batchCode: "APL-2024-0234", reason: "Expired" },
  },
]
