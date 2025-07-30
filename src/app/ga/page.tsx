"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock, AlertTriangle, CheckCircle, Plus, Eye } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const attendanceData = [
  { day: "Mon", present: 45, absent: 5, late: 3 },
  { day: "Tue", present: 47, absent: 3, late: 3 },
  { day: "Wed", present: 46, absent: 4, late: 3 },
  { day: "Thu", present: 48, absent: 2, late: 3 },
  { day: "Fri", present: 44, absent: 6, late: 3 },
]

const cleaningTasks = [
  { area: "Office Floor 1", status: "completed", assignee: "John Doe", time: "9:00 AM" },
  { area: "Office Floor 2", status: "in-progress", assignee: "Jane Smith", time: "10:30 AM" },
  { area: "Conference Room A", status: "pending", assignee: "Mike Johnson", time: "2:00 PM" },
  { area: "Reception Area", status: "completed", assignee: "Sarah Wilson", time: "8:30 AM" },
]

const scheduleConflicts = [
  { employee: "Alice Brown", conflict: "Double booking", time: "2:00 PM - 4:00 PM" },
  { employee: "Bob Wilson", conflict: "Overtime limit", time: "6:00 PM - 8:00 PM" },
]

const attendanceStatusData = [
  { name: "Present", value: 45, color: "#10B981" },
  { name: "Absent", value: 5, color: "#EF4444" },
  { name: "Late", value: 3, color: "#F59E0B" },
]

export default function GADashboard() {
  return (
    <MainLayout userRole="ga" title="GA Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">53</div>
              <p className="text-xs text-muted-foreground">
                Active employees
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">45</div>
              <p className="text-xs text-muted-foreground">
                85% attendance rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Schedule Conflicts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">2</div>
              <p className="text-xs text-muted-foreground">
                Require attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cleaning Tasks</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                4 completed, 4 pending
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Attendance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance</CardTitle>
              <CardDescription>Daily attendance breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="present" fill="#10B981" />
                  <Bar dataKey="absent" fill="#EF4444" />
                  <Bar dataKey="late" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Today's Attendance Status */}
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Attendance Status</CardTitle>
              <CardDescription>Current attendance breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={attendanceStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {attendanceStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-4 mt-4">
                {attendanceStatusData.map((entry) => (
                  <div key={entry.name} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm">{entry.name}: {entry.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cleaning Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Today&apos;s Cleaning Tasks</CardTitle>
                <CardDescription>Scheduled cleaning assignments</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cleaningTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{task.area}</span>
                        <Badge 
                          variant={task.status === 'completed' ? 'default' : task.status === 'in-progress' ? 'secondary' : 'outline'}
                        >
                          {task.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {task.assignee} • {task.time}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Schedule Conflicts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                Schedule Conflicts
              </CardTitle>
              <CardDescription>Issues requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduleConflicts.map((conflict, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="flex-1">
                      <p className="font-medium text-orange-800">{conflict.employee}</p>
                      <p className="text-sm text-orange-600">{conflict.conflict}</p>
                      <p className="text-xs text-orange-500">{conflict.time}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Resolve
                    </Button>
                  </div>
                ))}
                {scheduleConflicts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <p className="text-sm">No conflicts detected</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common GA management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Create Schedule
              </Button>
              <Button variant="outline" className="justify-start">
                <Users className="w-4 h-4 mr-2" />
                Mark Attendance
              </Button>
              <Button variant="outline" className="justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Time Correction
              </Button>
              <Button variant="outline" className="justify-start">
                <CheckCircle className="w-4 h-4 mr-2" />
                Assign Cleaning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

