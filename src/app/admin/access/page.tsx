"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Shield, Users, Key, Lock, Unlock, Edit, Trash2, AlertTriangle, CheckCircle, Eye, Settings } from "lucide-react"

const roles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full system access with all administrative privileges",
    userCount: 2,
    permissions: [
      "User Management", "System Configuration", "Security Settings", 
      "Audit Logs", "Backup & Restore", "API Access", "Database Access"
    ],
    level: "System",
    color: "bg-red-100 text-red-800"
  },
  {
    id: 2,
    name: "HR Manager",
    description: "Human resources management and employee data access",
    userCount: 3,
    permissions: [
      "Employee Management", "Hiring Process", "Leave Management", 
      "Probation Tracking", "User Creation", "HR Reports"
    ],
    level: "Department",
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: 3,
    name: "GA Manager",
    description: "General affairs and facility management access",
    userCount: 2,
    permissions: [
      "Schedule Management", "Attendance Monitoring", "Cleaning Management", 
      "Facility Reports", "Staff Coordination"
    ],
    level: "Department",
    color: "bg-green-100 text-green-800"
  },
  {
    id: 4,
    name: "Department Head",
    description: "Departmental leadership with team management access",
    userCount: 5,
    permissions: [
      "Team Management", "Performance Reviews", "Budget Approval", 
      "Project Oversight", "Department Reports"
    ],
    level: "Department",
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: 5,
    name: "Employee",
    description: "Standard employee access to personal and work-related features",
    userCount: 85,
    permissions: [
      "Profile Management", "Leave Requests", "Time Tracking", 
      "Document Access", "Basic Reports"
    ],
    level: "User",
    color: "bg-gray-100 text-gray-800"
  }
]

const permissions = [
  {
    id: 1,
    name: "User Management",
    description: "Create, edit, and delete user accounts",
    category: "Administration",
    riskLevel: "High",
    assignedRoles: ["Super Admin", "HR Manager"]
  },
  {
    id: 2,
    name: "System Configuration",
    description: "Modify system settings and configurations",
    category: "System",
    riskLevel: "Critical",
    assignedRoles: ["Super Admin"]
  },
  {
    id: 3,
    name: "Employee Management",
    description: "Manage employee records and information",
    category: "HR",
    riskLevel: "Medium",
    assignedRoles: ["Super Admin", "HR Manager"]
  },
  {
    id: 4,
    name: "Schedule Management",
    description: "Create and modify employee schedules",
    category: "GA",
    riskLevel: "Low",
    assignedRoles: ["Super Admin", "GA Manager"]
  },
  {
    id: 5,
    name: "Financial Reports",
    description: "Access to financial and budget reports",
    category: "Finance",
    riskLevel: "High",
    assignedRoles: ["Super Admin", "Department Head"]
  }
]

const accessLogs = [
  {
    id: 1,
    user: "John Smith",
    action: "Login Successful",
    resource: "Admin Dashboard",
    timestamp: "2024-01-25 09:30:15",
    ipAddress: "192.168.1.100",
    status: "Success",
    riskLevel: "Low"
  },
  {
    id: 2,
    user: "Sarah Wilson",
    action: "Permission Modified",
    resource: "User: Alice Johnson",
    timestamp: "2024-01-25 08:45:22",
    ipAddress: "192.168.1.105",
    status: "Success",
    riskLevel: "Medium"
  },
  {
    id: 3,
    user: "Unknown",
    action: "Failed Login Attempt",
    resource: "Admin Portal",
    timestamp: "2024-01-25 03:22:18",
    ipAddress: "203.0.113.45",
    status: "Failed",
    riskLevel: "High"
  },
  {
    id: 4,
    user: "Mike Johnson",
    action: "Data Export",
    resource: "Employee Database",
    timestamp: "2024-01-24 16:15:33",
    ipAddress: "192.168.1.110",
    status: "Success",
    riskLevel: "Medium"
  }
]

const getRiskLevelColor = (level: string) => {
  const colors: { [key: string]: string } = {
    "Low": "bg-green-100 text-green-800",
    "Medium": "bg-yellow-100 text-yellow-800",
    "High": "bg-orange-100 text-orange-800",
    "Critical": "bg-red-100 text-red-800"
  }
  return colors[level] || "bg-gray-100 text-gray-800"
}

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    "Success": "bg-green-100 text-green-800",
    "Failed": "bg-red-100 text-red-800",
    "Warning": "bg-yellow-100 text-yellow-800"
  }
  return colors[status] || "bg-gray-100 text-gray-800"
}

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    "Administration": "bg-red-100 text-red-800",
    "System": "bg-purple-100 text-purple-800",
    "HR": "bg-blue-100 text-blue-800",
    "GA": "bg-green-100 text-green-800",
    "Finance": "bg-yellow-100 text-yellow-800"
  }
  return colors[category] || "bg-gray-100 text-gray-800"
}

export default function AccessControlPage() {
  return (
    <MainLayout userRole="admin" title="Access Control">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search roles or permissions..." className="pl-10 w-64" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Audit Log
            </Button>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Role
          </Button>
        </div>

        {/* Roles Management */}
        <Card>
          <CardHeader>
            <CardTitle>Role Management</CardTitle>
            <CardDescription>Manage user roles and their associated permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roles.map((role) => (
                <div key={role.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Shield className="w-5 h-5 text-gray-600" />
                        <h4 className="font-medium text-lg">{role.name}</h4>
                        <Badge className={role.color} variant="secondary">
                          {role.level}
                        </Badge>
                        <Badge variant="outline">
                          {role.userCount} users
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Permissions:</p>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.slice(0, 4).map((permission, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                          {role.permissions.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{role.permissions.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Users className="w-4 h-4 mr-1" />
                        Assign
                      </Button>
                      {role.name !== "Super Admin" && (
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Permissions Management */}
        <Card>
          <CardHeader>
            <CardTitle>Permission Management</CardTitle>
            <CardDescription>Manage individual permissions and their assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {permissions.map((permission) => (
                <div key={permission.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Key className="w-5 h-5 text-gray-600" />
                        <h4 className="font-medium">{permission.name}</h4>
                        <Badge className={getCategoryColor(permission.category)} variant="secondary">
                          {permission.category}
                        </Badge>
                        <Badge className={getRiskLevelColor(permission.riskLevel)} variant="secondary">
                          {permission.riskLevel} Risk
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{permission.description}</p>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Assigned to roles:</p>
                        <div className="flex flex-wrap gap-1">
                          {permission.assignedRoles.map((role, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Shield className="w-4 h-4 mr-1" />
                        Assign
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Access Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Access Logs</CardTitle>
            <CardDescription>Monitor user access and security events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {accessLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
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
                        <Badge className={getStatusColor(log.status)} variant="secondary">
                          {log.status}
                        </Badge>
                        <Badge className={getRiskLevelColor(log.riskLevel)} variant="secondary">
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className="text-sm text-gray-600">Active Roles</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">97</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">23</div>
                <div className="text-sm text-gray-600">Permissions</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">3</div>
                <div className="text-sm text-gray-600">Security Alerts</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Security Actions</CardTitle>
            <CardDescription>Quick access to common security management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="justify-start">
                <Lock className="w-4 h-4 mr-2" />
                Lock All Sessions
              </Button>
              <Button variant="outline" className="justify-start">
                <Key className="w-4 h-4 mr-2" />
                Force Password Reset
              </Button>
              <Button variant="outline" className="justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Enable 2FA
              </Button>
              <Button variant="outline" className="justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Security Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

