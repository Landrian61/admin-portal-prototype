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
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  },
  {
    id: 4,
    name: "Lisa Chen",
    email: "lisa.chen@aibos.com",
    phone: "+1 (555) 444-5555",
    position: "Data Science Manager",
    department: "Analytics",
    role: "Manager",
    status: "Active",
    lastLogin: "2024-01-23 04:20 PM",
    joinDate: "2022-11-05",
    location: "Chicago, IL",
    permissions: ["Data Access", "Analytics Tools", "Team Lead"],
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
    lastLogin: "2024-01-20 02:30 PM",
    joinDate: "2023-02-28",
    location: "Miami, FL",
    permissions: ["CRM Access", "Sales Reports", "Client Management"],
  },
  {
    id: 7,
    name: "Alice Johnson",
    email: "alice.johnson@aibos.com",
    phone: "+1 (555) 123-4567",
    position: "Software Engineer",
    department: "Engineering",
    role: "Employee",
    status: "Active",
    lastLogin: "2024-01-24 09:00 AM",
    joinDate: "2024-01-15",
    location: "New York, NY",
    permissions: ["Code Repository", "Development Tools"],
  },
  {
    id: 8,
    name: "Bob Smith",
    email: "bob.smith@aibos.com",
    phone: "+1 (555) 234-5678",
    position: "Product Manager",
    department: "Product",
    role: "Employee",
    status: "Active",
    lastLogin: "2024-01-24 08:30 AM",
    joinDate: "2024-02-01",
    location: "San Francisco, CA",
    permissions: ["Product Tools", "Analytics Access"],
  },
];

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    Active: "bg-green-100 text-green-800",
    Inactive: "bg-red-100 text-red-800",
    Suspended: "bg-yellow-100 text-yellow-800",
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

export default function UserManagementPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? user.status === statusFilter : true;
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <MainLayout userRole="hr" title="User Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <select
                  className="border rounded px-2 py-1 text-sm text-gray-700 bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <div className="relative">
                <select
                  className="border rounded px-2 py-1 text-sm text-gray-700 bg-white"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="">All Roles</option>
                  <option value="Director">Director</option>
                  <option value="Manager">Manager</option>
                  <option value="Lead">Lead</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setStatusFilter("");
                  setRoleFilter("");
                }}
              >
                <Filter className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <Button onClick={() => router.push("/hr/users/add")}>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
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
                    <Badge
                      className={getStatusColor(user.status)}
                      variant="secondary"
                    >
                      {user.status}
                    </Badge>
                    <Badge
                      className={getRoleColor(user.role)}
                      variant="secondary"
                    >
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

                {/* Department & Join Date */}
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">
                      Department:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {user.department}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined:{" "}
                    {new Date(user.joinDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </div>
                </div>

                {/* Last Login */}
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Last Login:</span>
                  <span className="ml-2 text-gray-600">{user.lastLogin}</span>
                </div>

                {/* Permissions */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Permissions:
                  </p>
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
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.push(`/hr/users/${user.id}/edit`)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Shield className="w-4 h-4 mr-1" />
                    Permissions
                  </Button>
                  <Button size="sm" variant="outline">
                    {user.status === "Active" ? (
                      <Lock className="w-4 h-4" />
                    ) : (
                      <Unlock className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">7</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">1</div>
                <div className="text-sm text-gray-600">Inactive Users</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className="text-sm text-gray-600">Departments</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-sm text-gray-600">Managers</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent User Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent User Activity</CardTitle>
            <CardDescription>
              Latest user login and activity information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users
                .filter((user) => user.status === "Active")
                .sort(
                  (a, b) =>
                    new Date(b.lastLogin).getTime() -
                    new Date(a.lastLogin).getTime()
                )
                .slice(0, 5)
                .map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">
                          {user.position} • {user.department}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Last Login</p>
                      <p className="text-xs text-gray-500">{user.lastLogin}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Role Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Role Distribution</CardTitle>
            <CardDescription>
              User distribution across different roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">2</div>
                <div className="text-sm text-gray-600">Directors</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">Managers</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">1</div>
                <div className="text-sm text-gray-600">Leads</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-gray-600">2</div>
                <div className="text-sm text-gray-600">Employees</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
