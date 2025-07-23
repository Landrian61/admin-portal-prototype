"use client"

import { useState } from "react"
import { Bell, X, CheckCircle, AlertTriangle, Info, Clock, User, Calendar, FileText } from "lucide-react"
import { Button } from "./button"
import { Badge } from "./badge"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  category: "system" | "hr" | "ga" | "admin"
  timestamp: string
  read: boolean
  actionUrl?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Employee Onboarding",
    message: "Alice Johnson has completed her onboarding checklist",
    type: "success",
    category: "hr",
    timestamp: "2024-01-25 10:30 AM",
    read: false,
    actionUrl: "/hr/onboarding"
  },
  {
    id: "2",
    title: "System Maintenance Scheduled",
    message: "Scheduled maintenance window: Tonight 11 PM - 2 AM",
    type: "warning",
    category: "system",
    timestamp: "2024-01-25 09:15 AM",
    read: false,
    actionUrl: "/admin/monitoring"
  },
  {
    id: "3",
    title: "Leave Request Pending",
    message: "Bob Smith has submitted a leave request for review",
    type: "info",
    category: "hr",
    timestamp: "2024-01-25 08:45 AM",
    read: true,
    actionUrl: "/hr/leave"
  },
  {
    id: "4",
    title: "Cleaning Task Overdue",
    message: "Restrooms Floor 2 cleaning task is 2 hours overdue",
    type: "error",
    category: "ga",
    timestamp: "2024-01-25 08:00 AM",
    read: false,
    actionUrl: "/ga/cleaning"
  },
  {
    id: "5",
    title: "Interview Scheduled",
    message: "Interview with Sarah Wilson scheduled for 2:00 PM today",
    type: "info",
    category: "hr",
    timestamp: "2024-01-25 07:30 AM",
    read: true,
    actionUrl: "/hr/interviews"
  }
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle className="w-4 h-4 text-green-600" />
    case "warning":
      return <AlertTriangle className="w-4 h-4 text-yellow-600" />
    case "error":
      return <AlertTriangle className="w-4 h-4 text-red-600" />
    default:
      return <Info className="w-4 h-4 text-blue-600" />
  }
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "hr":
      return <User className="w-4 h-4" />
    case "ga":
      return <Calendar className="w-4 h-4" />
    case "admin":
      return <FileText className="w-4 h-4" />
    default:
      return <Bell className="w-4 h-4" />
  }
}

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    "hr": "bg-blue-100 text-blue-800",
    "ga": "bg-green-100 text-green-800",
    "admin": "bg-purple-100 text-purple-800",
    "system": "bg-gray-100 text-gray-800"
  }
  return colors[category] || "bg-gray-100 text-gray-800"
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">Notifications</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No notifications</p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                    onClick={() => {
                      markAsRead(notification.id)
                      if (notification.actionUrl) {
                        window.location.href = notification.actionUrl
                      }
                      setIsOpen(false)
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`text-sm font-medium ${
                            !notification.read ? "text-gray-900" : "text-gray-700"
                          }`}>
                            {notification.title}
                          </h4>
                          <Badge 
                            className={getCategoryColor(notification.category)} 
                            variant="secondary"
                          >
                            {notification.category}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {notification.timestamp}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notification.id)
                            }}
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t bg-gray-50">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs"
                onClick={() => {
                  // Navigate to full notifications page
                  setIsOpen(false)
                }}
              >
                View all notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

