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
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
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

export default function HiringProcess() {
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
    <MainLayout userRole="hr" title="Hiring Process Management">
      <div className="space-y-6">
        {/* Header Actions */}
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
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto">
          {stages.map((stage) => {
            const stageCandidates = filteredCandidates.filter(
              (c) => c.stage === stage
            );

            return (
              <div key={stage} className="min-w-[280px]">
                <Card className="h-fit">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">
                        {stage}
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {stageCandidates.length}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-0">
                    {stageCandidates.map((candidate) => (
                      <Card
                        key={candidate.id}
                        className="p-2 hover:shadow-sm transition-shadow cursor-pointer border-l-4 border-l-blue-200"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm truncate">
                              {candidate.name}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                            >
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </div>

                          <p className="text-xs text-gray-600 truncate">
                            {candidate.position}
                          </p>

                          <div className="space-y-0.5">
                            <div className="flex items-center text-xs text-gray-500">
                              <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
                              <span className="truncate">
                                {candidate.email}
                              </span>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Phone className="w-3 h-3 mr-1 flex-shrink-0" />
                              <span className="truncate">
                                {candidate.phone}
                              </span>
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

                          <div className="flex justify-between items-center pt-1">
                            <Badge
                              className={`${getStageColor(
                                candidate.stage
                              )} text-xs px-2 py-0.5`}
                              variant="secondary"
                            >
                              {candidate.stage}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    ))}

                    {stageCandidates.length === 0 && (
                      <div className="text-center py-6 text-gray-400">
                        <User className="w-6 h-6 mx-auto mb-1 opacity-50" />
                        <p className="text-xs">No candidates</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* View Button below the boards */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => router.push(`/hr/hiring/stages`)}
            className="px-8 py-3"
          >
            View All
          </Button>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common hiring process actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="justify-start bg-blue-50 hover:bg-blue-100 text-blue-600"
                onClick={() => router.push("/hr/schedule-interview")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
              <Button
                variant="outline"
                className="justify-start bg-purple-50 hover:bg-purple-100 text-purple-600"
                onClick={() => router.push("/hr/send-email")}
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button
                variant="outline"
                className="justify-start bg-green-50 hover:bg-green-100 text-green-600"
                onClick={() => router.push("/hr/create-job")}
              >
                <User className="w-4 h-4 mr-2" />
                Create Job Posting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
