"use client";

import { MainLayout } from "@/components/layout/main-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Filter,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Download,
  Shield,
  Key,
  UserPlus,
  Settings,
} from "lucide-react";
import React, { useState } from "react";
import { UserGrid } from "@/components/admin/users/UserGrid";
import { UserEditDialog } from "@/components/admin/users/UserEditDialog";
import { UserPermissionsDialog } from "@/components/admin/users/UserPermissionsDialog";
import { UserFilterModal } from "@/components/admin/users/UserFilterModal";
import { HeaderActions } from "@/components/admin/users/HeaderActions";

const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@aibos.com",
    phone: "+1 (555) 111-2222",
    position: "Engineering Manager",
    department: "Engineering",
    role: "Manager",
    status: "Active",
    lastLogin: "2024-01-24 09:30 AM",
    joinDate: "2022-03-15",
    location: "New York, NY",
    permissions: ["User Management", "Project Management", "Team Lead"],
    loginAttempts: 0,
    accountLocked: false,
    twoFactorEnabled: true,
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.wilson@aibos.com",
    phone: "+1 (555) 222-3333",
    position: "Product Director",
    department: "Product",
    role: "Director",
    status: "Active",
    lastLogin: "2024-01-24 08:45 AM",
    joinDate: "2021-08-20",
    location: "San Francisco, CA",
    permissions: ["Product Strategy", "User Management", "Budget Management"],
    loginAttempts: 0,
    accountLocked: false,
    twoFactorEnabled: true,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@aibos.com",
    phone: "+1 (555) 333-4444",
    position: "Design Lead",
    department: "Design",
    role: "Lead",
    status: "Active",
    lastLogin: "2024-01-24 10:15 AM",
    joinDate: "2022-01-10",
    location: "Austin, TX",
    permissions: ["Design Review", "Team Lead", "Creative Direction"],
    loginAttempts: 0,
    accountLocked: false,
    twoFactorEnabled: false,
  },
  {
    id: 4,
    name: "Lisa Chen",
    email: "lisa.chen@aibos.com",
    phone: "+1 (555) 444-5555",
    position: "Data Science Manager",
    department: "Analytics",
    role: "Manager",
    status: "Suspended",
    lastLogin: "2024-01-20 04:20 PM",
    joinDate: "2022-11-05",
    location: "Chicago, IL",
    permissions: ["Data Access", "Analytics Tools", "Team Lead"],
    loginAttempts: 3,
    accountLocked: true,
    twoFactorEnabled: true,
  },
  {
    id: 5,
    name: "Tom Anderson",
    email: "tom.anderson@aibos.com",
    phone: "+1 (555) 555-6666",
    position: "Marketing Director",
    department: "Marketing",
    role: "Director",
    status: "Active",
    lastLogin: "2024-01-24 11:00 AM",
    joinDate: "2021-05-12",
    location: "Los Angeles, CA",
    permissions: [
      "Marketing Campaigns",
      "Budget Management",
      "External Relations",
    ],
    loginAttempts: 0,
    accountLocked: false,
    twoFactorEnabled: true,
  },
  {
    id: 6,
    name: "Jane Davis",
    email: "jane.davis@aibos.com",
    phone: "+1 (555) 666-7777",
    position: "Sales Manager",
    department: "Sales",
    role: "Manager",
    status: "Inactive",
    lastLogin: "2024-01-15 02:30 PM",
    joinDate: "2023-02-28",
    location: "Miami, FL",
    permissions: ["CRM Access", "Sales Reports", "Client Management"],
    loginAttempts: 0,
    accountLocked: false,
    twoFactorEnabled: false,
  },
];

const recentActivities = [
  {
    id: 1,
    action: "User Created",
    user: "Alice Johnson",
    details: "New employee account created",
    timestamp: "2024-01-24 10:30 AM",
    type: "create",
  },
  {
    id: 2,
    action: "Permission Updated",
    user: "Bob Smith",
    details: "Added project management permissions",
    timestamp: "2024-01-24 09:15 AM",
    type: "update",
  },
  {
    id: 3,
    action: "Account Locked",
    user: "Lisa Chen",
    details: "Account locked due to failed login attempts",
    timestamp: "2024-01-23 03:45 PM",
    type: "security",
  },
  {
    id: 4,
    action: "Password Reset",
    user: "Mike Johnson",
    details: "Password reset requested and completed",
    timestamp: "2024-01-23 11:20 AM",
    type: "security",
  },
];

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    Active: "bg-green-100 text-green-800",
    Inactive: "bg-gray-100 text-gray-800",
    Suspended: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const getRoleColor = (role: string) => {
  const colors: { [key: string]: string } = {
    Director: "bg-purple-100 text-purple-800",
    Manager: "bg-blue-100 text-blue-800",
    Lead: "bg-indigo-100 text-indigo-800",
    Employee: "bg-gray-100 text-gray-800",
  };
  return colors[role] || "bg-gray-100 text-gray-800";
};

const getActivityTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    create: "bg-green-100 text-green-800",
    update: "bg-blue-100 text-blue-800",
    security: "bg-red-100 text-red-800",
  };
  return colors[type] || "bg-gray-100 text-gray-800";
};

