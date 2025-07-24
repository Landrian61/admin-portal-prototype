"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, User, GraduationCap, Briefcase } from "lucide-react"
import { candidates } from "@/data/candidates" // We'll move data to a separate file

interface CandidateDetailsPageProps {
  params: Promise<{
    id: string
  }>
}

export default function CandidateDetailsPage({ params }: CandidateDetailsPageProps) {
  const router = useRouter()
  const { id } = use(params)
  const candidate = candidates.find(c => c.id === parseInt(id))

  if (!candidate) {
    return (
      <MainLayout userRole="hr" title="Candidate Not Found">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Candidate not found</h2>
          <Button onClick={() => router.back()} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout userRole="hr" title={`Candidate: ${candidate.name}`}>
      <div className="space-y-6">
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Candidates
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{candidate.name}</CardTitle>
                  <p className="text-gray-600">{candidate.position}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {candidate.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {candidate.phone}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {candidate.location}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {candidate.experience} experience
                  </div>
                  <div className="flex items-center text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    {candidate.education}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Applied: {new Date(candidate.appliedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Status Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Current Status</p>
                <Badge variant="secondary" className="text-base">
                  {candidate.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Stage</p>
                <Badge variant="secondary" className="text-base">
                  {candidate.stage}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Expected Salary</p>
                <p className="text-xl font-semibold">{candidate.salary}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
