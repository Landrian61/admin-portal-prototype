"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, MoreHorizontal, Calendar, User, Mail, Phone } from "lucide-react"

const candidates = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 (555) 123-4567",
    position: "Software Engineer",
    stage: "Application Received",
    appliedDate: "2024-01-15",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@email.com",
    phone: "+1 (555) 234-5678",
    position: "Product Manager",
    stage: "Screening",
    appliedDate: "2024-01-14",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@email.com",
    phone: "+1 (555) 345-6789",
    position: "UX Designer",
    stage: "Phone Interview",
    appliedDate: "2024-01-12",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1 (555) 456-7890",
    position: "Data Analyst",
    stage: "In-Person Interview",
    appliedDate: "2024-01-10",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma.brown@email.com",
    phone: "+1 (555) 567-8901",
    position: "Marketing Manager",
    stage: "Final Review",
    appliedDate: "2024-01-08",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank.miller@email.com",
    phone: "+1 (555) 678-9012",
    position: "Sales Representative",
    stage: "Offer Extended",
    appliedDate: "2024-01-05",
    avatar: "/api/placeholder/40/40"
  }
]

const stages = [
  "Application Received",
  "Screening", 
  "Phone Interview",
  "In-Person Interview",
  "Final Review",
  "Offer Extended"
]

const getStageColor = (stage: string) => {
  const colors: { [key: string]: string } = {
    "Application Received": "bg-gray-100 text-gray-800",
    "Screening": "bg-blue-100 text-blue-800",
    "Phone Interview": "bg-yellow-100 text-yellow-800",
    "In-Person Interview": "bg-orange-100 text-orange-800",
    "Final Review": "bg-purple-100 text-purple-800",
    "Offer Extended": "bg-green-100 text-green-800"
  }
  return colors[stage] || "bg-gray-100 text-gray-800"
}

export default function HiringProcess() {
  return (
    <MainLayout userRole="hr" title="Hiring Process Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search candidates..." className="pl-10 w-64" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Candidate
          </Button>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-6 overflow-x-auto">
          {stages.map((stage) => {
            const stageCandidates = candidates.filter(c => c.stage === stage)
            
            return (
              <div key={stage} className="min-w-[300px]">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">{stage}</CardTitle>
                      <Badge variant="secondary">{stageCandidates.length}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {stageCandidates.map((candidate) => (
                      <Card key={candidate.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{candidate.name}</h4>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <p className="text-xs text-gray-600">{candidate.position}</p>
                          
                          <div className="space-y-1">
                            <div className="flex items-center text-xs text-gray-500">
                              <Mail className="w-3 h-3 mr-1" />
                              {candidate.email}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Phone className="w-3 h-3 mr-1" />
                              {candidate.phone}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              Applied: {new Date(candidate.appliedDate).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-2">
                            <Badge className={getStageColor(candidate.stage)} variant="secondary">
                              {candidate.stage}
                            </Badge>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                    
                    {stageCandidates.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No candidates</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common hiring process actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
              <Button variant="outline" className="justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" className="justify-start">
                <User className="w-4 h-4 mr-2" />
                Create Job Posting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

