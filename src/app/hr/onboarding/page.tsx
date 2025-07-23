"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, User, Calendar, CheckCircle, Clock, AlertTriangle, FileText, Upload, Download, Mail, Phone } from "lucide-react"

const onboardingTasks = [
  {
    id: 1,
    employeeName: "Alice Johnson",
    position: "Software Engineer",
    startDate: "2024-02-01",
    status: "In Progress",
    progress: 65,
    email: "alice.johnson@aibos.com",
    phone: "+1 (555) 123-4567",
    tasks: [
      { name: "Complete Personal Information", status: "completed", dueDate: "2024-01-30" },
      { name: "Sign Employment Contract", status: "completed", dueDate: "2024-01-30" },
      { name: "IT Equipment Setup", status: "in-progress", dueDate: "2024-02-01" },
      { name: "Security Training", status: "pending", dueDate: "2024-02-02" },
      { name: "Department Orientation", status: "pending", dueDate: "2024-02-03" },
      { name: "Mentor Assignment", status: "pending", dueDate: "2024-02-03" }
    ]
  },
  {
    id: 2,
    employeeName: "Bob Smith",
    position: "Product Manager",
    startDate: "2024-02-05",
    status: "Not Started",
    progress: 0,
    email: "bob.smith@aibos.com",
    phone: "+1 (555) 234-5678",
    tasks: [
      { name: "Complete Personal Information", status: "pending", dueDate: "2024-02-03" },
      { name: "Sign Employment Contract", status: "pending", dueDate: "2024-02-03" },
      { name: "IT Equipment Setup", status: "pending", dueDate: "2024-02-05" },
      { name: "Security Training", status: "pending", dueDate: "2024-02-06" },
      { name: "Department Orientation", status: "pending", dueDate: "2024-02-07" },
      { name: "Mentor Assignment", status: "pending", dueDate: "2024-02-07" }
    ]
  },
  {
    id: 3,
    employeeName: "Carol Davis",
    position: "UX Designer",
    startDate: "2024-01-15",
    status: "Completed",
    progress: 100,
    email: "carol.davis@aibos.com",
    phone: "+1 (555) 345-6789",
    tasks: [
      { name: "Complete Personal Information", status: "completed", dueDate: "2024-01-13" },
      { name: "Sign Employment Contract", status: "completed", dueDate: "2024-01-13" },
      { name: "IT Equipment Setup", status: "completed", dueDate: "2024-01-15" },
      { name: "Security Training", status: "completed", dueDate: "2024-01-16" },
      { name: "Department Orientation", status: "completed", dueDate: "2024-01-17" },
      { name: "Mentor Assignment", status: "completed", dueDate: "2024-01-17" }
    ]
  }
]

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    "Completed": "bg-green-100 text-green-800",
    "In Progress": "bg-blue-100 text-blue-800",
    "Not Started": "bg-gray-100 text-gray-800",
    "Overdue": "bg-red-100 text-red-800"
  }
  return colors[status] || "bg-gray-100 text-gray-800"
}

const getTaskStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4 text-green-600" />
    case "in-progress":
      return <Clock className="w-4 h-4 text-blue-600" />
    case "pending":
      return <AlertTriangle className="w-4 h-4 text-gray-400" />
    default:
      return <Clock className="w-4 h-4 text-gray-400" />
  }
}

export default function OnboardingPage() {
  return (
    <MainLayout userRole="hr" title="Employee Onboarding">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search employees..." className="pl-10 w-64" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Start Onboarding
          </Button>
        </div>

        {/* Onboarding Progress Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {onboardingTasks.map((employee) => (
            <Card key={employee.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{employee.employeeName}</CardTitle>
                      <CardDescription>{employee.position}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(employee.status)} variant="secondary">
                    {employee.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {employee.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {employee.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Start Date: {new Date(employee.startDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">{employee.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${employee.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Task List */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Tasks:</p>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {employee.tasks.map((task, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          {getTaskStatusIcon(task.status)}
                          <span className={task.status === "completed" ? "line-through text-gray-500" : ""}>
                            {task.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Update Progress
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
                <div className="text-2xl font-bold text-blue-600">1</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">1</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">1</div>
                <div className="text-sm text-gray-600">Not Started</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">0</div>
                <div className="text-sm text-gray-600">Overdue</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Onboarding Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Templates</CardTitle>
            <CardDescription>Standard onboarding workflows for different roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Engineering Template</h4>
                  <FileText className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Standard onboarding for software engineers including technical setup and code access.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Use Template
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Management Template</h4>
                  <FileText className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Onboarding workflow for managers including leadership training and team introductions.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Use Template
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">General Template</h4>
                  <FileText className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Basic onboarding workflow suitable for most roles with standard company procedures.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Use Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

