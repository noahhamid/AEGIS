"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { inventoryItems as initialInventoryItems } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, Plus, Edit2, Trash2, Package } from "lucide-react";

interface InventoryItem {
  id: string;
  productName: string;
  batchCode: string;
  quantity: number;
  unit: string;
  manufactureDate: string;
  expiryDate: string;
  daysUntilExpiry: number;
  riskLevel: "critical" | "warning" | "safe";
  location: string;
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(initialInventoryItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRisk, setFilterRisk] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    productName: "",
    batchCode: "",
    quantity: 0,
    unit: "units",
    manufactureDate: "",
    expiryDate: "",
    riskLevel: "safe",
    location: "",
  });

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.batchCode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterRisk === "all" || item.riskLevel === filterRisk;
      return matchesSearch && matchesFilter;
    });
  }, [items, searchTerm, filterRisk]);

  const stats = {
    total: items.length,
    critical: items.filter((i) => i.riskLevel === "critical").length,
    warning: items.filter((i) => i.riskLevel === "warning").length,
    safe: items.filter((i) => i.riskLevel === "safe").length,
  };

  const calculateDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date("2026-04-23");
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getRiskLevel = (days: number): "critical" | "warning" | "safe" => {
    if (days <= 7) return "critical";
    if (days <= 30) return "warning";
    return "safe";
  };

  const handleAddItem = () => {
    if (!formData.productName || !formData.batchCode || !formData.expiryDate) {
      alert("Please fill in all required fields");
      return;
    }

    const daysUntilExpiry = calculateDaysUntilExpiry(formData.expiryDate);
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      productName: formData.productName,
      batchCode: formData.batchCode,
      quantity: formData.quantity || 0,
      unit: formData.unit || "units",
      manufactureDate: formData.manufactureDate || "",
      expiryDate: formData.expiryDate,
      daysUntilExpiry,
      riskLevel: getRiskLevel(daysUntilExpiry),
      location: formData.location || "",
    };

    setItems([...items, newItem]);
    setIsAddDialogOpen(false);
    setFormData({
      productName: "",
      batchCode: "",
      quantity: 0,
      unit: "units",
      manufactureDate: "",
      expiryDate: "",
      riskLevel: "safe",
      location: "",
    });
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (
      !editingItem ||
      !formData.productName ||
      !formData.batchCode ||
      !formData.expiryDate
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const daysUntilExpiry = calculateDaysUntilExpiry(formData.expiryDate);
    const updatedItem: InventoryItem = {
      ...editingItem,
      productName: formData.productName,
      batchCode: formData.batchCode,
      quantity: formData.quantity || 0,
      unit: formData.unit || "units",
      manufactureDate: formData.manufactureDate || "",
      expiryDate: formData.expiryDate,
      daysUntilExpiry,
      riskLevel: getRiskLevel(daysUntilExpiry),
      location: formData.location || "",
    };

    setItems(items.map((i) => (i.id === editingItem.id ? updatedItem : i)));
    setIsEditDialogOpen(false);
    setEditingItem(null);
    setFormData({
      productName: "",
      batchCode: "",
      quantity: 0,
      unit: "units",
      manufactureDate: "",
      expiryDate: "",
      riskLevel: "safe",
      location: "",
    });
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
    setIsDeleteDialogOpen(false);
    setDeleteItemId(null);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "safe":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64 transition-all duration-300 flex-1">
        <Header
          title="Inventory Management"
          description="Track all product batches and manage stock"
        />
        <main className="p-6 md:p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Inventory Management
                </h1>
                <p className="text-muted-foreground mt-1">
                  Track all product batches and manage stock
                </p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <Plus size={20} />
                    Add Batch
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Batch</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">
                        Product Name *
                      </label>
                      <Input
                        placeholder="e.g., Whole Milk 1L"
                        value={formData.productName || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            productName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Batch Code *
                      </label>
                      <Input
                        placeholder="e.g., MLK-2024-0001"
                        value={formData.batchCode || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            batchCode: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">
                          Quantity *
                        </label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={formData.quantity || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              quantity: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Unit</label>
                        <Input
                          placeholder="units"
                          value={formData.unit || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, unit: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">
                          Manufacture Date
                        </label>
                        <Input
                          type="date"
                          value={formData.manufactureDate || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              manufactureDate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Expiry Date *
                        </label>
                        <Input
                          type="date"
                          value={formData.expiryDate || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              expiryDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Location</label>
                      <Input
                        placeholder="e.g., Cold Storage A"
                        value={formData.location || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddItem} className="bg-primary">
                      Add Batch
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-foreground">
                    {stats.total}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Batches</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-red-600">
                    {stats.critical}
                  </div>
                  <p className="text-sm text-muted-foreground">Critical</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-yellow-600">
                    {stats.warning}
                  </div>
                  <p className="text-sm text-muted-foreground">Warning</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-green-600">
                    {stats.safe}
                  </div>
                  <p className="text-sm text-muted-foreground">Safe</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Product Batches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search
                        className="absolute left-3 top-3 text-muted-foreground"
                        size={20}
                      />
                      <Input
                        placeholder="Search by product or batch code..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={filterRisk} onValueChange={setFilterRisk}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Filter by risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Risk Levels</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="safe">Safe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredItems.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Package size={32} className="mx-auto mb-2 opacity-50" />
                      <p>No items found</p>
                    </div>
                  ) : (
                    filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-foreground">
                                {item.productName}
                              </h3>
                              <Badge className={getRiskColor(item.riskLevel)}>
                                {item.riskLevel.charAt(0).toUpperCase() +
                                  item.riskLevel.slice(1)}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                              <div>
                                <span className="font-medium">Batch:</span>{" "}
                                {item.batchCode}
                              </div>
                              <div>
                                <span className="font-medium">Qty:</span>{" "}
                                {item.quantity} {item.unit}
                              </div>
                              <div>
                                <span className="font-medium">Expiry:</span>{" "}
                                {item.expiryDate}
                              </div>
                              <div>
                                <span className="font-medium">Location:</span>{" "}
                                {item.location}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditItem(item)}
                              className="gap-2"
                            >
                              <Edit2 size={16} />
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setDeleteItemId(item.id);
                                setIsDeleteDialogOpen(true);
                              }}
                              className="gap-2"
                            >
                              <Trash2 size={16} />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Batch</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Product Name *</label>
              <Input
                placeholder="e.g., Whole Milk 1L"
                value={formData.productName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Batch Code *</label>
              <Input
                placeholder="e.g., MLK-2024-0001"
                value={formData.batchCode || ""}
                onChange={(e) =>
                  setFormData({ ...formData, batchCode: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Quantity *</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.quantity || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Unit</label>
                <Input
                  placeholder="units"
                  value={formData.unit || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Manufacture Date</label>
                <Input
                  type="date"
                  value={formData.manufactureDate || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      manufactureDate: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Expiry Date *</label>
                <Input
                  type="date"
                  value={formData.expiryDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input
                placeholder="e.g., Cold Storage A"
                value={formData.location || ""}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="bg-primary">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Batch?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The batch will be permanently
              removed from inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteItemId && handleDeleteItem(deleteItemId)}
            className="bg-destructive hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