export default function AdminUserManagementPage() {
  const [userList, setUserList] = useState(users);
  const [editUser, setEditUser] = useState<null | (typeof users)[0]>(null);
  const [editUserForm, setEditUserForm] = useState<any>(null);
  const [permissionsUser, setPermissionsUser] = useState<
    null | (typeof users)[0]
  >(null);
  const [permissionsForm, setPermissionsForm] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    role: "",
    department: "",
    twoFactorEnabled: "",
    accountLocked: ""
  });

  // Collect all unique permissions from all users
  const allPermissions = Array.from(
    new Set(users.flatMap((u) => u.permissions))
  );

  // Get unique departments and roles for filter options
  const departments = Array.from(new Set(users.map(u => u.department)));
  const roles = Array.from(new Set(users.map(u => u.role)));

  // Filter users based on search term and filters
  const filteredUsers = userList.filter(user => {
    const matchesSearch = searchTerm === "" || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filters.status === "" || user.status === filters.status;
    const matchesRole = filters.role === "" || user.role === filters.role;
    const matchesDepartment = filters.department === "" || user.department === filters.department;
    const matchesTwoFactor = filters.twoFactorEnabled === "" || 
      (filters.twoFactorEnabled === "true" ? user.twoFactorEnabled : !user.twoFactorEnabled);
    const matchesAccountLocked = filters.accountLocked === "" || 
      (filters.accountLocked === "true" ? user.accountLocked : !user.accountLocked);

    return matchesSearch && matchesStatus && matchesRole && matchesDepartment && matchesTwoFactor && matchesAccountLocked;
  });

  // Export to CSV function
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Position", "Department", "Role", "Status", "Location", "Join Date", "Last Login", "2FA Enabled", "Account Locked", "Permissions"];
    const csvData = filteredUsers.map(user => [
      user.name,
      user.email,
      user.phone,
      user.position,
      user.department,
      user.role,
      user.status,
      user.location,
      user.joinDate,
      user.lastLogin,
      user.twoFactorEnabled ? "Yes" : "No",
      user.accountLocked ? "Yes" : "No",
      user.permissions.join(", ")
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      status: "",
      role: "",
      department: "",
      twoFactorEnabled: "",
      accountLocked: ""
    });
    setSearchTerm("");
  };

  // Handle filter change
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Handler for Edit button
  const handleEdit = (user: (typeof users)[0]) => {
    setEditUser(user);
    setEditUserForm({ ...user });
  };

  // Handler for Permissions button
  const handlePermissions = (user: (typeof users)[0]) => {
    setPermissionsUser(user);
    setPermissionsForm([...user.permissions]);
  };

  // Handler for Lock/Unlock button
  const handleToggleLock = (userId: number) => {
    setUserList((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, accountLocked: !u.accountLocked } : u
      )
    );
  };

  // Handler to close modals
  const closeModals = () => {
    setEditUser(null);
    setPermissionsUser(null);
  };

  // Handle edit user form change
  const handleEditUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let fieldValue: any = value;
    if (type === "checkbox") {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setEditUserForm((prev: any) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  // Handle edit user form submit
  const handleEditUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserList((prev) =>
      prev.map((u) =>
        u.id === editUserForm.id
          ? { ...editUserForm, permissions: u.permissions }
          : u
      )
    );
    setEditUser(null);
  };

  // Handle permissions change
  const handlePermissionToggle = (perm: string) => {
    setPermissionsForm((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  // Handle permissions form submit
  const handlePermissionsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (permissionsUser) {
      setUserList((prev) =>
        prev.map((u) =>
          u.id === permissionsUser.id
            ? { ...u, permissions: permissionsForm }
            : u
        )
      );
    }
    setPermissionsUser(null);
  };

  return (
    <MainLayout userRole="admin" title="User Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <HeaderActions
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onShowFilter={() => setShowFilterModal(true)}
          onExport={exportToCSV}
          onAddUser={() => {}}
          onClear={clearFilters}
          filtersActive={Boolean(searchTerm || Object.values(filters).some(f => f !== ""))}
        />
        {/* Users Grid */}
        <UserGrid
          users={filteredUsers}
          getStatusColor={getStatusColor}
          getRoleColor={getRoleColor}
          onEdit={handleEdit}
          onPermissions={handlePermissions}
          onToggleLock={handleToggleLock}
        />
        {/* Edit User Dialog */}
        <UserEditDialog
          open={!!editUser}
          form={editUserForm}
          onChange={handleEditUserChange}
          onSubmit={handleEditUserSubmit}
          onCancel={closeModals}
        />
        {/* Permissions Dialog */}
        <UserPermissionsDialog
          open={!!permissionsUser}
          allPermissions={allPermissions}
          selected={permissionsForm}
          onToggle={handlePermissionToggle}
          onSubmit={handlePermissionsSubmit}
          onCancel={closeModals}
        />
        {/* Filter Modal */}
        <UserFilterModal
          open={showFilterModal}
          filters={filters}
          roles={roles}
          departments={departments}
          onChange={handleFilterChange}
          onClear={clearFilters}
          onClose={() => setShowFilterModal(false)}
        />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">4</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">1</div>
                <div className="text-sm text-gray-600">Inactive Users</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">1</div>
                <div className="text-sm text-gray-600">Suspended</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">4</div>
                <div className="text-sm text-gray-600">2FA Enabled</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">1</div>
                <div className="text-sm text-gray-600">Locked Accounts</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent User Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent User Activities</CardTitle>
            <CardDescription>
              Latest user management activities and security events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{activity.action}</p>
                        <Badge
                          className={getActivityTypeColor(activity.type)}
                          variant="secondary"
                        >
                          {activity.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {activity.user} • {activity.details}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Bulk User Actions</CardTitle>
            <CardDescription>
              Perform actions on multiple users simultaneously
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="justify-start">
                <UserPlus className="w-4 h-4 mr-2" />
                Bulk Import Users
              </Button>
              <Button variant="outline" className="justify-start">
                <Key className="w-4 h-4 mr-2" />
                Reset Passwords
              </Button>
              <Button variant="outline" className="justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Update Permissions
              </Button>
              <Button variant="outline" className="justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Export User Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
