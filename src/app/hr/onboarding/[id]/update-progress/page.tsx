"use client"

import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ArrowLeft,
  User,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  MessageSquare,
  Filter,
  Search,
  Download,
  Plus,
  Edit3,
  FileText,
  Target,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react"
import { format, parseISO, isAfter, isBefore, addDays } from "date-fns"
import { onboardingTasks, type Employee, type Task } from "../../page"

export default function UpdateProgressPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedTasks, setSelectedTasks] = useState<number[]>([])
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTask, setNewTask] = useState({ name: "", dueDate: "", priority: "medium" })
  const [taskComments, setTaskComments] = useState<Record<number, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const foundEmployee = (onboardingTasks as Employee[]).find((e) => e.id === Number.parseInt(id))
    if (foundEmployee) {
      setEmployee(foundEmployee)
      setTasks(foundEmployee.tasks)
    }
  }, [id])

  if (!employee) {
    return (
      <MainLayout userRole="hr" title="Employee Not Found">
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Employee not found</h2>
          <p className="text-gray-600 mb-6">The employee you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.back()} size="lg">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </MainLayout>
    )
  }

  const completedTasks = tasks.filter((task) => task.status === "completed").length
  const totalTasks = tasks.length
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const overdueTasks = tasks.filter(
    (task) => task.status !== "completed" && isAfter(new Date(), parseISO(task.dueDate)),
  ).length

  const upcomingTasks = tasks.filter(
    (task) =>
      task.status !== "completed" &&
      isBefore(new Date(), parseISO(task.dueDate)) &&
      isBefore(parseISO(task.dueDate), addDays(new Date(), 7)),
  ).length

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || task.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleTaskToggle = (taskIndex: number, checked: boolean) => {
    const updatedTasks = tasks.map((task, index) =>
      index === taskIndex
        ? { ...task, status: checked ? "completed" as "completed" : "pending" as "pending" }
        : task,
    )
    setTasks(updatedTasks)

    if (checked) {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    }
  }

  const handleBulkAction = (action: string) => {
    const updatedTasks = tasks.map((task, index) =>
      selectedTasks.includes(index) ? { ...task, status: action as "completed" | "pending" | "in-progress" } : task,
    )
    setTasks(updatedTasks)
    setSelectedTasks([])
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.back()
  }

  const getTaskIcon = (task: Task) => {
    if (task.status === "completed") return <CheckCircle className="w-4 h-4 text-green-500" />
    if (isAfter(new Date(), parseISO(task.dueDate))) return <AlertTriangle className="w-4 h-4 text-red-500" />
    return <Clock className="w-4 h-4 text-blue-500" />
  }

  const getTaskPriority = (dueDate: string) => {
    const days = Math.ceil((parseISO(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    if (days < 0) return "overdue"
    if (days <= 3) return "high"
    if (days <= 7) return "medium"
    return "low"
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "overdue":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <MainLayout userRole="hr" title={`Update Progress: ${employee.employeeName}`}>
      <TooltipProvider>
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Details
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription>Create a new onboarding task for this employee.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Task name"
                      value={newTask.name}
                      onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                    />
                    <Input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                    <Select
                      value={newTask.priority}
                      onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="high">High Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddTask(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        if (newTask.name && newTask.dueDate) {
                          setTasks([
                            ...tasks,
                            {
                              name: newTask.name,
                              dueDate: newTask.dueDate,
                              status: "pending" as const,
                            },
                          ])
                          setNewTask({ name: "", dueDate: "", priority: "medium" })
                          setShowAddTask(false)
                        }
                      }}
                    >
                      Add Task
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Success Animation */}
          {showSuccess && (
            <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-full">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="flex items-center space-x-2 p-4">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-700 font-medium">Task completed! 🎉</span>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Employee Overview */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{employee.employeeName}</CardTitle>
                    <CardDescription className="text-lg">{employee.position}</CardDescription>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        <Target className="w-3 h-3 mr-1" />
                        {completedTasks}/{totalTasks} Tasks
                      </Badge>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {progressPercentage}% Complete
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">{progressPercentage}%</div>
                  <div className="text-sm text-gray-500">Progress</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>
                      {completedTasks} of {totalTasks} completed
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-red-50 border-red-200">
                    <CardContent className="p-4 text-center">
                      <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-red-600">{overdueTasks}</div>
                      <div className="text-sm text-red-700">Overdue Tasks</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-yellow-50 border-yellow-200">
                    <CardContent className="p-4 text-center">
                      <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-yellow-600">{upcomingTasks}</div>
                      <div className="text-sm text-yellow-700">Due This Week</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4 text-center">
                      <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                      <div className="text-sm text-green-700">Completed</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Onboarding Tasks</span>
                </CardTitle>
                {selectedTasks.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{selectedTasks.length} selected</span>
                    <Select onValueChange={handleBulkAction}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Bulk Actions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completed">Mark Complete</SelectItem>
                        <SelectItem value="pending">Mark Pending</SelectItem>
                        <SelectItem value="in-progress">Mark In Progress</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Filters and Search */}
              <div className="flex items-center space-x-4 mt-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tasks</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="list" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline View</TabsTrigger>
                </TabsList>

                <TabsContent value="list" className="space-y-4 mt-6">
                  {filteredTasks.map((task: Task, index: number) => {
                    const originalIndex = tasks.findIndex((t) => t === task)
                    const priority = getTaskPriority(task.dueDate)
                    const isOverdue = isAfter(new Date(), parseISO(task.dueDate)) && task.status !== "completed"

                    return (
                      <div
                        key={originalIndex}
                        className={`group relative p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                          task.status === "completed"
                            ? "bg-green-50 border-green-200"
                            : isOverdue
                              ? "bg-red-50 border-red-200"
                              : "bg-white border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id={`task-${originalIndex}`}
                              checked={selectedTasks.includes(originalIndex)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedTasks([...selectedTasks, originalIndex])
                                } else {
                                  setSelectedTasks(selectedTasks.filter((i) => i !== originalIndex))
                                }
                              }}
                            />
                            <Checkbox
                              id={`complete-${originalIndex}`}
                              checked={task.status === "completed"}
                              onCheckedChange={(checked) => handleTaskToggle(originalIndex, !!checked)}
                              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                            />
                          </div>

                          <div className={`w-1 h-8 rounded-full ${getPriorityColor(priority)}`} />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              {getTaskIcon(task)}
                              <label
                                htmlFor={`complete-${originalIndex}`}
                                className={`text-sm font-medium cursor-pointer ${
                                  task.status === "completed" ? "line-through text-gray-500" : ""
                                }`}
                              >
                                {task.name}
                              </label>
                            </div>
                            <div className="flex items-center space-x-4 mt-1">
                              <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <Calendar className="w-3 h-3" />
                                <span>Due: {format(parseISO(task.dueDate), "MMM dd, yyyy")}</span>
                              </div>
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  task.status === "completed"
                                    ? "bg-green-100 text-green-700 border-green-300"
                                    : isOverdue
                                      ? "bg-red-100 text-red-700 border-red-300"
                                      : "bg-blue-100 text-blue-700 border-blue-300"
                                }`}
                              >
                                {task.status === "completed" ? "Completed" : isOverdue ? "Overdue" : "Pending"}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MessageSquare className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Add Comment</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Edit3 className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit Task</TooltipContent>
                            </Tooltip>
                          </div>
                        </div>

                        {taskComments[originalIndex] && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-md">
                            <div className="flex items-start space-x-2">
                              <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                              <div className="text-sm text-gray-600">{taskComments[originalIndex]}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </TabsContent>

                <TabsContent value="timeline" className="mt-6">
                  <div className="space-y-6">
                    {filteredTasks
                      .sort((a, b) => parseISO(a.dueDate).getTime() - parseISO(b.dueDate).getTime())
                      .map((task, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-4 h-4 rounded-full ${
                                task.status === "completed" ? "bg-green-500" : "bg-gray-300"
                              }`}
                            />
                            {index < filteredTasks.length - 1 && <div className="w-0.5 h-12 bg-gray-200 mt-2" />}
                          </div>
                          <div className="flex-1 pb-8">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{task.name}</h4>
                              <span className="text-sm text-gray-500">{format(parseISO(task.dueDate), "MMM dd")}</span>
                            </div>
                            <Badge variant="outline" className="mt-1">
                              {task.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </TooltipProvider>
    </MainLayout>
  )
}
