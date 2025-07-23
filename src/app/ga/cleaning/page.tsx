"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, User, Clock, MapPin, CheckCircle, AlertTriangle, Calendar, Edit, Trash2, Play, Pause } from "lucide-react"

const cleaningTasks = [
  {
    id: 1,
    taskName: "Office Floor 1 - General Cleaning",
    assignedTo: "John Doe",
    area: "Office Floor 1",
    priority: "Medium",
    status: "Completed",
    scheduledTime: "08:00 AM",
    completedTime: "09:30 AM",
    date: "2024-01-25",
    duration: "1h 30m",
    notes: "All areas cleaned thoroughly, restocked supplies",
    checklist: [
      { item: "Vacuum carpets", completed: true },
      { item: "Empty trash bins", completed: true },
      { item: "Clean windows", completed: true },
      { item: "Sanitize surfaces", completed: true },
      { item: "Restock supplies", completed: true }
    ]
  },
  {
    id: 2,
    taskName: "Conference Room A - Deep Clean",
    assignedTo: "Jane Smith",
    area: "Conference Room A",
    priority: "High",
    status: "In Progress",
    scheduledTime: "10:30 AM",
    completedTime: null,
    date: "2024-01-25",
    duration: "In Progress",
    notes: "Deep cleaning in progress, focus on presentation equipment",
    checklist: [
      { item: "Clean tables and chairs", completed: true },
      { item: "Clean whiteboard", completed: true },
      { item: "Dust electronics", completed: false },
      { item: "Vacuum floor", completed: false },
      { item: "Sanitize surfaces", completed: false }
    ]
  },
  {
    id: 3,
    taskName: "Reception Area - Daily Maintenance",
    assignedTo: "Mike Johnson",
    area: "Reception Area",
    priority: "High",
    status: "Pending",
    scheduledTime: "02:00 PM",
    completedTime: null,
    date: "2024-01-25",
    duration: "Estimated 45m",
    notes: "High traffic area, requires frequent attention",
    checklist: [
      { item: "Clean reception desk", completed: false },
      { item: "Vacuum seating area", completed: false },
      { item: "Clean glass doors", completed: false },
      { item: "Empty trash", completed: false },
      { item: "Water plants", completed: false }
    ]
  },
  {
    id: 4,
    taskName: "Kitchen & Break Room",
    assignedTo: "Sarah Wilson",
    area: "Kitchen",
    priority: "Medium",
    status: "Completed",
    scheduledTime: "11:00 AM",
    completedTime: "12:15 PM",
    date: "2024-01-25",
    duration: "1h 15m",
    notes: "Deep cleaned appliances, restocked kitchen supplies",
    checklist: [
      { item: "Clean microwave", completed: true },
      { item: "Wipe counters", completed: true },
      { item: "Clean refrigerator", completed: true },
      { item: "Restock supplies", completed: true },
      { item: "Empty dishwasher", completed: true }
    ]
  },
  {
    id: 5,
    taskName: "Restrooms - Floor 2",
    assignedTo: "Tom Anderson",
    area: "Restrooms Floor 2",
    priority: "High",
    status: "Overdue",
    scheduledTime: "01:00 PM",
    completedTime: null,
    date: "2024-01-25",
    duration: "Overdue by 2h",
    notes: "Urgent attention required",
    checklist: [
      { item: "Clean toilets", completed: false },
      { item: "Restock paper products", completed: false },
      { item: "Mop floors", completed: false },
      { item: "Clean mirrors", completed: false },
      { item: "Sanitize surfaces", completed: false }
    ]
  }
]

const cleaningAreas = [
  { name: "Office Floor 1", tasksToday: 3, completed: 2, pending: 1 },
  { name: "Office Floor 2", tasksToday: 4, completed: 3, pending: 1 },
  { name: "Conference Rooms", tasksToday: 2, completed: 1, pending: 1 },
  { name: "Common Areas", tasksToday: 3, completed: 2, pending: 1 },
  { name: "Restrooms", tasksToday: 2, completed: 0, pending: 2 },
  { name: "Kitchen", tasksToday: 1, completed: 1, pending: 0 }
]

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    "Completed": "bg-green-100 text-green-800",
    "In Progress": "bg-blue-100 text-blue-800",
    "Pending": "bg-yellow-100 text-yellow-800",
    "Overdue": "bg-red-100 text-red-800"
  }
  return colors[status] || "bg-gray-100 text-gray-800"
}

