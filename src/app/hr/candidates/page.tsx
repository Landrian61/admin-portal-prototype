"use client";

import { useRouter } from "next/navigation";
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
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  GraduationCap,
  Briefcase,
  X,
} from "lucide-react";
import { useState, useMemo } from "react";

const candidates = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 (555) 123-4567",
    position: "Software Engineer",
    location: "New York, NY",
    experience: "5 years",
    education: "BS Computer Science",
    status: "Active",
    stage: "Interview",
    appliedDate: "2024-01-15",
    resumeUrl: "/resumes/alice-johnson.pdf",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    salary: "$95,000",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@email.com",
    phone: "+1 (555) 234-5678",
    position: "Product Manager",
    location: "San Francisco, CA",
    experience: "7 years",
    education: "MBA, BS Engineering",
    status: "Active",
    stage: "Screening",
    appliedDate: "2024-01-14",
    resumeUrl: "/resumes/bob-smith.pdf",
    skills: ["Product Strategy", "Agile", "Analytics", "Leadership"],
    salary: "$120,000",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@email.com",
    phone: "+1 (555) 345-6789",
    position: "UX Designer",
    location: "Austin, TX",
    experience: "4 years",
    education: "BFA Design",
    status: "Active",
    stage: "Portfolio Review",
    appliedDate: "2024-01-12",
    resumeUrl: "/resumes/carol-davis.pdf",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    salary: "$85,000",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1 (555) 456-7890",
    position: "Data Analyst",
    location: "Chicago, IL",
    experience: "3 years",
    education: "MS Data Science",
    status: "On Hold",
    stage: "Technical Assessment",
    appliedDate: "2024-01-10",
    resumeUrl: "/resumes/david-wilson.pdf",
    skills: ["Python", "SQL", "Tableau", "Machine Learning"],
    salary: "$75,000",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma.brown@email.com",
    phone: "+1 (555) 567-8901",
    position: "Marketing Manager",
    location: "Los Angeles, CA",
    experience: "6 years",
    education: "BA Marketing",
    status: "Active",
    stage: "Final Interview",
    appliedDate: "2024-01-08",
    resumeUrl: "/resumes/emma-brown.pdf",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    salary: "$90,000",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank.miller@email.com",
    phone: "+1 (555) 678-9012",
    position: "Sales Representative",
    location: "Miami, FL",
    experience: "8 years",
    education: "BA Business",
    status: "Active",
    stage: "Offer Extended",
    appliedDate: "2024-01-05",
    resumeUrl: "/resumes/frank-miller.pdf",
    skills: ["B2B Sales", "CRM", "Negotiation", "Relationship Building"],
    salary: "$80,000",
    avatar: "/api/placeholder/40/40",
  },
];

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    Active: "bg-green-100 text-green-800",
    "On Hold": "bg-yellow-100 text-yellow-800",
    Rejected: "bg-red-100 text-red-800",
    Hired: "bg-blue-100 text-blue-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const getStageColor = (stage: string) => {
  const colors: { [key: string]: string } = {
    Screening: "bg-blue-100 text-blue-800",
    Interview: "bg-yellow-100 text-yellow-800",
    "Portfolio Review": "bg-purple-100 text-purple-800",
    "Technical Assessment": "bg-orange-100 text-orange-800",
    "Final Interview": "bg-indigo-100 text-indigo-800",
    "Offer Extended": "bg-green-100 text-green-800",
  };
  return colors[stage] || "bg-gray-100 text-gray-800";
};

export default function CandidatesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique filter options
  const statuses = useMemo(() => {
    return [...new Set(candidates.map((c) => c.status))];
  }, []);

  const stages = useMemo(() => {
    return [...new Set(candidates.map((c) => c.stage))];
  }, []);

  const locations = useMemo(() => {
    return [...new Set(candidates.map((c) => c.location))];
  }, []);

  // Filter candidates based on search and filters
  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesSearch =
        searchQuery === "" ||
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesStatus =
        statusFilter === "all" || candidate.status === statusFilter;
      const matchesStage =
        stageFilter === "all" || candidate.stage === stageFilter;
      const matchesLocation =
        locationFilter === "all" || candidate.location === locationFilter;

      return matchesSearch && matchesStatus && matchesStage && matchesLocation;
    });
  }, [searchQuery, statusFilter, stageFilter, locationFilter]);

  // Export functionality
  const exportCandidates = () => {
    const csvContent = [
      // CSV header
      [
        "Name",
        "Email",
        "Phone",
        "Position",
        "Location",
        "Experience",
        "Education",
        "Status",
        "Stage",
        "Applied Date",
        "Salary",
        "Skills",
      ].join(","),
      // CSV data
      ...filteredCandidates.map((candidate) =>
        [
          candidate.name,
          candidate.email,
          candidate.phone,
          candidate.position,
          candidate.location,
          candidate.experience,
          candidate.education,
          candidate.status,
          candidate.stage,
          candidate.appliedDate,
          candidate.salary,
          candidate.skills.join("; "),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `candidates_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearFilters = () => {
    setStatusFilter("all");
    setStageFilter("all");
    setLocationFilter("all");
    setSearchQuery("");
  };

  return (
    <MainLayout userRole="hr" title="Candidate Management">
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
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
              {(statusFilter !== "all" ||
                stageFilter !== "all" ||
                locationFilter !== "all") && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {
                    [statusFilter, stageFilter, locationFilter].filter(
                      (f) => f !== "all"
                    ).length
                  }
                </Badge>
              )}
            </Button>
            <Button variant="outline" onClick={exportCandidates}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Filter Candidates</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Status
                  </label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Stage
                  </label>
                  <Select value={stageFilter} onValueChange={setStageFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Stages" />
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
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Location
                  </label>
                  <Select
                    value={locationFilter}
                    onValueChange={setLocationFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <Button variant="outline" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button onClick={() => setShowFilters(false)}>
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredCandidates.length} of {candidates.length}{" "}
            candidates
          </p>
          {(statusFilter !== "all" ||
            stageFilter !== "all" ||
            locationFilter !== "all" ||
            searchQuery) && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <Card
              key={candidate.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {candidate.name}
                      </CardTitle>
                      <CardDescription>{candidate.position}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {candidate.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {candidate.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {candidate.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Applied:{" "}
                    {new Date(candidate.appliedDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }
                    )}
                  </div>
                </div>

                {/* Experience & Education */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {candidate.experience} experience
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    {candidate.education}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Skills:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 3).map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{candidate.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Status & Stage */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Badge
                      className={getStatusColor(candidate.status)}
                      variant="secondary"
                    >
                      {candidate.status}
                    </Badge>
                    <Badge
                      className={getStageColor(candidate.stage)}
                      variant="secondary"
                    >
                      {candidate.stage}
                    </Badge>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        router.push(`/hr/candidates/${candidate.id}`)
                      }
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No candidates found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
