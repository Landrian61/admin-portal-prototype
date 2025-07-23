"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Shield, Server, Activity, AlertTriangle, CheckCircle, Settings, Database } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const systemMetrics = [
  { time: "00:00", cpu: 45, memory: 62, disk: 78 },
  { time: "04:00", cpu: 52, memory: 58, disk: 78 },
  { time: "08:00", cpu: 68, memory: 71, disk: 79 },
  { time: "12:00", cpu: 75, memory: 69, disk: 80 },
  { time: "16:00", cpu: 82, memory: 74, disk: 81 },
  { time: "20:00", cpu: 71, memory: 66, disk: 81 },
]

const userActivity = [
  { hour: "9AM", logins: 12, active: 45 },
  { hour: "10AM", logins: 8, active: 52 },
  { hour: "11AM", logins: 15, active: 58 },
  { hour: "12PM", logins: 6, active: 61 },
  { hour: "1PM", logins: 9, active: 55 },
  { hour: "2PM", logins: 11, active: 59 },
  { hour: "3PM", logins: 7, active: 63 },
  { hour: "4PM", logins: 13, active: 58 },
]

const recentActivities = [
  { id: 1, action: "User created", user: "john.doe@aibos.com", role: "HR", time: "2 minutes ago" },
  { id: 2, action: "Permission updated", user: "jane.smith@aibos.com", role: "GA", time: "15 minutes ago" },
  { id: 3, action: "System backup completed", user: "System", role: "Auto", time: "1 hour ago" },
  { id: 4, action: "Failed login attempt", user: "unknown@external.com", role: "N/A", time: "2 hours ago" },
]

const systemAlerts = [
  { id: 1, type: "warning", message: "High CPU usage detected", severity: "Medium", time: "5 minutes ago" },
  { id: 2, type: "info", message: "Scheduled maintenance in 2 hours", severity: "Low", time: "30 minutes ago" },
]

export default function AdminDashboard() {
  return (
    <MainLayout userRole="admin" title="Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                +12 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">63</div>
              <p className="text-xs text-muted-foreground">
                Currently online
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Server className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">98%</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
              <Shield className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">2</div>
              <p className="text-xs text-muted-foreground">
                Require attention
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Performance */}
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
              <CardDescription>24-hour system metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={systemMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="cpu" stroke="#0b3a50" name="CPU %" />
                  <Line type="monotone" dataKey="memory" stroke="#50360B" name="Memory %" />
                  <Line type="monotone" dataKey="disk" stroke="#10B981" name="Disk %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Activity */}
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Daily login and active user trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={userActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="active" stackId="1" stroke="#0b3a50" fill="#0b3a50" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="logins" stackId="2" stroke="#50360B" fill="#50360B" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest system and user activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-600">
                        {activity.user} • {activity.role}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                System Alerts
              </CardTitle>
              <CardDescription>Important system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-orange-800">{alert.message}</p>
                        <Badge variant={alert.severity === 'High' ? 'destructive' : alert.severity === 'Medium' ? 'secondary' : 'outline'}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-orange-500">{alert.time}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Resolve
                    </Button>
                  </div>
                ))}
                {systemAlerts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <p className="text-sm">No active alerts</p>
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
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="justify-start">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
              <Button variant="outline" className="justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Security Settings
              </Button>
              <Button variant="outline" className="justify-start">
                <Database className="w-4 h-4 mr-2" />
                Backup System
              </Button>
              <Button variant="outline" className="justify-start">
                <Settings className="w-4 h-4 mr-2" />
                System Config
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