const getPriorityColor = (priority: string) => {
  const colors: { [key: string]: string } = {
    "High": "bg-red-100 text-red-800",
    "Medium": "bg-yellow-100 text-yellow-800",
    "Low": "bg-green-100 text-green-800"
  }
  return colors[priority] || "bg-gray-100 text-gray-800"
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle className="w-4 h-4 text-green-600" />
    case "In Progress":
      return <Play className="w-4 h-4 text-blue-600" />
    case "Pending":
      return <Clock className="w-4 h-4 text-yellow-600" />
    case "Overdue":
      return <AlertTriangle className="w-4 h-4 text-red-600" />
    default:
      return <Clock className="w-4 h-4 text-gray-400" />
  }
}

export default function CleaningManagementPage() {
  return (
    <MainLayout userRole="ga" title="Cleaning Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search tasks..." className="pl-10 w-64" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule View
            </Button>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>

        {/* Today's Cleaning Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Cleaning Tasks - January 25, 2024</CardTitle>
            <CardDescription>Scheduled cleaning tasks and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cleaningTasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(task.status)}
                        <h4 className="font-medium">{task.taskName}</h4>
                        <Badge className={getStatusColor(task.status)} variant="secondary">
                          {task.status}
                        </Badge>
                        <Badge className={getPriorityColor(task.priority)} variant="secondary">
                          {task.priority}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="w-4 h-4 mr-2" />
                          {task.assignedTo}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {task.area}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          Scheduled: {task.scheduledTime}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          Duration: {task.duration}
                        </div>
                      </div>
                      
                      {task.completedTime && (
                        <div className="text-sm text-green-600 mb-2">
                          <strong>Completed at:</strong> {task.completedTime}
                        </div>
                      )}
                      
                      <p className="text-sm text-gray-700 mb-3">
                        <strong>Notes:</strong> {task.notes}
                      </p>
                      
                      {/* Checklist Progress */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm text-gray-600">
                            {task.checklist.filter(item => item.completed).length}/{task.checklist.length} completed
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ 
                              width: `${(task.checklist.filter(item => item.completed).length / task.checklist.length) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
                          {task.checklist.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className={`w-3 h-3 ${item.completed ? 'text-green-600' : 'text-gray-300'}`} />
                              <span className={item.completed ? 'line-through text-gray-500' : ''}>
                                {item.item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      {task.status === "Pending" && (
                        <Button size="sm" variant="outline" className="text-blue-600 hover:text-blue-700">
                          <Play className="w-4 h-4 mr-1" />
                          Start
                        </Button>
                      )}
                      {task.status === "In Progress" && (
                        <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Complete
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Area Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Cleaning Areas Overview</CardTitle>
            <CardDescription>Task completion status by area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cleaningAreas.map((area, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">{area.name}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Tasks:</span>
                      <span className="font-medium">{area.tasksToday}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Completed:</span>
                      <span className="font-medium text-green-600">{area.completed}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pending:</span>
                      <span className="font-medium text-yellow-600">{area.pending}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(area.completed / area.tasksToday) * 100}%` }}
                      ></div>
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
                <div className="text-2xl font-bold text-green-600">4</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </CardContent>
          </Card>
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
                <div className="text-2xl font-bold text-yellow-600">1</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">1</div>
                <div className="text-sm text-gray-600">Overdue</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">80%</div>
                <div className="text-sm text-gray-600">Completion Rate</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cleaning Staff Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Staff Performance Today</CardTitle>
            <CardDescription>Individual cleaning staff performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-gray-600">1 task completed • 1h 30m total</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  Excellent
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Jane Smith</p>
                    <p className="text-sm text-gray-600">1 task in progress • Conference Room A</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  Active
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-red-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Tom Anderson</p>
                    <p className="text-sm text-gray-600">1 task overdue • Restrooms Floor 2</p>
                  </div>
                </div>
                <Badge className="bg-red-100 text-red-800">
                  Needs Attention
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

