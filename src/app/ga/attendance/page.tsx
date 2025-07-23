"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Clock, User, Calendar, CheckCircle, XCircle, AlertTriangle, Edit, Download, MapPin } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const attendanceData = [
  {
    id: 1,
    employeeName: "Alice Johnson",
    department: "Engineering",
    date: "2024-01-25",
    checkIn: "08:58",
    checkOut: "17:05",
    breakStart: "12:00",
    breakEnd: "13:00",
    totalHours: "8h 7m",
    status: "Present",
    location: "Office Floor 2",
    overtime: "0h 7m"
  },
  {
    id: 2,
    employeeName: "Bob Smith",
    department: "Product",
    date: "2024-01-25",
    checkIn: "10:15",
    checkOut: "18:20",
    breakStart: "13:00",
    breakEnd: "14:00",
    totalHours: "8h 5m",
    status: "Late",
    location: "Office Floor 3",
    overtime: "0h 20m",
    lateMinutes: 15
  },
  {
    id: 3,
    employeeName: "Carol Davis",
    department: "Design",
    date: "2024-01-25",
    checkIn: "08:30",
    checkOut: "16:35",
    breakStart: "12:30",
    breakEnd: "13:30",
    totalHours: "8h 5m",
    status: "Present",
    location: "Design Studio",
    overtime: "0h 5m"
  },
  {
    id: 4,
    employeeName: "David Wilson",
    department: "Analytics",
    date: "2024-01-25",
    checkIn: "14:00",
    checkOut: null,
    breakStart: null,
    breakEnd: null,
    totalHours: "In Progress",
    status: "Present",
    location: "Office Floor 1",
    overtime: "0h 0m"
  },
  {
    id: 5,
    employeeName: "Emma Brown",
    department: "Marketing",
    date: "2024-01-25",
    checkIn: null,
    checkOut: null,
    breakStart: null,
    breakEnd: null,
    totalHours: "0h 0m",
    status: "Absent",
    location: "Remote",
    overtime: "0h 0m"
  }
]

const weeklyAttendance = [
  { day: "Mon", present: 45, late: 3, absent: 5 },
  { day: "Tue", present: 42, late: 5, absent: 6 },
  { day: "Wed", present: 47, late: 2, absent: 4 },
  { day: "Thu", present: 44, late: 4, absent: 5 },
  { day: "Fri", present: 48, late: 1, absent: 4 },
]

const attendanceStats = [
  { name: "Present", value: 45, color: "#10B981" },
  { name: "Late", value: 3, color: "#F59E0B" },
  { name: "Absent", value: 5, color: "#EF4444" },
]

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    "Present": "bg-green-100 text-green-800",
    "Late": "bg-yellow-100 text-yellow-800",
    "Absent": "bg-red-100 text-red-800",
    "On Leave": "bg-blue-100 text-blue-800"
  }
  return colors[status] || "bg-gray-100 text-gray-800"
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Present":
      return <CheckCircle className="w-4 h-4 text-green-600" />
    case "Late":
      return <AlertTriangle className="w-4 h-4 text-yellow-600" />
    case "Absent":
      return <XCircle className="w-4 h-4 text-red-600" />
    default:
      return <Clock className="w-4 h-4 text-gray-400" />
  }
}

export default function AttendancePage() {
  return (
    <MainLayout userRole="ga" title="Attendance Monitoring">
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
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Manual Entry
          </Button>
        </div>

        {/* Today's Attendance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Trend</CardTitle>
              <CardDescription>Daily attendance breakdown for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyAttendance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="present" fill="#10B981" name="Present" />
                  <Bar dataKey="late" fill="#F59E0B" name="Late" />
                  <Bar dataKey="absent" fill="#EF4444" name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Today's Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Attendance Status</CardTitle>
              <CardDescription>Current attendance distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={attendanceStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {attendanceStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-4 mt-4">
                {attendanceStats.map((stat, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }}></div>
                    <span className="text-sm">{stat.name}: {stat.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Attendance Details */}
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Attendance - January 25, 2024</CardTitle>
            <CardDescription>Detailed attendance records for all employees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceData.map((record) => (
                <div key={record.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">{record.employeeName}</h4>
                          <p className="text-sm text-gray-600">{record.department}</p>
                        </div>
                        {getStatusIcon(record.status)}
                        <Badge className={getStatusColor(record.status)} variant="secondary">
                          {record.status}
                        </Badge>
                        {record.lateMinutes && (
                          <Badge variant="outline" className="text-yellow-600">
                            {record.lateMinutes}min late
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Check In</p>
                          <p className="text-sm font-medium">{record.checkIn || "Not checked in"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Check Out</p>
                          <p className="text-sm font-medium">{record.checkOut || "Not checked out"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Break Start</p>
                          <p className="text-sm font-medium">{record.breakStart || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Break End</p>
                          <p className="text-sm font-medium">{record.breakEnd || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Total Hours</p>
                          <p className="text-sm font-medium">{record.totalHours}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Overtime</p>
                          <p className="text-sm font-medium">{record.overtime}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {record.location}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">45</div>
                <div className="text-sm text-gray-600">Present Today</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <div className="text-sm text-gray-600">Late Arrivals</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">5</div>
                <div className="text-sm text-gray-600">Absent</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">85%</div>
                <div className="text-sm text-gray-600">Attendance Rate</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">2.5h</div>
                <div className="text-sm text-gray-600">Avg Overtime</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Correction Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Time Correction Requests</CardTitle>
            <CardDescription>Pending time correction requests from employees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Bob Smith</p>
                    <p className="text-sm text-gray-600">Requests correction for Jan 24 - Forgot to check out</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    Reject
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Carol Davis</p>
                    <p className="text-sm text-gray-600">Requests break time adjustment for Jan 23</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

