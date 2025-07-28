"use client"

import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User, Download } from "lucide-react"
import { type LeaveRequest, initialLeaveRequests } from "@/data/leave-requests"
import { use } from "react"

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    "Pending": "bg-yellow-100 text-yellow-800",
    "Approved": "bg-green-100 text-green-800",
    "Rejected": "bg-red-100 text-red-800"
  }
  return colors[status] || "bg-gray-100 text-gray-800"
}

export default function LeaveDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const leaveRequest = initialLeaveRequests.find((r: LeaveRequest) => r.id === Number(id))

  if (!leaveRequest) {
    return (
      <MainLayout userRole="hr" title="Leave Request Not Found">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Leave request not found</h2>
          <Button onClick={() => router.back()} size="lg">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout userRole="hr" title={`Leave Request - ${leaveRequest.employeeName}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Leave Management
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Details
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>{leaveRequest.employeeName}</CardTitle>
                <CardDescription>{leaveRequest.department}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="text-base">
                  {leaveRequest.leaveType}
                </Badge>
                <Badge variant="outline" className={getStatusColor(leaveRequest.status)}>
                  {leaveRequest.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Date Range</div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(leaveRequest.startDate).toLocaleDateString()} - {new Date(leaveRequest.endDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {leaveRequest.days} days
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-500">Reason for Leave</div>
                <div className="p-4 bg-gray-50 rounded-lg">{leaveRequest.reason}</div>
              </div>

              {leaveRequest.rejectionReason && (
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Rejection Reason</div>
                  <div className="p-4 bg-red-50 rounded-lg text-red-700">{leaveRequest.rejectionReason}</div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-sm text-gray-500">Applied On</div>
                  <div>{new Date(leaveRequest.appliedDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Approver</div>
                  <div>{leaveRequest.approver}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
