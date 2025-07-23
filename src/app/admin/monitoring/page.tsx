"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw, AlertTriangle, CheckCircle, Activity, Server, Database, Wifi, HardDrive, Cpu, MemoryStick, Clock, TrendingUp, TrendingDown } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts"

const systemMetrics = [
  {
    name: "CPU Usage",
    value: 45,
    unit: "%",
    status: "Normal",
    trend: "stable",
    icon: Cpu,
    color: "text-blue-600"
  },
  {
    name: "Memory Usage",
    value: 68,
    unit: "%",
    status: "Warning",
    trend: "up",
    icon: MemoryStick,
    color: "text-yellow-600"
  },
  {
    name: "Disk Usage",
    value: 32,
    unit: "%",
    status: "Normal",
    trend: "stable",
    icon: HardDrive,
    color: "text-green-600"
  },
  {
    name: "Network I/O",
    value: 156,
    unit: "MB/s",
    status: "Normal",
    trend: "down",
    icon: Wifi,
    color: "text-purple-600"
  }
]

const performanceData = [
  { time: "00:00", cpu: 35, memory: 60, disk: 30, network: 120 },
  { time: "04:00", cpu: 28, memory: 55, disk: 28, network: 95 },
  { time: "08:00", cpu: 52, memory: 72, disk: 35, network: 180 },
  { time: "12:00", cpu: 45, memory: 68, disk: 32, network: 156 },
  { time: "16:00", cpu: 58, memory: 75, disk: 38, network: 210 },
  { time: "20:00", cpu: 42, memory: 65, disk: 30, network: 145 },
]

const responseTimeData = [
  { endpoint: "/api/auth", avgTime: 120, requests: 1250 },
  { endpoint: "/api/users", avgTime: 85, requests: 890 },
  { endpoint: "/api/hr/employees", avgTime: 95, requests: 650 },
  { endpoint: "/api/ga/schedules", avgTime: 110, requests: 420 },
  { endpoint: "/api/admin/logs", avgTime: 200, requests: 180 },
]

const systemAlerts = [
  {
    id: 1,
    severity: "High",
    component: "Database",
    message: "High connection pool usage detected",
    timestamp: "2024-01-25 09:25:33",
    status: "Active",
    details: "Current: 18/20 connections in use"
  },
  {
    id: 2,
    severity: "Medium",
    component: "Email Service",
    message: "SMTP response time degraded",
    timestamp: "2024-01-25 08:45:22",
    status: "Investigating",
    details: "Average response time: 8.5s (normal: 2s)"
  },
  {
    id: 3,
    severity: "Low",
    component: "File Storage",
    message: "Disk space usage above 80%",
    timestamp: "2024-01-25 07:30:15",
    status: "Acknowledged",
    details: "Current usage: 82% of 500GB"
  },
  {
    id: 4,
    severity: "High",
    component: "Authentication",
    message: "Multiple failed login attempts detected",
    timestamp: "2024-01-25 06:15:45",
    status: "Resolved",
    details: "IP 203.0.113.45 blocked for 24 hours"
  }
]

const serviceStatus = [
  { name: "Web Server", status: "Healthy", uptime: "99.9%", lastCheck: "2024-01-25 09:30:00" },
  { name: "Database", status: "Warning", uptime: "99.5%", lastCheck: "2024-01-25 09:29:45" },
  { name: "Email Service", status: "Healthy", uptime: "98.8%", lastCheck: "2024-01-25 09:30:15" },
  { name: "File Storage", status: "Healthy", uptime: "99.7%", lastCheck: "2024-01-25 09:29:30" },
  { name: "Authentication", status: "Healthy", uptime: "99.9%", lastCheck: "2024-01-25 09:30:10" },
  { name: "Backup Service", status: "Healthy", uptime: "99.2%", lastCheck: "2024-01-25 09:28:55" }
]

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    "Normal": "bg-green-100 text-green-800",
    "Warning": "bg-yellow-100 text-yellow-800",
    "Critical": "bg-red-100 text-red-800",
    "Healthy": "bg-green-100 text-green-800",
    "Degraded": "bg-yellow-100 text-yellow-800",
    "Down": "bg-red-100 text-red-800"
  }
  return colors[status] || "bg-gray-100 text-gray-800"
}

