"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Settings, Save, RefreshCw, Database, Mail, Shield, Globe, Clock, Bell, Users, FileText, Download, Upload } from "lucide-react"

const systemSettings = [
  {
    category: "General",
    icon: Settings,
    settings: [
      { name: "System Name", value: "AIBOS GA-HR Portal", type: "text" },
      { name: "Company Name", value: "AIBOS Corporation", type: "text" },
      { name: "Time Zone", value: "UTC-5 (Eastern Time)", type: "select" },
      { name: "Date Format", value: "MM/DD/YYYY", type: "select" },
      { name: "Language", value: "English (US)", type: "select" }
    ]
  },
  {
    category: "Security",
    icon: Shield,
    settings: [
      { name: "Password Policy", value: "Strong (8+ chars, mixed case, numbers)", type: "select" },
      { name: "Session Timeout", value: "30 minutes", type: "select" },
      { name: "Two-Factor Authentication", value: "Required for Admins", type: "select" },
      { name: "Login Attempts Limit", value: "5 attempts", type: "number" },
      { name: "Account Lockout Duration", value: "15 minutes", type: "select" }
    ]
  },
  {
    category: "Email",
    icon: Mail,
    settings: [
      { name: "SMTP Server", value: "smtp.aibos.com", type: "text" },
      { name: "SMTP Port", value: "587", type: "number" },
      { name: "From Email", value: "noreply@aibos.com", type: "email" },
      { name: "Email Encryption", value: "TLS", type: "select" },
      { name: "Daily Email Limit", value: "1000", type: "number" }
    ]
  },
  {
    category: "Database",
    icon: Database,
    settings: [
      { name: "Backup Frequency", value: "Daily at 2:00 AM", type: "select" },
      { name: "Backup Retention", value: "30 days", type: "select" },
      { name: "Auto Cleanup", value: "Enabled", type: "toggle" },
      { name: "Connection Pool Size", value: "20", type: "number" },
      { name: "Query Timeout", value: "30 seconds", type: "select" }
    ]
  }
]

const integrations = [
  {
    name: "Microsoft Active Directory",
    description: "Single sign-on and user authentication",
    status: "Connected",
    lastSync: "2024-01-25 08:30 AM",
    icon: Users
  },
  {
    name: "Google Workspace",
    description: "Email and calendar integration",
    status: "Connected",
    lastSync: "2024-01-25 09:15 AM",
    icon: Mail
  },
  {
    name: "Slack",
    description: "Notifications and team communication",
    status: "Disconnected",
    lastSync: "2024-01-20 03:45 PM",
    icon: Bell
  },
  {
    name: "Salesforce",
    description: "Customer relationship management",
    status: "Connected",
    lastSync: "2024-01-25 07:20 AM",
    icon: Globe
  }
]

const systemLogs = [
  {
    id: 1,
    timestamp: "2024-01-25 09:30:15",
    level: "INFO",
    component: "Authentication",
    message: "User login successful: john.smith@aibos.com",
    details: "IP: 192.168.1.100"
  },
  {
    id: 2,
    timestamp: "2024-01-25 09:25:33",
    level: "WARNING",
    component: "Database",
    message: "High connection pool usage detected",
    details: "Current: 18/20 connections"
  },
  {
    id: 3,
    timestamp: "2024-01-25 09:20:45",
    level: "ERROR",
    component: "Email Service",
    message: "Failed to send notification email",
    details: "SMTP timeout after 30 seconds"
  },
  {
    id: 4,
    timestamp: "2024-01-25 09:15:22",
    level: "INFO",
    component: "Backup Service",
    message: "Daily backup completed successfully",
    details: "Size: 2.3 GB, Duration: 15 minutes"
  }
]

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    "Connected": "bg-green-100 text-green-800",
    "Disconnected": "bg-red-100 text-red-800",
    "Syncing": "bg-yellow-100 text-yellow-800"
  }
  return colors[status] || "bg-gray-100 text-gray-800"
}

const getLogLevelColor = (level: string) => {
  const colors: { [key: string]: string } = {
    "INFO": "bg-blue-100 text-blue-800",
    "WARNING": "bg-yellow-100 text-yellow-800",
    "ERROR": "bg-red-100 text-red-800",
    "DEBUG": "bg-gray-100 text-gray-800"
  }
  return colors[level] || "bg-gray-100 text-gray-800"
}

export default function SystemSettingsPage() {
  return (
    <MainLayout userRole="admin" title="System Settings">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Config
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import Config
            </Button>
          </div>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>

        {/* System Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {systemSettings.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <category.icon className="w-5 h-5" />
                  <CardTitle>{category.category} Settings</CardTitle>
                </div>
                <CardDescription>Configure {category.category.toLowerCase()} system parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.settings.map((setting, settingIndex) => (
                    <div key={settingIndex} className="flex items-center justify-between">
                      <div className="flex-1">
                        <label className="text-sm font-medium text-gray-700">
                          {setting.name}
                        </label>
                      </div>
                      <div className="flex-1 ml-4">
                        {setting.type === "toggle" ? (
                          <Button 
                            size="sm" 
                            variant={setting.value === "Enabled" ? "default" : "outline"}
                            className="w-20"
                          >
                            {setting.value}
                          </Button>
                        ) : (
                          <Input 
                            type={setting.type === "number" ? "number" : "text"}
                            value={setting.value} 
                            className="text-sm"
                            readOnly
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Integrations */}
        <Card>
          <CardHeader>
            <CardTitle>System Integrations</CardTitle>
            <CardDescription>Manage external service integrations and connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((integration, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <integration.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Last sync: {integration.lastSync}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(integration.status)} variant="secondary">
                        {integration.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        {integration.status === "Connected" ? "Configure" : "Connect"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-gray-600">System Uptime</div>
                </div>
                <Clock className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">2.3GB</div>
                  <div className="text-sm text-gray-600">Database Size</div>
                </div>
                <Database className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-yellow-600">847</div>
                  <div className="text-sm text-gray-600">Daily Emails</div>
                </div>
                <Mail className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-600">4</div>
                  <div className="text-sm text-gray-600">Active Integrations</div>
                </div>
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent System Logs</CardTitle>
            <CardDescription>Monitor system events and troubleshoot issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemLogs.map((log) => (
                <div key={log.id} className="flex items-start justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <Badge className={getLogLevelColor(log.level)} variant="secondary">
                      {log.level}
                    </Badge>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-sm">{log.component}</p>
                        <span className="text-xs text-gray-500">{log.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700">{log.message}</p>
                      <p className="text-xs text-gray-500">{log.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                View Full Logs
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Actions */}
        <Card>
          <CardHeader>
            <CardTitle>System Maintenance</CardTitle>
            <CardDescription>Perform system maintenance and administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="justify-start">
                <Database className="w-4 h-4 mr-2" />
                Backup Database
              </Button>
              <Button variant="outline" className="justify-start">
                <RefreshCw className="w-4 h-4 mr-2" />
                Clear Cache
              </Button>
              <Button variant="outline" className="justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="justify-start">
                <Settings className="w-4 h-4 mr-2" />
                System Diagnostics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

