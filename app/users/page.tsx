"use client";

import { useState, useMemo } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { users as initialUsers, type User } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import { Plus, Edit2, Trash2, Search, Users as UsersIcon } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "Staff",
    status: "active",
  });

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === "all" || user.role === filterRole;
      const matchesStatus =
        filterStatus === "all" || user.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, filterRole, filterStatus]);

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
    admins: users.filter((u) => u.role === "Admin").length,
  };

  const handleAddUser = () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role as "Admin" | "Manager" | "Staff",
      status: formData.status as "active" | "inactive",
      lastActive: "Just now",
      avatar: formData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    };

    setUsers([...users, newUser]);
    setIsAddDialogOpen(false);
    setFormData({
      name: "",
      email: "",
      role: "Staff",
      status: "active",
    });
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData(user);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingUser || !formData.name || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    const updatedUser: User = {
      ...editingUser,
      name: formData.name,
      email: formData.email,
      role: formData.role as "Admin" | "Manager" | "Staff",
      status: formData.status as "active" | "inactive",
      avatar: formData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    };

    setUsers(users.map((u) => (u.id === editingUser.id ? updatedUser : u)));
    setIsEditDialogOpen(false);
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      role: "Staff",
      status: "active",
    });
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
    setIsDeleteDialogOpen(false);
    setDeleteUserId(null);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-800";
      case "Manager":
        return "bg-blue-100 text-blue-800";
      case "Staff":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64 transition-all duration-300 flex-1">
        <Header
          title="User Management"
          description="Manage system users and their permissions"
        />
        <main className="p-6 md:p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  User Management
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage system users and their permissions
                </p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <Plus size={20} />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Name *</label>
                      <Input
                        placeholder="Enter full name"
                        value={formData.name || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email *</label>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Role</label>
                      <Select
                        value={formData.role || "Staff"}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            role: value as "Admin" | "Manager" | "Staff",
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Staff">Staff</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <Select
                        value={formData.status || "active"}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            status: value as "active" | "inactive",
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddUser} className="bg-primary">
                      Add User
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
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-green-600">
                    {stats.active}
                  </div>
                  <p className="text-sm text-muted-foreground">Active</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-red-600">
                    {stats.inactive}
                  </div>
                  <p className="text-sm text-muted-foreground">Inactive</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-purple-600">
                    {stats.admins}
                  </div>
                  <p className="text-sm text-muted-foreground">Admins</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
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
                        placeholder="Search by name or email..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={filterRole} onValueChange={setFilterRole}>
                      <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredUsers.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <UsersIcon
                        size={32}
                        className="mx-auto mb-2 opacity-50"
                      />
                      <p>No users found</p>
                    </div>
                  ) : (
                    filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                              {user.avatar}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground">
                                {user.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge className={getRoleColor(user.role)}>
                              {user.role}
                            </Badge>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status.charAt(0).toUpperCase() +
                                user.status.slice(1)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {user.lastActive}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditUser(user)}
                              className="gap-2"
                            >
                              <Edit2 size={16} />
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setDeleteUserId(user.id);
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
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name *</label>
              <Input
                placeholder="Enter full name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email *</label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <Select
                value={formData.role || "Staff"}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    role: value as "Admin" | "Manager" | "Staff",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Staff">Staff</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select
                value={formData.status || "active"}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value as "active" | "inactive",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
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
            <AlertDialogTitle>Delete User?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The user account will be permanently
              removed from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteUserId && handleDeleteUser(deleteUserId)}
            className="bg-destructive hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
