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
  Shield,
  Users,
  Key,
  Lock,
  Unlock,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Eye,
  Settings,
} from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import RoleManagement from "@/components/admin/access/RoleManagement";
import PermissionManagement from "@/components/admin/access/PermissionManagement";
import AuditLogDialog from "@/components/admin/access/AuditLogDialog";
import HeaderActions from "@/components/admin/access/HeaderActions";
import QuickStats from "@/components/admin/access/QuickStats";
import SecurityActions from "@/components/admin/access/SecurityActions";

const roles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full system access with all administrative privileges",
    userCount: 2,
    permissions: [
      "User Management",
      "System Configuration",
      "Security Settings",
      "Audit Logs",
      "Backup & Restore",
      "API Access",
      "Database Access",
    ],
    level: "System",
    color: "bg-red-100 text-red-800",
  },
  {
    id: 2,
    name: "HR Manager",
    description: "Human resources management and employee data access",
    userCount: 3,
    permissions: [
      "Employee Management",
      "Hiring Process",
      "Leave Management",
      "Probation Tracking",
      "User Creation",
      "HR Reports",
    ],
    level: "Department",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    name: "GA Manager",
    description: "General affairs and facility management access",
    userCount: 2,
    permissions: [
      "Schedule Management",
      "Attendance Monitoring",
      "Cleaning Management",
      "Facility Reports",
      "Staff Coordination",
    ],
    level: "Department",
    color: "bg-green-100 text-green-800",
  },
  {
    id: 4,
    name: "Department Head",
    description: "Departmental leadership with team management access",
    userCount: 5,
    permissions: [
      "Team Management",
      "Performance Reviews",
      "Budget Approval",
      "Project Oversight",
      "Department Reports",
    ],
    level: "Department",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: 5,
    name: "Employee",
    description:
      "Standard employee access to personal and work-related features",
    userCount: 85,
    permissions: [
      "Profile Management",
      "Leave Requests",
      "Time Tracking",
      "Document Access",
      "Basic Reports",
    ],
    level: "User",
    color: "bg-gray-100 text-gray-800",
  },
];

const permissions = [
  {
    id: 1,
    name: "User Management",
    description: "Create, edit, and delete user accounts",
    category: "Administration",
    riskLevel: "High",
    assignedRoles: ["Super Admin", "HR Manager"],
  },
  {
    id: 2,
    name: "System Configuration",
    description: "Modify system settings and configurations",
    category: "System",
    riskLevel: "Critical",
    assignedRoles: ["Super Admin"],
  },
  {
    id: 3,
    name: "Employee Management",
    description: "Manage employee records and information",
    category: "HR",
    riskLevel: "Medium",
    assignedRoles: ["Super Admin", "HR Manager"],
  },
  {
    id: 4,
    name: "Schedule Management",
    description: "Create and modify employee schedules",
    category: "GA",
    riskLevel: "Low",
    assignedRoles: ["Super Admin", "GA Manager"],
  },
  {
    id: 5,
    name: "Financial Reports",
    description: "Access to financial and budget reports",
    category: "Finance",
    riskLevel: "High",
    assignedRoles: ["Super Admin", "Department Head"],
  },
];

const accessLogs = [
  {
    id: 1,
    user: "John Smith",
    action: "Login Successful",
    resource: "Admin Dashboard",
    timestamp: "2024-01-25 09:30:15",
    ipAddress: "192.168.1.100",
    status: "Success",
    riskLevel: "Low",
  },
  {
    id: 2,
    user: "Sarah Wilson",
    action: "Permission Modified",
    resource: "User: Alice Johnson",
    timestamp: "2024-01-25 08:45:22",
    ipAddress: "192.168.1.105",
    status: "Success",
    riskLevel: "Medium",
  },
  {
    id: 3,
    user: "Unknown",
    action: "Failed Login Attempt",
    resource: "Admin Portal",
    timestamp: "2024-01-25 03:22:18",
    ipAddress: "203.0.113.45",
    status: "Failed",
    riskLevel: "High",
  },
  {
    id: 4,
    user: "Mike Johnson",
    action: "Data Export",
    resource: "Employee Database",
    timestamp: "2024-01-24 16:15:33",
    ipAddress: "192.168.1.110",
    status: "Success",
    riskLevel: "Medium",
  },
];

