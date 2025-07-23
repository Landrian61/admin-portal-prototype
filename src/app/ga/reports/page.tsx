"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Calendar, Filter, FileText, BarChart3, PieChart, TrendingUp, Users, Clock, MapPin } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from "recharts"

const attendanceReport = [
  { month: "Aug", present: 92, late: 5, absent: 3 },
  { month: "Sep", present: 89, late: 7, absent: 4 },
  { month: "Oct", present: 94, late: 4, absent: 2 },
  { month: "Nov", present: 91, late: 6, absent: 3 },
  { month: "Dec", present: 88, late: 8, absent: 4 },
  { month: "Jan", present: 93, late: 4, absent: 3 },
]

const cleaningEfficiency = [
  { week: "Week 1", completed: 95, onTime: 88, quality: 92 },
  { week: "Week 2", completed: 92, onTime: 85, quality: 90 },
  { week: "Week 3", completed: 97, onTime: 92, quality: 95 },
  { week: "Week 4", completed: 94, onTime: 89, quality: 93 },
]

const departmentAttendance = [
  { name: "Engineering", value: 45, color: "#0b3a50" },
  { name: "Product", value: 12, color: "#50360B" },
  { name: "Design", value: 8, color: "#10B981" },
  { name: "Marketing", value: 15, color: "#F59E0B" },
  { name: "Sales", value: 10, color: "#EF4444" },
  { name: "Analytics", value: 6, color: "#8B5CF6" },
]

const overtimeData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3.2 },
  { day: "Wed", hours: 1.8 },
  { day: "Thu", hours: 4.1 },
  { day: "Fri", hours: 2.9 },
  { day: "Sat", hours: 1.2 },
  { day: "Sun", hours: 0.5 },
]

const reportTemplates = [
  {
    id: 1,
    name: "Monthly Attendance Report",
    description: "Comprehensive attendance analysis for the month",
    type: "Attendance",
    frequency: "Monthly",
    lastGenerated: "2024-01-01",
    format: "PDF"
  },
  {
    id: 2,
    name: "Weekly Cleaning Summary",
    description: "Cleaning tasks completion and efficiency metrics",
    type: "Cleaning",
    frequency: "Weekly",
    lastGenerated: "2024-01-22",
    format: "Excel"
  },
  {
    id: 3,
    name: "Overtime Analysis",
    description: "Employee overtime hours and cost analysis",
    type: "Overtime",
    frequency: "Bi-weekly",
    lastGenerated: "2024-01-15",
    format: "PDF"
  },
  {
    id: 4,
    name: "Department Performance",
    description: "Cross-department performance comparison",
    type: "Performance",
    frequency: "Monthly",
    lastGenerated: "2024-01-01",
    format: "Excel"
  }
]

const getTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    "Attendance": "bg-blue-100 text-blue-800",
    "Cleaning": "bg-green-100 text-green-800",
    "Overtime": "bg-yellow-100 text-yellow-800",
    "Performance": "bg-purple-100 text-purple-800"
  }
  return colors[type] || "bg-gray-100 text-gray-800"
}

export default function ReportsPage() {
  return (
    <MainLayout userRole="ga" title="Reports & Analytics">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input placeholder="Search reports..." className="pl-10 w-64" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">93%</div>
                  <div className="text-sm text-gray-600">Avg Attendance</div>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">97%</div>
                  <div className="text-sm text-gray-600">Cleaning Efficiency</div>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-yellow-600">16.2h</div>
                  <div className="text-sm text-gray-600">Weekly Overtime</div>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-600">96</div>
                  <div className="text-sm text-gray-600">Active Employees</div>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trends</CardTitle>
              <CardDescription>Monthly attendance patterns over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={attendanceReport}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="present" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="late" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="absent" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Department Attendance Distribution</CardTitle>
              <CardDescription>Current employee distribution by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={departmentAttendance}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentAttendance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {departmentAttendance.map((dept, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                    <span className="text-sm">{dept.name}: {dept.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cleaning Efficiency */}
          <Card>
            <CardHeader>
              <CardTitle>Cleaning Efficiency Metrics</CardTitle>
              <CardDescription>Weekly cleaning performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cleaningEfficiency}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="completed" stroke="#0b3a50" name="Completion %" />
                  <Line type="monotone" dataKey="onTime" stroke="#50360B" name="On Time %" />
                  <Line type="monotone" dataKey="quality" stroke="#10B981" name="Quality Score %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Overtime Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Overtime Hours</CardTitle>
              <CardDescription>Overtime distribution throughout the week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={overtimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Report Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Report Templates</CardTitle>
            <CardDescription>Pre-configured reports for regular analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTemplates.map((template) => (
                <div key={template.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="w-5 h-5 text-gray-600" />
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge className={getTypeColor(template.type)} variant="secondary">
                          {template.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Frequency: {template.frequency}</span>
                        <span>Format: {template.format}</span>
                        <span>Last: {new Date(template.lastGenerated).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-1" />
                      Generate
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Recently generated reports and downloads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">January 2024 Attendance Report</p>
                    <p className="text-sm text-gray-600">Generated on Jan 25, 2024 • PDF • 2.3 MB</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Weekly Cleaning Summary - Week 4</p>
                    <p className="text-sm text-gray-600">Generated on Jan 22, 2024 • Excel • 1.8 MB</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Overtime Analysis - January 1-15</p>
                    <p className="text-sm text-gray-600">Generated on Jan 15, 2024 • PDF • 1.2 MB</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

