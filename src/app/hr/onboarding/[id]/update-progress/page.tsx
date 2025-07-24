"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, User, CheckCircle } from "lucide-react"
import { format, parseISO } from 'date-fns'
import { onboardingTasks, type Employee, type Task } from "../../page"

export default function UpdateProgressPage({ params }: { params: Promise<{ id: string }> }) {
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
    <MainLayout userRole="hr" title={`Update Progress: ${employee.employeeName}`}>
      <div className="max-w-3xl mx-auto space-y-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Details
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle>{employee.employeeName}</CardTitle>
                  <CardDescription>{employee.position}</CardDescription>
                </div>
              </div>
              <Badge variant="outline">Progress: {employee.progress}%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {employee.tasks.map((task: Task, index: number) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Checkbox 
                    id={`task-${index}`}
                    checked={task.status === "completed"}
                    onCheckedChange={(checked) => {
                      console.log(`Task ${index} checked:`, checked)
                    }}
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={`task-${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {task.name}
                    </label>
                    <p className="text-sm text-gray-500">
                      Due: {format(parseISO(task.dueDate), 'MM/dd/yyyy')}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {task.status}
                  </Badge>
                </div>
              ))}

              <div className="flex justify-end space-x-4 pt-4">
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  console.log("Saving updates...")
                  router.back()
                }}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
