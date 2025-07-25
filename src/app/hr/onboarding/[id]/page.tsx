"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Phone, Calendar, User, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { format, parseISO } from 'date-fns'

// Import the onboarding tasks data
import { onboardingTasks } from "../page"

interface Task {
  name: string
  status: "completed" | "in-progress" | "pending"
  dueDate: string
}

interface Employee {
  id: number
  employeeName: string
  position: string
  email: string
  phone: string
  startDate: string
  status: string
  progress: number
  tasks: Task[]
}

interface OnboardingDetailsPageProps {
  params: Promise<{ id: string }>
}

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    "completed": "bg-green-100 text-green-800",
    "in-progress": "bg-blue-100 text-blue-800",
    "pending": "bg-yellow-100 text-yellow-800"
  }
  return colors[status] || "bg-gray-100 text-gray-800"
}

const formatDate = (dateString: string) => {
  try {
    return format(parseISO(dateString), 'MM/dd/yyyy')
  } catch (e) {
    return dateString
  }
}

export default function OnboardingDetailsPage({ params }: OnboardingDetailsPageProps) {
  const router = useRouter()
  const { id } = use(params)
  const employee = (onboardingTasks as Employee[]).find(e => e.id === parseInt(id))

  if (!employee) {
    return (
      <MainLayout userRole="hr" title="Employee Not Found">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Employee not found</h2>
          <Button onClick={() => router.back()} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout userRole="hr" title={`Onboarding Details: ${employee.employeeName}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Onboarding
        </Button>

        {/* Employee Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">{employee.employeeName}</CardTitle>
                <CardDescription>{employee.position}</CardDescription>
              </div>
              <Badge className={getStatusColor(employee.status)} variant="secondary">
                {employee.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {employee.email}
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {employee.phone}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Start Date: {formatDate(employee.startDate)}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Progress: {employee.progress}%
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${employee.progress}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Task List */}
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Tasks</CardTitle>
            <CardDescription>Detailed list of all onboarding tasks and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employee.tasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="mt-1">
                    {task.status === "completed" && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {task.status === "in-progress" && <Clock className="w-5 h-5 text-blue-600" />}
                    {task.status === "pending" && <AlertTriangle className="w-5 h-5 text-gray-400" />}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${task.status === "completed" ? "line-through text-gray-500" : ""}`}>
                      {task.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Due: {formatDate(task.dueDate)}
                    </p>
                  </div>
                  <Badge className={getStatusColor(task.status)} variant="secondary">
                    {task.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