const getRiskLevelColor = (level: string) => {
  const colors: { [key: string]: string } = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-orange-100 text-orange-800",
    Critical: "bg-red-100 text-red-800",
  };
  return colors[level] || "bg-gray-100 text-gray-800";
};

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    Success: "bg-green-100 text-green-800",
    Failed: "bg-red-100 text-red-800",
    Warning: "bg-yellow-100 text-yellow-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    Administration: "bg-red-100 text-red-800",
    System: "bg-purple-100 text-purple-800",
    HR: "bg-blue-100 text-blue-800",
    GA: "bg-green-100 text-green-800",
    Finance: "bg-yellow-100 text-yellow-800",
  };
  return colors[category] || "bg-gray-100 text-gray-800";
};

// Mock users for assignment
const allUsers = [
  "John Smith",
  "Sarah Wilson",
  "Alice Johnson",
  "Mike Johnson",
  "Jane Doe",
  "Bob Brown",
  "Emily White",
  "Chris Green",
  "Anna Black",
  "Tom Blue",
];

export default function AccessControlPage() {
  // Move roles and permissions to state
  const [rolesState, setRolesState] = useState(roles);
  const [permissionsState] = useState(permissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleLevelFilter, setRoleLevelFilter] = useState("");
  const [permissionCategoryFilter, setPermissionCategoryFilter] = useState("");

  // Filtered roles and permissions based on search and filter
  const filteredRoles = rolesState.filter((role) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      role.name.toLowerCase().includes(term) ||
      role.description.toLowerCase().includes(term) ||
      role.permissions.some((p: string) => p.toLowerCase().includes(term));
    const matchesLevel = roleLevelFilter
      ? role.level === roleLevelFilter
      : true;
    return matchesSearch && matchesLevel;
  });
  const filteredPermissions = permissionsState.filter((permission) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      permission.name.toLowerCase().includes(term) ||
      permission.description.toLowerCase().includes(term) ||
      permission.category.toLowerCase().includes(term);
    const matchesCategory = permissionCategoryFilter
      ? permission.category === permissionCategoryFilter
      : true;
    return matchesSearch && matchesCategory;
  });
  // Dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState<any>(null);
  const [editRoleData, setEditRoleData] = useState<any>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [roleToAssign, setRoleToAssign] = useState<any>(null);
  const [assignedUsers, setAssignedUsers] = useState<{
    [roleId: number]: string[];
  }>(() => {
    // Initialize with empty arrays for each role
    const initial: { [roleId: number]: string[] } = {};
    roles.forEach((r) => {
      initial[r.id] = [];
    });
    return initial;
  });
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newRoleData, setNewRoleData] = useState<any>({
    name: "",
    description: "",
    permissions: [""],
    level: "User",
    color: "bg-gray-100 text-gray-800",
  });
  const [auditLogDialogOpen, setAuditLogDialogOpen] = useState(false);

  const handleDeleteRole = (role: any) => {
    setRoleToDelete(role);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteRole = () => {
    setRolesState((prev) => prev.filter((r) => r.id !== roleToDelete.id));
    setDeleteDialogOpen(false);
    setRoleToDelete(null);
  };

  const cancelDeleteRole = () => {
    setDeleteDialogOpen(false);
    setRoleToDelete(null);
  };

  const handleEditRole = (role: any) => {
    setRoleToEdit(role);
    setEditRoleData({ ...role });
    setEditDialogOpen(true);
  };

  const handleEditRoleChange = (field: string, value: any) => {
    setEditRoleData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleEditRolePermissionChange = (index: number, value: string) => {
    setEditRoleData((prev: any) => {
      const newPerms = [...prev.permissions];
      newPerms[index] = value;
      return { ...prev, permissions: newPerms };
    });
  };

  const handleAddPermissionField = () => {
    setEditRoleData((prev: any) => ({
      ...prev,
      permissions: [...prev.permissions, ""],
    }));
  };

  const handleRemovePermissionField = (index: number) => {
    setEditRoleData((prev: any) => {
      const newPerms = [...prev.permissions];
      newPerms.splice(index, 1);
      return { ...prev, permissions: newPerms };
    });
  };

  const saveEditRole = () => {
    setRolesState((prev) =>
      prev.map((r) =>
        r.id === editRoleData.id
          ? { ...editRoleData, userCount: r.userCount }
          : r
      )
    );
    setEditDialogOpen(false);
    setRoleToEdit(null);
    setEditRoleData(null);
  };

  const cancelEditRole = () => {
    setEditDialogOpen(false);
    setRoleToEdit(null);
    setEditRoleData(null);
  };

  const handleAssignRole = (role: any) => {
    setRoleToAssign(role);
    setAssignDialogOpen(true);
  };

  const handleAssignUserChange = (user: string, checked: boolean) => {
    setAssignedUsers((prev) => {
      const current = prev[roleToAssign.id] || [];
      let updated;
      if (checked) {
        updated = [...current, user];
      } else {
        updated = current.filter((u) => u !== user);
      }
      return { ...prev, [roleToAssign.id]: updated };
    });
  };

  const saveAssignUsers = () => {
    setRolesState((prev) =>
      prev.map((r) =>
        r.id === roleToAssign.id
          ? { ...r, userCount: assignedUsers[roleToAssign.id]?.length || 0 }
          : r
      )
    );
    setAssignDialogOpen(false);
    setRoleToAssign(null);
  };

  const cancelAssignUsers = () => {
    setAssignDialogOpen(false);
    setRoleToAssign(null);
  };

  const handleOpenCreateDialog = () => {
    setNewRoleData({
      name: "",
      description: "",
      permissions: [""],
      level: "User",
      color: "bg-gray-100 text-gray-800",
    });
    setCreateDialogOpen(true);
  };

  const handleNewRoleChange = (field: string, value: any) => {
    setNewRoleData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleNewRolePermissionChange = (index: number, value: string) => {
    setNewRoleData((prev: any) => {
      const newPerms = [...prev.permissions];
      newPerms[index] = value;
      return { ...prev, permissions: newPerms };
    });
  };

  const handleAddNewPermissionField = () => {
    setNewRoleData((prev: any) => ({
      ...prev,
      permissions: [...prev.permissions, ""],
    }));
  };

  const handleRemoveNewPermissionField = (index: number) => {
    setNewRoleData((prev: any) => {
      const newPerms = [...prev.permissions];
      newPerms.splice(index, 1);
      return { ...prev, permissions: newPerms };
    });
  };

  const saveNewRole = () => {
    setRolesState((prev) => [
      ...prev,
      {
        id: Math.max(...prev.map((r) => r.id)) + 1,
        name: newRoleData.name,
        description: newRoleData.description,
        permissions: newRoleData.permissions,
        level: newRoleData.level,
        color:
          newRoleData.level === "System"
            ? "bg-red-100 text-red-800"
            : newRoleData.level === "Department"
            ? "bg-blue-100 text-blue-800"
            : "bg-gray-100 text-gray-800",
        userCount: 0,
      },
    ]);
    setCreateDialogOpen(false);
  };

  const cancelCreateRole = () => {
    setCreateDialogOpen(false);
  };

  return (
    <MainLayout userRole="admin" title="Access Control">
      <div className="space-y-6">
        {/* Header Actions */}
        <HeaderActions
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          roleLevelFilter={roleLevelFilter}
          onRoleLevelFilterChange={setRoleLevelFilter}
          permissionCategoryFilter={permissionCategoryFilter}
          onPermissionCategoryFilterChange={setPermissionCategoryFilter}
          onClearFilters={() => {
            setRoleLevelFilter("");
            setPermissionCategoryFilter("");
          }}
          onAuditLogClick={() => setAuditLogDialogOpen(true)}
          onCreateRoleClick={handleOpenCreateDialog}
        />

        {/* Roles Management */}
        <RoleManagement
          roles={filteredRoles}
          onEdit={handleEditRole}
          onAssign={handleAssignRole}
          onDelete={handleDeleteRole}
          editDialog={
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <DialogContent className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Role</DialogTitle>
                </DialogHeader>
                {editRoleData && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      saveEditRole();
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Role Name
                      </label>
                      <Input
                        value={editRoleData.name}
                        onChange={(e) =>
                          handleEditRoleChange("name", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Description
                      </label>
                      <Input
                        value={editRoleData.description}
                        onChange={(e) =>
                          handleEditRoleChange("description", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Permissions
                      </label>
                      <div className="space-y-2">
                        {editRoleData.permissions.map(
                          (perm: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Input
                                value={perm}
                                onChange={(e) =>
                                  handleEditRolePermissionChange(
                                    idx,
                                    e.target.value
                                  )
                                }
                                required
                              />
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => handleRemovePermissionField(idx)}
                                disabled={editRoleData.permissions.length === 1}
                              >
                                Remove
                              </Button>
                            </div>
                          )
                        )}
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={handleAddPermissionField}
                        >
                          Add Permission
                        </Button>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        type="button"
                        onClick={cancelEditRole}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Save</Button>
                    </DialogFooter>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          }
          assignDialog={
            <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
              <DialogContent className="max-w-lg w-full max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Assign Users to Role</DialogTitle>
                </DialogHeader>
                {roleToAssign && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      saveAssignUsers();
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Select users to assign to{" "}
                        <span className="font-semibold">
                          {roleToAssign.name}
                        </span>
                        :
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {allUsers.map((user) => (
                          <label key={user} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={
                                assignedUsers[roleToAssign.id]?.includes(
                                  user
                                ) || false
                              }
                              onChange={(e) =>
                                handleAssignUserChange(user, e.target.checked)
                              }
                            />
                            <span>{user}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        type="button"
                        onClick={cancelAssignUsers}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Save</Button>
                    </DialogFooter>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          }
          deleteDialog={
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Role</DialogTitle>
                </DialogHeader>
                <div>
                  Are you sure you want to delete the role{" "}
                  <span className="font-semibold">{roleToDelete?.name}</span>?
                  This action cannot be undone.
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={cancelDeleteRole}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-600 text-white"
                    onClick={confirmDeleteRole}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          }
          createDialog={
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogContent className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Role</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveNewRole();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Role Name
                    </label>
                    <Input
                      value={newRoleData.name}
                      onChange={(e) =>
                        handleNewRoleChange("name", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <Input
                      value={newRoleData.description}
                      onChange={(e) =>
                        handleNewRoleChange("description", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Level
                    </label>
                    <select
                      className="w-full border rounded px-2 py-1"
                      value={newRoleData.level}
                      onChange={(e) =>
                        handleNewRoleChange("level", e.target.value)
                      }
                    >
                      <option value="System">System</option>
                      <option value="Department">Department</option>
                      <option value="User">User</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Permissions
                    </label>
                    <div className="space-y-2">
                      {newRoleData.permissions.map(
                        (perm: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Input
                              value={perm}
                              onChange={(e) =>
                                handleNewRolePermissionChange(
                                  idx,
                                  e.target.value
                                )
                              }
                              required
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleRemoveNewPermissionField(idx)
                              }
                              disabled={newRoleData.permissions.length === 1}
                            >
                              Remove
                            </Button>
                          </div>
                        )
                      )}
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={handleAddNewPermissionField}
                      >
                        Add Permission
                      </Button>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={cancelCreateRole}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          }
        />

        {/* Permissions Management */}
        <PermissionManagement permissions={filteredPermissions} />

        {/* Access Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Access Logs</CardTitle>
            <CardDescription>
              Monitor user access and security events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {accessLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      {log.status === "Success" ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{log.action}</p>
                        <Badge
                          className={getStatusColor(log.status)}
                          variant="secondary"
                        >
                          {log.status}
                        </Badge>
                        <Badge
                          className={getRiskLevelColor(log.riskLevel)}
                          variant="secondary"
                        >
                          {log.riskLevel}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {log.user} • {log.resource} • {log.ipAddress}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{log.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <QuickStats
          activeRoles={rolesState.length}
          totalUsers={rolesState.reduce((sum, role) => sum + role.userCount, 0)}
          permissions={permissionsState.length}
          securityAlerts={3} // Mock data for now
        />

        {/* Security Actions */}
        <SecurityActions />
        {/* Audit Log Dialog */}
        <AuditLogDialog
          open={auditLogDialogOpen}
          onOpenChange={setAuditLogDialogOpen}
          accessLogs={accessLogs}
        />
      </div>
    </MainLayout>
  );
}
