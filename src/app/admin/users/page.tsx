"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, User, Mail, Phone, MapPin, Calendar, Edit, Trash2, Lock, Unlock, Download, Shield, Key, UserPlus, Settings } from "lucide-react"

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
    twoFactorEnabled: true
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
    twoFactorEnabled: true
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
    twoFactorEnabled: false
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
    twoFactorEnabled: true
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
    permissions: ["Marketing Campaigns", "Budget Management", "External Relations"],
    loginAttempts: 0,
    accountLocked: false,
    twoFactorEnabled: true
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
    twoFactorEnabled: false
  }
]

const recentActivities = [
  {
    id: 1,
    action: "User Created",
    user: "Alice Johnson",
    details: "New employee account created",
    timestamp: "2024-01-24 10:30 AM",
    type: "create"
  },
  {
    id: 2,
    action: "Permission Updated",
    user: "Bob Smith",
    details: "Added project management permissions",
    timestamp: "2024-01-24 09:15 AM",
    type: "update"
  },
  {
    id: 3,
    action: "Account Locked",
    user: "Lisa Chen",
    details: "Account locked due to failed login attempts",
    timestamp: "2024-01-23 03:45 PM",
    type: "security"
  },
  {
    id: 4,
    action: "Password Reset",
    user: "Mike Johnson",
    details: "Password reset requested and completed",
    timestamp: "2024-01-23 11:20 AM",
    type: "security"
  }
]

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    "Active": "bg-green-100 text-green-800",
    "Inactive": "bg-gray-100 text-gray-800",
    "Suspended": "bg-red-100 text-red-800"
  }
  return colors[status] || "bg-gray-100 text-gray-800"
}

const getRoleColor = (role: string) => {
  const colors: { [key: string]: string } = {
    "Director": "bg-purple-100 text-purple-800",
    "Manager": "bg-blue-100 text-blue-800",
    "Lead": "bg-indigo-100 text-indigo-800",
    "Employee": "bg-gray-100 text-gray-800"
  }
  return colors[role] || "bg-gray-100 text-gray-800"
}

const getActivityTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    "create": "bg-green-100 text-green-800",
    "update": "bg-blue-100 text-blue-800",
    "security": "bg-red-100 text-red-800"
  }
  return colors[type] || "bg-gray-100 text-gray-800"
}

export default function AdminUserManagementPage() {
  return (
    <MainLayout userRole="admin" title="User Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search users..." className="pl-10 w-64" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {users.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <CardDescription>{user.position}</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge className={getStatusColor(user.status)} variant="secondary">
                      {user.status}
                    </Badge>
                    <Badge className={getRoleColor(user.role)} variant="secondary">
                      {user.role}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {user.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {user.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {user.location}
                  </div>
                </div>

                {/* Security Info */}
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Department:</span>
                    <span className="ml-2 text-gray-600">{user.department}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined: {new Date(user.joinDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Last Login:</span>
                    <span className="ml-2 text-gray-600">{user.lastLogin}</span>
                  </div>
                </div>

                {/* Security Status */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">2FA Enabled:</span>
                    <Badge variant={user.twoFactorEnabled ? "default" : "outline"}>
                      {user.twoFactorEnabled ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Account Locked:</span>
                    <Badge variant={user.accountLocked ? "destructive" : "outline"}>
                      {user.accountLocked ? "Yes" : "No"}
                    </Badge>
                  </div>
                  {user.loginAttempts > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Failed Attempts:</span>
                      <Badge variant="destructive">
                        {user.loginAttempts}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Permissions */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Permissions:</p>
                  <div className="flex flex-wrap gap-1">
                    {user.permissions.slice(0, 2).map((permission, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                    {user.permissions.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{user.permissions.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Shield className="w-4 h-4 mr-1" />
                    Permissions
                  </Button>
                  <Button size="sm" variant="outline">
                    {user.accountLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
            <CardDescription>Latest user management activities and security events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{activity.action}</p>
                        <Badge className={getActivityTypeColor(activity.type)} variant="secondary">
                          {activity.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{activity.user} • {activity.details}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
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
            <CardDescription>Perform actions on multiple users simultaneously</CardDescription>
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
  )
}