const getSeverityColor = (severity: string) => {
  const colors: { [key: string]: string } = {
    "Low": "bg-blue-100 text-blue-800",
    "Medium": "bg-yellow-100 text-yellow-800",
    "High": "bg-red-100 text-red-800",
    "Critical": "bg-red-100 text-red-800"
  }
  return colors[severity] || "bg-gray-100 text-gray-800"
}

const getAlertStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    "Active": "bg-red-100 text-red-800",
    "Investigating": "bg-yellow-100 text-yellow-800",
    "Acknowledged": "bg-blue-100 text-blue-800",
    "Resolved": "bg-green-100 text-green-800"
  }
  return colors[status] || "bg-gray-100 text-gray-800"
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="w-4 h-4 text-red-500" />
    case "down":
      return <TrendingDown className="w-4 h-4 text-green-500" />
    default:
      return <Activity className="w-4 h-4 text-gray-500" />
  }
}

export default function SystemMonitoringPage() {
  return (
    <MainLayout userRole="admin" title="System Monitoring">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline">
              <AlertTriangle className="w-4 h-4 mr-2" />
              View Alerts
            </Button>
            <Button variant="outline">
              <Activity className="w-4 h-4 mr-2" />
              Real-time Monitor
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {systemMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className={`text-2xl font-bold ${metric.color}`}>
                        {metric.value}{metric.unit}
                      </div>
                      {getTrendIcon(metric.trend)}
                    </div>
                    <div className="text-sm text-gray-600">{metric.name}</div>
                    <Badge className={getStatusColor(metric.status)} variant="secondary">
                      {metric.status}
                    </Badge>
                  </div>
                  <metric.icon className={`w-8 h-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Performance */}
          <Card>
            <CardHeader>
              <CardTitle>System Performance (24h)</CardTitle>
              <CardDescription>CPU, Memory, Disk, and Network usage over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="cpu" stroke="#3B82F6" name="CPU %" />
                  <Line type="monotone" dataKey="memory" stroke="#F59E0B" name="Memory %" />
                  <Line type="monotone" dataKey="disk" stroke="#10B981" name="Disk %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* API Response Times */}
          <Card>
            <CardHeader>
              <CardTitle>API Response Times</CardTitle>
              <CardDescription>Average response times by endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="endpoint" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgTime" fill="#0b3a50" name="Avg Time (ms)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Service Status */}
        <Card>
          <CardHeader>
            <CardTitle>Service Status</CardTitle>
            <CardDescription>Current status of all system services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {serviceStatus.map((service, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Server className="w-5 h-5 text-gray-600" />
                      <h4 className="font-medium">{service.name}</h4>
                    </div>
                    <Badge className={getStatusColor(service.status)} variant="secondary">
                      {service.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Uptime:</span>
                      <span className="font-medium">{service.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Check:</span>
                      <span className="font-medium">{service.lastCheck}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Recent system alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <AlertTriangle className="w-5 h-5 text-gray-600" />
                        <h4 className="font-medium">{alert.message}</h4>
                        <Badge className={getSeverityColor(alert.severity)} variant="secondary">
                          {alert.severity}
                        </Badge>
                        <Badge className={getAlertStatusColor(alert.status)} variant="secondary">
                          {alert.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Component:</strong> {alert.component} • 
                        <strong> Time:</strong> {alert.timestamp}
                      </div>
                      <p className="text-sm text-gray-700">{alert.details}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      {alert.status === "Active" && (
                        <Button size="sm" variant="outline">
                          Acknowledge
                        </Button>
                      )}
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

        {/* Network Traffic */}
        <Card>
          <CardHeader>
            <CardTitle>Network Traffic (24h)</CardTitle>
            <CardDescription>Inbound and outbound network traffic patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="network" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common monitoring and maintenance tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="justify-start">
                <RefreshCw className="w-4 h-4 mr-2" />
                Restart Services
              </Button>
              <Button variant="outline" className="justify-start">
                <Database className="w-4 h-4 mr-2" />
                Check Database
              </Button>
              <Button variant="outline" className="justify-start">
                <Activity className="w-4 h-4 mr-2" />
                Performance Report
              </Button>
              <Button variant="outline" className="justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Schedule Maintenance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

