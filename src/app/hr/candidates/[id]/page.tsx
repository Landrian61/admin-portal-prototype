"use client";

import { MainLayout } from "@/components/layout/main-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  User,
  MapPin,
  Clock,
  CheckCircle,
  Circle,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

// Mock candidate data - in a real app, this would come from an API
const candidates = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 (555) 123-4567",
    position: "Software Engineer",
    currentStage: "Interview",
    appliedDate: "2024-01-15",
    location: "New York, NY",
    avatar: "/api/placeholder/40/40",
    experience: "5 years",
    education: "BS Computer Science",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    salary: "$95,000",
    timeline: [
      {
        stage: "Application Received",
        date: "2024-01-15",
        completed: true,
        description: "Application submitted through company website",
      },
      {
        stage: "Screening",
        date: "2024-01-16",
        completed: true,
        description: "Initial resume screening completed",
      },
      {
        stage: "Phone Interview",
        date: "2024-01-18",
        completed: true,
        description: "30-minute phone interview with HR",
      },
      {
        stage: "Interview",
        date: "2024-01-22",
        completed: false,
        description: "Technical interview with engineering team",
      },
      {
        stage: "Final Review",
        date: null,
        completed: false,
        description: "Final decision by hiring committee",
      },
      {
        stage: "Offer Extended",
        date: null,
        completed: false,
        description: "Job offer and contract negotiation",
      },
    ],
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@email.com",
    phone: "+1 (555) 234-5678",
    position: "Product Manager",
    currentStage: "Screening",
    appliedDate: "2024-01-14",
    location: "San Francisco, CA",
    avatar: "/api/placeholder/40/40",
    experience: "7 years",
    education: "MBA, BS Engineering",
    skills: ["Product Strategy", "Agile", "Analytics", "Leadership"],
    salary: "$120,000",
    timeline: [
      {
        stage: "Application Received",
        date: "2024-01-14",
        completed: true,
        description: "Application submitted through LinkedIn",
      },
      {
        stage: "Screening",
        date: "2024-01-15",
        completed: false,
        description: "Resume and portfolio review in progress",
      },
      {
        stage: "Phone Interview",
        date: null,
        completed: false,
        description: "Initial screening call",
      },
      {
        stage: "In-Person Interview",
        date: null,
        completed: false,
        description: "Case study and behavioral interview",
      },
      {
        stage: "Final Review",
        date: null,
        completed: false,
        description: "Final decision by product leadership",
      },
      {
        stage: "Offer Extended",
        date: null,
        completed: false,
        description: "Job offer and compensation discussion",
      },
    ],
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@email.com",
    phone: "+1 (555) 345-6789",
    position: "UX Designer",
    currentStage: "Portfolio Review",
    appliedDate: "2024-01-12",
    location: "Austin, TX",
    avatar: "/api/placeholder/40/40",
    experience: "4 years",
    education: "BFA Design",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    salary: "$85,000",
    timeline: [
      {
        stage: "Application Received",
        date: "2024-01-12",
        completed: true,
        description: "Application submitted through portfolio",
      },
      {
        stage: "Screening",
        date: "2024-01-13",
        completed: true,
        description: "Initial portfolio review",
      },
      {
        stage: "Portfolio Review",
        date: "2024-01-15",
        completed: false,
        description: "Detailed portfolio and case study review",
      },
      {
        stage: "Design Challenge",
        date: null,
        completed: false,
        description: "Take-home design assignment",
      },
      {
        stage: "Final Interview",
        date: null,
        completed: false,
        description: "Final interview with design team",
      },
      {
        stage: "Offer Extended",
        date: null,
        completed: false,
        description: "Job offer and contract discussion",
      },
    ],
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1 (555) 456-7890",
    position: "Data Analyst",
    currentStage: "Technical Assessment",
    appliedDate: "2024-01-10",
    location: "Chicago, IL",
    avatar: "/api/placeholder/40/40",
    experience: "3 years",
    education: "MS Data Science",
    skills: ["Python", "SQL", "Tableau", "Machine Learning"],
    salary: "$75,000",
    timeline: [
      {
        stage: "Application Received",
        date: "2024-01-10",
        completed: true,
        description: "Application submitted through job board",
      },
      {
        stage: "Screening",
        date: "2024-01-11",
        completed: true,
        description: "Initial resume screening",
      },
      {
        stage: "Technical Assessment",
        date: "2024-01-13",
        completed: false,
        description: "Data analysis and SQL assessment",
      },
      {
        stage: "Phone Interview",
        date: null,
        completed: false,
        description: "Technical interview with data team",
      },
      {
        stage: "Final Review",
        date: null,
        completed: false,
        description: "Final decision by analytics team",
      },
      {
        stage: "Offer Extended",
        date: null,
        completed: false,
        description: "Job offer and compensation discussion",
      },
    ],
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma.brown@email.com",
    phone: "+1 (555) 567-8901",
    position: "Marketing Manager",
    currentStage: "Final Interview",
    appliedDate: "2024-01-08",
    location: "Los Angeles, CA",
    avatar: "/api/placeholder/40/40",
    experience: "6 years",
    education: "BA Marketing",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    salary: "$90,000",
    timeline: [
      {
        stage: "Application Received",
        date: "2024-01-08",
        completed: true,
        description: "Application submitted through company website",
      },
      {
        stage: "Screening",
        date: "2024-01-09",
        completed: true,
        description: "Initial resume and portfolio review",
      },
      {
        stage: "Phone Interview",
        date: "2024-01-12",
        completed: true,
        description: "30-minute phone interview with HR",
      },
      {
        stage: "In-Person Interview",
        date: "2024-01-15",
        completed: true,
        description: "Case study presentation and behavioral interview",
      },
      {
        stage: "Final Interview",
        date: "2024-01-18",
        completed: false,
        description: "Final interview with marketing director",
      },
      {
        stage: "Offer Extended",
        date: null,
        completed: false,
        description: "Job offer and compensation discussion",
      },
    ],
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank.miller@email.com",
    phone: "+1 (555) 678-9012",
    position: "Sales Representative",
    currentStage: "Offer Extended",
    appliedDate: "2024-01-05",
    location: "Miami, FL",
    avatar: "/api/placeholder/40/40",
    experience: "8 years",
    education: "BA Business",
    skills: ["B2B Sales", "CRM", "Negotiation", "Relationship Building"],
    salary: "$80,000",
    timeline: [
      {
        stage: "Application Received",
        date: "2024-01-05",
        completed: true,
        description: "Application submitted through LinkedIn",
      },
      {
        stage: "Screening",
        date: "2024-01-06",
        completed: true,
        description: "Initial resume screening",
      },
      {
        stage: "Phone Interview",
        date: "2024-01-08",
        completed: true,
        description: "30-minute phone interview with sales manager",
      },
      {
        stage: "In-Person Interview",
        date: "2024-01-12",
        completed: true,
        description: "Sales pitch presentation and behavioral interview",
      },
      {
        stage: "Final Review",
        date: "2024-01-15",
        completed: true,
        description: "Final decision by sales director",
      },
      {
        stage: "Offer Extended",
        date: "2024-01-16",
        completed: false,
        description: "Job offer and compensation discussion",
      },
    ],
  },
];

