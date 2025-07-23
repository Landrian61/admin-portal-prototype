"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Clock, TrendingUp, Plus, Eye } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const hiringData = [
  { month: "Jan", applications: 45, hired: 8 },
  { month: "Feb", applications: 52, hired: 12 },
  { month: "Mar", applications: 38, hired: 6 },
  { month: "Apr", applications: 61, hired: 15 },
  { month: "May", applications: 55, hired: 11 },
  { month: "Jun", applications: 67, hired: 18 },
]

const recentActivity = [
  { id: 1, action: "New application received", candidate: "John Smith", position: "Software Engineer", time: "2 hours ago" },
  { id: 2, action: "Interview scheduled", candidate: "Sarah Johnson", position: "Product Manager", time: "4 hours ago" },
  { id: 3, action: "Offer extended", candidate: "Mike Chen", position: "UX Designer", time: "1 day ago" },
  { id: 4, action: "Onboarding completed", candidate: "Lisa Wang", position: "Data Analyst", time: "2 days ago" },
]

const candidateTracking = [
  { stage: "Screening", count: 12, candidates: ["Alice Brown", "Bob Wilson", "Carol Davis"] },
  { stage: "Interviews", count: 8, candidates: ["David Lee", "Emma Taylor", "Frank Miller"] },
  { stage: "Offers", count: 3, candidates: ["Grace Kim", "Henry Zhang", "Ivy Chen"] },
]

export default function HRDashboard() {
  return (
    <MainLayout userRole="hr" title="HR Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Hire Requests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                This week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Leave Requests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Awaiting approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hire Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Application Stats Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Application Stats</CardTitle>
              <CardDescription>Monthly applications and hires</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hiringData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#0b3a50" />
                  <Bar dataKey="hired" fill="#50360B" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Candidate Tracking */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Candidate Tracking</CardTitle>
                <CardDescription>Current hiring pipeline</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Candidate
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidateTracking.map((stage) => (
                  <div key={stage.stage} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">{stage.count}</Badge>
                      <span className="font-medium">{stage.stage}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest hiring process updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">
                      {activity.candidate} - {activity.position}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

