"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Calendar, Clock, User, MapPin, Edit, Trash2, Copy, AlertTriangle, CheckCircle } from "lucide-react"

const schedules = [
  {
    id: 1,
    employeeName: "Alice Johnson",
    department: "Engineering",
    date: "2024-01-25",
    startTime: "09:00",
    endTime: "17:00",
    breakTime: "12:00-13:00",
    location: "Office Floor 2",
    status: "Confirmed",
    type: "Regular",
    notes: "Standard work schedule"
  },
  {
    id: 2,
    employeeName: "Bob Smith",
    department: "Product",
    date: "2024-01-25",
    startTime: "10:00",
    endTime: "18:00",
    breakTime: "13:00-14:00",
    location: "Office Floor 3",
    status: "Confirmed",
    type: "Flexible",
    notes: "Flexible hours arrangement"
  },
  {
    id: 3,
    employeeName: "Carol Davis",
    department: "Design",
    date: "2024-01-25",
    startTime: "08:30",
    endTime: "16:30",
    breakTime: "12:30-13:30",
    location: "Design Studio",
    status: "Pending",
    type: "Early",
    notes: "Early shift preference"
  },
  {
    id: 4,
    employeeName: "David Wilson",
    department: "Analytics",
    date: "2024-01-25",
    startTime: "14:00",
    endTime: "22:00",
    breakTime: "18:00-19:00",
    location: "Office Floor 1",
    status: "Conflict",
    type: "Late",
    notes: "Overtime required for project deadline",
    conflict: "Exceeds daily hour limit"
  },
  {
    id: 5,
    employeeName: "Emma Brown",
    department: "Marketing",
    date: "2024-01-25",
    startTime: "09:00",
    endTime: "17:00",
    breakTime: "12:00-13:00",
    location: "Remote",
    status: "Confirmed",
    type: "Remote",
    notes: "Work from home day"
  }
]

const weeklySchedule = [
  {
    day: "Monday",
    date: "2024-01-22",
    employees: [
      { name: "Alice Johnson", time: "09:00-17:00", status: "present" },
      { name: "Bob Smith", time: "10:00-18:00", status: "present" },
      { name: "Carol Davis", time: "08:30-16:30", status: "present" }
    ]
  },
  {
    day: "Tuesday",
    date: "2024-01-23",
    employees: [
      { name: "Alice Johnson", time: "09:00-17:00", status: "present" },
      { name: "David Wilson", time: "14:00-22:00", status: "late" },
      { name: "Emma Brown", time: "09:00-17:00", status: "absent" }
    ]
  },
  {
    day: "Wednesday",
    date: "2024-01-24",
    employees: [
      { name: "Bob Smith", time: "10:00-18:00", status: "present" },
      { name: "Carol Davis", time: "08:30-16:30", status: "present" },
      { name: "David Wilson", time: "14:00-22:00", status: "present" }
    ]
  }
]

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    "Confirmed": "bg-green-100 text-green-800",
    "Pending": "bg-yellow-100 text-yellow-800",
    "Conflict": "bg-red-100 text-red-800",
    "Cancelled": "bg-gray-100 text-gray-800"
  }
  return colors[status] || "bg-gray-100 text-gray-800"
}

const getTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    "Regular": "bg-blue-100 text-blue-800",
    "Flexible": "bg-purple-100 text-purple-800",
    "Early": "bg-orange-100 text-orange-800",
    "Late": "bg-indigo-100 text-indigo-800",
    "Remote": "bg-green-100 text-green-800"
  }
  return colors[type] || "bg-gray-100 text-gray-800"
}

const getAttendanceStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    "present": "text-green-600",
    "late": "text-yellow-600",
    "absent": "text-red-600"
  }
  return colors[status] || "text-gray-600"
}

export default function ScheduleManagementPage() {
  return (
    <MainLayout userRole="ga" title="Schedule Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search schedules..." className="pl-10 w-64" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Calendar View
            </Button>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Schedule
          </Button>
        </div>

        {/* Today's Schedules */}
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Schedules - January 25, 2024</CardTitle>
            <CardDescription>Employee schedules and assignments for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">{schedule.employeeName}</h4>
                          <p className="text-sm text-gray-600">{schedule.department}</p>
                        </div>
                        <Badge className={getStatusColor(schedule.status)} variant="secondary">
                          {schedule.status}
                        </Badge>
                        <Badge className={getTypeColor(schedule.type)} variant="secondary">
                          {schedule.type}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {schedule.startTime} - {schedule.endTime}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          Break: {schedule.breakTime}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {schedule.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(schedule.date).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Notes:</strong> {schedule.notes}
                      </p>
                      
                      {schedule.conflict && (
                        <div className="flex items-center text-sm text-red-600 mb-2">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          <strong>Conflict:</strong> {schedule.conflict}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                      {schedule.status === "Conflict" && (
                        <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule Overview</CardTitle>
            <CardDescription>Schedule overview for the current week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklySchedule.map((day, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{day.day}</h4>
                      <p className="text-sm text-gray-600">{new Date(day.date).toLocaleDateString()}</p>
                    </div>
                    <Badge variant="outline">
                      {day.employees.length} employees
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {day.employees.map((employee, empIndex) => (
                      <div key={empIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-sm">{employee.name}</p>
                          <p className="text-xs text-gray-600">{employee.time}</p>
                        </div>
                        <span className={`text-xs font-medium ${getAttendanceStatusColor(employee.status)}`}>
                          {employee.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Schedule Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule Templates</CardTitle>
            <CardDescription>Pre-defined schedule templates for quick assignment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium mb-2">Standard 9-5</h4>
                <p className="text-sm text-gray-600 mb-2">09:00 - 17:00</p>
                <p className="text-xs text-gray-500">Regular office hours</p>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  Use Template
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium mb-2">Early Shift</h4>
                <p className="text-sm text-gray-600 mb-2">08:00 - 16:00</p>
                <p className="text-xs text-gray-500">Early start schedule</p>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  Use Template
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium mb-2">Late Shift</h4>
                <p className="text-sm text-gray-600 mb-2">14:00 - 22:00</p>
                <p className="text-xs text-gray-500">Afternoon/evening shift</p>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  Use Template
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium mb-2">Flexible Hours</h4>
                <p className="text-sm text-gray-600 mb-2">10:00 - 18:00</p>
                <p className="text-xs text-gray-500">Flexible timing</p>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  Use Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">4</div>
                <div className="text-sm text-gray-600">Confirmed Schedules</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">1</div>
                <div className="text-sm text-gray-600">Pending Approval</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">1</div>
                <div className="text-sm text-gray-600">Conflicts</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">40</div>
                <div className="text-sm text-gray-600">Total Hours</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

