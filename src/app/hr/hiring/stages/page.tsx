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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  User,
  Mail,
  Phone,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

const candidates = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 (555) 123-4567",
    position: "Software Engineer",
    stage: "Application Received",
    appliedDate: "2024-01-15",
    avatar: "/api/placeholder/40/40",
    experience: "5 years",
    education: "BS Computer Science, Stanford University",
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@email.com",
    phone: "+1 (555) 234-5678",
    position: "Product Manager",
    stage: "Screening",
    appliedDate: "2024-01-14",
    avatar: "/api/placeholder/40/40",
    experience: "7 years",
    education: "MBA, Harvard Business School",
    skills: ["Product Strategy", "Agile", "Data Analysis", "User Research"],
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@email.com",
    phone: "+1 (555) 345-6789",
    position: "UX Designer",
    stage: "Phone Interview",
    appliedDate: "2024-01-12",
    avatar: "/api/placeholder/40/40",
    experience: "4 years",
    education: "BFA Design, RISD",
    skills: ["Figma", "Sketch", "Adobe Creative Suite", "User Research"],
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1 (555) 456-7890",
    position: "Data Analyst",
    stage: "In-Person Interview",
    appliedDate: "2024-01-10",
    avatar: "/api/placeholder/40/40",
    experience: "3 years",
    education: "MS Statistics, MIT",
    skills: ["SQL", "Python", "R", "Tableau", "Machine Learning"],
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma.brown@email.com",
    phone: "+1 (555) 567-8901",
    position: "Marketing Manager",
    stage: "Final Review",
    appliedDate: "2024-01-08",
    avatar: "/api/placeholder/40/40",
    experience: "6 years",
    education: "BA Marketing, UCLA",
    skills: ["Digital Marketing", "SEO", "Google Ads", "Analytics"],
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank.miller@email.com",
    phone: "+1 (555) 678-9012",
    position: "Sales Representative",
    stage: "Offer Extended",
    appliedDate: "2024-01-05",
    avatar: "/api/placeholder/40/40",
    experience: "8 years",
    education: "BA Business, USC",
    skills: ["B2B Sales", "CRM", "Negotiation", "Relationship Building"],
  },
  {
    id: 7,
    name: "Grace Lee",
    email: "grace.lee@email.com",
    phone: "+1 (555) 789-0123",
    position: "DevOps Engineer",
    stage: "Application Received",
    appliedDate: "2024-01-20",
    avatar: "/api/placeholder/40/40",
    experience: "4 years",
    education: "BS Computer Science, UC Berkeley",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
  },
  {
    id: 8,
    name: "Henry Chen",
    email: "henry.chen@email.com",
    phone: "+1 (555) 890-1234",
    position: "Content Strategist",
    stage: "Screening",
    appliedDate: "2024-01-18",
    avatar: "/api/placeholder/40/40",
    experience: "5 years",
    education: "MA Communications, NYU",
    skills: ["Content Strategy", "SEO", "Copywriting", "Analytics"],
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

export default function AllStagesView() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string>("all");

  // Filter candidates based on search query and selected stage
  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesSearch =
        searchQuery === "" ||
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.phone.includes(searchQuery);

      const matchesStage =
        selectedStage === "all" || candidate.stage === selectedStage;

      return matchesSearch && matchesStage;
    });
  }, [searchQuery, selectedStage]);

  return (
    <MainLayout userRole="hr" title="All Hiring Stages">
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

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search candidates..."
                className="pl-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {stages.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-gray-500">
            {filteredCandidates.length} candidates found
          </div>
        </div>

        {/* All Stages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {stages.map((stage) => {
            const stageCandidates = filteredCandidates.filter(
              (c) => c.stage === stage
            );

            return (
              <Card key={stage} className="h-fit">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{stage}</CardTitle>
                      <CardDescription>
                        {stageCandidates.length} candidate
                        {stageCandidates.length !== 1 ? "s" : ""}
                      </CardDescription>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${getStageColor(stage)} text-xs px-3 py-1`}
                    >
                      {stageCandidates.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {stageCandidates.map((candidate) => (
                    <Card
                      key={candidate.id}
                      className="p-3 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-200"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-sm">
                              {candidate.name}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {candidate.position}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center text-xs text-gray-500">
                            <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{candidate.email}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Phone className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{candidate.phone}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span>
                              Applied:{" "}
                              {new Date(
                                candidate.appliedDate
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 3).map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs px-2 py-0.5"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 3 && (
                            <Badge
                              variant="outline"
                              className="text-xs px-2 py-0.5"
                            >
                              +{candidate.skills.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <Badge
                            className={`${getStageColor(
                              candidate.stage
                            )} text-xs px-2 py-0.5`}
                            variant="secondary"
                          >
                            {candidate.stage}
                          </Badge>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 text-xs px-2"
                            >
                              Email
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 text-xs px-2"
                            >
                              Schedule
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {stageCandidates.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No candidates in this stage</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Pipeline Summary</CardTitle>
            <CardDescription>
              Overview of all candidates across stages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {stages.map((stage) => {
                const count = candidates.filter(
                  (c) => c.stage === stage
                ).length;
                return (
                  <div key={stage} className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${getStageColor(
                        stage
                      )}`}
                    >
                      <span className="text-lg font-semibold">{count}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{stage}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