const stages = [
  "Application Received",
  "Screening",
  "Phone Interview",
  "In-Person Interview",
  "Final Review",
  "Offer Extended",
];

const getStageColor = (stage: string) => {
  const colors: { [key: string]: string } = {
    "Application Received": "bg-gray-100 text-gray-800",
    Screening: "bg-blue-100 text-blue-800",
    "Phone Interview": "bg-yellow-100 text-yellow-800",
    "In-Person Interview": "bg-orange-100 text-orange-800",
    "Final Review": "bg-purple-100 text-purple-800",
    "Offer Extended": "bg-green-100 text-green-800",
  };
  return colors[stage] || "bg-gray-100 text-gray-800";
};

export default function CandidateDetails() {
  const router = useRouter();
  const params = useParams();
  const candidateId = parseInt(params.id as string);

  const candidate = candidates.find((c) => c.id === candidateId);

  if (!candidate) {
    return (
      <MainLayout userRole="hr" title="Candidate Not Found">
        <div className="text-center py-8">
          <p className="text-gray-500">Candidate not found</p>
          <Button onClick={() => router.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout userRole="hr" title={`${candidate.name} - Application`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Hiring Board
          </Button>
          
        </div>

        {/* Candidate Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{candidate.name}</CardTitle>
                <CardDescription className="text-lg">
                  {candidate.position}
                </CardDescription>
              </div>
              <Badge
                className={`${getStageColor(
                  candidate.currentStage
                )} text-sm px-3 py-1`}
              >
                {candidate.currentStage}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{candidate.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{candidate.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">
                  Applied:{" "}
                  {new Date(candidate.appliedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Experience</h4>
                <p className="text-sm text-gray-600">{candidate.experience}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Education</h4>
                <p className="text-sm text-gray-600">{candidate.education}</p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium text-sm mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Application Timeline</CardTitle>
            <CardDescription>
              Track the candidate's progress through the hiring process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {candidate.timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    {item.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-300" />
                    )}
                    {index < candidate.timeline.length - 1 && (
                      <div
                        className={`w-0.5 h-8 mt-2 ${
                          item.completed ? "bg-green-500" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{item.stage}</h4>
                      {item.date && (
                        <span className="text-xs text-gray-500">
                          {new Date(item.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.description}
                    </p>
                    {item.completed && item.date && (
                      <p className="text-xs text-green-600 mt-1">✓ Completed</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common actions for this candidate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Send Follow-up Email
              </Button>
              <Button variant="outline" className="justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Next Interview
              </Button>
              <Button variant="outline" className="justify-start">
                <User className="w-4 h-4 mr-2" />
                Update Status
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
