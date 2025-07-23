"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Calendar, Clock, User, MapPin, Video, Phone, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"

const interviews = [
  {
    id: 1,
    candidateName: "Alice Johnson",
    position: "Software Engineer",
    type: "Technical Interview",
    date: "2024-01-25",
    time: "10:00 AM",
    duration: "60 minutes",
    interviewer: "John Smith",
    location: "Conference Room A",
    mode: "In-Person",
    status: "Scheduled",
    notes: "Focus on React and Node.js experience",
    candidateEmail: "alice.johnson@email.com",
    interviewerEmail: "john.smith@aibos.com"
  },
  {
    id: 2,
    candidateName: "Bob Smith",
    position: "Product Manager",
    type: "Behavioral Interview",
    date: "2024-01-25",
    time: "2:00 PM",
    duration: "45 minutes",
    interviewer: "Sarah Wilson",
    location: "Virtual",
    mode: "Video Call",
    status: "Scheduled",
    notes: "Assess leadership and communication skills",
    candidateEmail: "bob.smith@email.com",
    interviewerEmail: "sarah.wilson@aibos.com"
  },
  {
    id: 3,
    candidateName: "Carol Davis",
    position: "UX Designer",
    type: "Portfolio Review",
    date: "2024-01-26",
    time: "11:00 AM",
    duration: "90 minutes",
    interviewer: "Mike Johnson",
    location: "Design Studio",
    mode: "In-Person",
    status: "Completed",
    notes: "Review design portfolio and case studies",
    candidateEmail: "carol.davis@email.com",
    interviewerEmail: "mike.johnson@aibos.com",
    feedback: "Excellent portfolio, strong design thinking"
  },
  {
    id: 4,
    candidateName: "David Wilson",
    position: "Data Analyst",
    type: "Technical Assessment",
    date: "2024-01-24",
    time: "3:00 PM",
    duration: "120 minutes",
    interviewer: "Lisa Chen",
    location: "Virtual",
    mode: "Video Call",
    status: "Completed",
    notes: "SQL and Python coding assessment",
    candidateEmail: "david.wilson@email.com",
    interviewerEmail: "lisa.chen@aibos.com",
    feedback: "Strong technical skills, good problem-solving approach"
  },
  {
    id: 5,
    candidateName: "Emma Brown",
    position: "Marketing Manager",
    type: "Final Interview",
    date: "2024-01-27",
    time: "9:00 AM",
    duration: "60 minutes",
    interviewer: "Tom Anderson",
    location: "Executive Conference Room",
    mode: "In-Person",
    status: "Scheduled",
    notes: "Final interview with department head",
    candidateEmail: "emma.brown@email.com",
    interviewerEmail: "tom.anderson@aibos.com"
  },
  {
    id: 6,
    candidateName: "Frank Miller",
    position: "Sales Representative",
    type: "Phone Screening",
    date: "2024-01-23",
    time: "4:00 PM",
    duration: "30 minutes",
    interviewer: "Jane Davis",
    location: "Phone",
    mode: "Phone Call",
    status: "Cancelled",
    notes: "Initial screening call",
    candidateEmail: "frank.miller@email.com",
    interviewerEmail: "jane.davis@aibos.com"
  }
]

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    "Scheduled": "bg-blue-100 text-blue-800",
    "Completed": "bg-green-100 text-green-800",
    "Cancelled": "bg-red-100 text-red-800",
    "Rescheduled": "bg-yellow-100 text-yellow-800"
  }
  return colors[status] || "bg-gray-100 text-gray-800"
}

const getModeIcon = (mode: string) => {
  switch (mode) {
    case "Video Call":
      return <Video className="w-4 h-4" />
    case "Phone Call":
      return <Phone className="w-4 h-4" />
    default:
      return <MapPin className="w-4 h-4" />
  }
}

export default function InterviewsPage() {
  return (
    <MainLayout userRole="hr" title="Interview Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search interviews..." className="pl-10 w-64" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Calendar View
            </Button>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Interview
          </Button>
        </div>

        {/* Interview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {interviews.map((interview) => (
            <Card key={interview.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{interview.candidateName}</CardTitle>
                    <CardDescription>{interview.position} • {interview.type}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(interview.status)} variant="secondary">
                    {interview.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(interview.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {interview.time} ({interview.duration})
                  </div>
                </div>

                {/* Interviewer & Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    {interview.interviewer}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    {getModeIcon(interview.mode)}
                    <span className="ml-2">{interview.location}</span>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
                  <p className="text-sm text-gray-600">{interview.notes}</p>
                </div>

                {/* Feedback (if completed) */}
                {interview.feedback && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Feedback:</p>
                    <p className="text-sm text-gray-600">{interview.feedback}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  {interview.status === "Scheduled" && (
                    <>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Complete
                      </Button>
                      <Button size="sm" variant="outline">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  {interview.status === "Completed" && (
                    <Button size="sm" variant="outline" className="w-full">
                      View Feedback
                    </Button>
                  )}
                  {interview.status === "Cancelled" && (
                    <Button size="sm" variant="outline" className="w-full">
                      Reschedule
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">Scheduled</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">2</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">1</div>
                <div className="text-sm text-gray-600">Cancelled</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">0</div>
                <div className="text-sm text-gray-600">Rescheduled</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Interviews */}
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Interviews</CardTitle>
            <CardDescription>Interviews scheduled for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {interviews
                .filter(interview => interview.date === "2024-01-25" && interview.status === "Scheduled")
                .map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{interview.candidateName}</p>
                        <p className="text-sm text-gray-600">{interview.type} • {interview.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{interview.interviewer}</p>
                      <p className="text-xs text-gray-500">{interview.location}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

