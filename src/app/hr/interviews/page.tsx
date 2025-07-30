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
import { Label } from "@/components/ui/label";
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
  Calendar,
  Clock,
  User,
  MapPin,
  Video,
  Phone,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  X,
} from "lucide-react";
import { useState, useMemo } from "react";

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
    interviewerEmail: "john.smith@aibos.com",
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
    interviewerEmail: "sarah.wilson@aibos.com",
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
    feedback: "Excellent portfolio, strong design thinking",
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
    feedback: "Strong technical skills, good problem-solving approach",
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
    interviewerEmail: "tom.anderson@aibos.com",
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
    interviewerEmail: "jane.davis@aibos.com",
  },
];

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    Scheduled: "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
    Rescheduled: "bg-yellow-100 text-yellow-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const getModeIcon = (mode: string) => {
  switch (mode) {
    case "Video Call":
      return <Video className="w-4 h-4" />;
    case "Phone Call":
      return <Phone className="w-4 h-4" />;
    default:
      return <MapPin className="w-4 h-4" />;
  }
};

// Calendar View Component
const CalendarView = ({ interviews }: { interviews: any[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get current month's days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);

  const getInterviewsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return interviews.filter((interview) => interview.date === dateString);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date && date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    return (
      date &&
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Interview Calendar</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    1
                  )
                )
              }
            >
              ←
            </Button>
            <span className="text-sm font-medium">
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    1
                  )
                )
              }
            >
              →
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {days.map((day, index) => (
            <div
              key={index}
              className={`min-h-[100px] p-2 border border-gray-200 ${
                !day ? "bg-gray-50" : ""
              } ${day && isToday(day) ? "bg-blue-50 border-blue-300" : ""}`}
            >
              {day && (
                <>
                  <div
                    className={`text-sm font-medium mb-1 ${
                      isToday(day)
                        ? "text-blue-600"
                        : isCurrentMonth(day)
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {formatDate(day)}
                  </div>
                  <div className="space-y-1">
                    {getInterviewsForDate(day).map((interview) => (
                      <div
                        key={interview.id}
                        className={`text-xs p-1 rounded cursor-pointer ${
                          interview.status === "Scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : interview.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : interview.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                        title={`${interview.candidateName} - ${interview.type} at ${interview.time}`}
                      >
                        <div className="font-medium truncate">
                          {interview.candidateName}
                        </div>
                        <div className="text-xs opacity-75">
                          {interview.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function InterviewsPage() {
  const router = useRouter();
  const [interviewsList, setInterviewsList] = useState(interviews);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<any>(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({
    date: "",
    time: "",
    duration: "",
    interviewer: "",
    location: "",
    mode: "",
    notes: "",
  });

  // Get unique filter options
  const statuses = useMemo(() => {
    return [...new Set(interviewsList.map((i) => i.status))];
  }, [interviewsList]);

  const types = useMemo(() => {
    return [...new Set(interviewsList.map((i) => i.type))];
  }, [interviewsList]);

  const modes = useMemo(() => {
    return [...new Set(interviewsList.map((i) => i.mode))];
  }, [interviewsList]);

  // Filter interviews based on search and filters
  const filteredInterviews = useMemo(() => {
    return interviewsList.filter((interview) => {
      const matchesSearch =
        searchQuery === "" ||
        interview.candidateName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        interview.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interview.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interview.interviewer
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        interview.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || interview.status === statusFilter;
      const matchesType = typeFilter === "all" || interview.type === typeFilter;
      const matchesMode = modeFilter === "all" || interview.mode === modeFilter;

      return matchesSearch && matchesStatus && matchesType && matchesMode;
    });
  }, [interviewsList, searchQuery, statusFilter, typeFilter, modeFilter]);

  const clearFilters = () => {
    setStatusFilter("all");
    setTypeFilter("all");
    setModeFilter("all");
    setSearchQuery("");
  };

  const handleEditInterview = (interviewId: number) => {
    // Navigate to edit page or open edit modal
    router.push(`/hr/interviews/${interviewId}/edit`);
  };

  const handleCompleteInterview = (interviewId: number) => {
    setInterviewsList((prevInterviews) =>
      prevInterviews.map((interview) =>
        interview.id === interviewId
          ? { ...interview, status: "Completed" }
          : interview
      )
    );
  };

  const handleCancelInterview = (interviewId: number) => {
    setInterviewsList((prevInterviews) =>
      prevInterviews.map((interview) =>
        interview.id === interviewId
          ? { ...interview, status: "Cancelled" }
          : interview
      )
    );
  };

  const handleViewFeedback = (interview: any) => {
    setSelectedInterview(interview);
    setShowFeedbackModal(true);
  };

  const handleExportFeedback = (interview: any) => {
    // Create the feedback content
    const feedbackContent = `
Interview Feedback Report
========================

Candidate Information:
- Name: ${interview.candidateName}
- Position: ${interview.position}
- Interview Type: ${interview.type}

Interview Details:
- Date: ${new Date(interview.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
- Time: ${interview.time} (${interview.duration})
- Interviewer: ${interview.interviewer}
- Location: ${interview.location}
- Mode: ${interview.mode}

Interview Notes:
${interview.notes}

Interview Feedback:
${interview.feedback}

Generated on: ${new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })} at ${new Date().toLocaleTimeString("en-US")}
    `.trim();

    // Create and download the file
    const blob = new Blob([feedbackContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `interview-feedback-${interview.candidateName
      .replace(/\s+/g, "-")
      .toLowerCase()}-${
      new Date(interview.date).toISOString().split("T")[0]
    }.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRescheduleInterview = (interview: any) => {
    setSelectedInterview(interview);
    setRescheduleData({
      date: "",
      time: "",
      duration: interview.duration,
      interviewer: interview.interviewer,
      location: interview.location,
      mode: interview.mode,
      notes: `Rescheduled from ${new Date(interview.date).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )} at ${interview.time}. Original notes: ${interview.notes}`,
    });
    setShowRescheduleModal(true);
  };

  const handleConfirmReschedule = () => {
    if (!rescheduleData.date || !rescheduleData.time) {
      alert("Please fill in all required fields (Date and Time)");
      return;
    }

    setInterviewsList((prevInterviews) =>
      prevInterviews.map((interview) =>
        interview.id === selectedInterview.id
          ? {
              ...interview,
              date: rescheduleData.date,
              time: rescheduleData.time,
              duration: rescheduleData.duration,
              interviewer: rescheduleData.interviewer,
              location: rescheduleData.location,
              mode: rescheduleData.mode,
              notes: rescheduleData.notes,
              status: "Scheduled",
            }
          : interview
      )
    );

    // Reset modal state
    setShowRescheduleModal(false);
    setSelectedInterview(null);
    setRescheduleData({
      date: "",
      time: "",
      duration: "",
      interviewer: "",
      location: "",
      mode: "",
      notes: "",
    });
  };

  return (
    <MainLayout userRole="hr" title="Interview Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search interviews..."
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
                typeFilter !== "all" ||
                modeFilter !== "all") && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {
                    [statusFilter, typeFilter, modeFilter].filter(
                      (f) => f !== "all"
                    ).length
                  }
                </Badge>
              )}
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              onClick={() =>
                setViewMode(viewMode === "list" ? "calendar" : "list")
              }
            >
              <Calendar className="w-4 h-4 mr-2" />
              {viewMode === "list" ? "Calendar View" : "List View"}
            </Button>
          </div>
          <Button onClick={() => router.push("/hr/schedule-interview")}>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Interview
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Filter Interviews</CardTitle>
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
                  <Label className="text-sm font-medium mb-2 block">
                    Status
                  </Label>
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
                  <Label className="text-sm font-medium mb-2 block">Type</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">Mode</Label>
                  <Select value={modeFilter} onValueChange={setModeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Modes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Modes</SelectItem>
                      {modes.map((mode) => (
                        <SelectItem key={mode} value={mode}>
                          {mode}
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
            Showing {filteredInterviews.length} of {interviewsList.length}{" "}
            interviews
          </p>
          {(statusFilter !== "all" ||
            typeFilter !== "all" ||
            modeFilter !== "all" ||
            searchQuery) && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {
                    interviewsList.filter((i) => i.status === "Scheduled")
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600">Scheduled</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {
                    interviewsList.filter((i) => i.status === "Completed")
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {
                    interviewsList.filter((i) => i.status === "Cancelled")
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600">Cancelled</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {
                    interviewsList.filter((i) => i.status === "Rescheduled")
                      .length
                  }
                </div>
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
              {interviewsList
                .filter(
                  (interview) =>
                    interview.date === "2024-01-25" &&
                    interview.status === "Scheduled"
                )
                .map((interview) => (
                  <div
                    key={interview.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{interview.candidateName}</p>
                        <p className="text-sm text-gray-600">
                          {interview.type} • {interview.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {interview.interviewer}
                      </p>
                      <p className="text-xs text-gray-500">
                        {interview.location}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Interview Cards or Calendar View */}
        {viewMode === "list" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredInterviews.map((interview) => (
              <Card
                key={interview.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {interview.candidateName}
                      </CardTitle>
                      <CardDescription>
                        {interview.position} • {interview.type}
                      </CardDescription>
                    </div>
                    <Badge
                      className={getStatusColor(interview.status)}
                      variant="secondary"
                    >
                      {interview.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(interview.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
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
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Notes:
                    </p>
                    <p className="text-sm text-gray-600">{interview.notes}</p>
                  </div>

                  {/* Feedback (if completed) */}
                  {interview.feedback && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Feedback:
                      </p>
                      <p className="text-sm text-gray-600">
                        {interview.feedback}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    {interview.status === "Scheduled" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleEditInterview(interview.id)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleCompleteInterview(interview.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Complete
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCancelInterview(interview.id)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    {interview.status === "Completed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => handleViewFeedback(interview)}
                      >
                        View Feedback
                      </Button>
                    )}
                    {interview.status === "Cancelled" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => handleRescheduleInterview(interview)}
                      >
                        Reschedule
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <CalendarView interviews={filteredInterviews} />
        )}

        {/* Empty State */}
        {filteredInterviews.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No interviews found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

        {/* Feedback Modal */}
        {showFeedbackModal && selectedInterview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Interview Feedback
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {selectedInterview.candidateName} •{" "}
                      {selectedInterview.position}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowFeedbackModal(false);
                      setSelectedInterview(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Interview Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-700">
                      {new Date(selectedInterview.date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-700">
                      {selectedInterview.time} ({selectedInterview.duration})
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-700">
                      {selectedInterview.interviewer}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    {getModeIcon(selectedInterview.mode)}
                    <span className="ml-2 text-gray-700">
                      {selectedInterview.location}
                    </span>
                  </div>
                </div>

                {/* Feedback Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Interview Feedback
                    </h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-green-800">
                            {selectedInterview.feedback}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interview Notes */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Interview Notes
                    </h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        {selectedInterview.notes}
                      </p>
                    </div>
                  </div>

                  {/* Interview Type */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Interview Type
                    </h3>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <Badge
                        className="bg-blue-100 text-blue-800"
                        variant="secondary"
                      >
                        {selectedInterview.type}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowFeedbackModal(false);
                      setSelectedInterview(null);
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => handleExportFeedback(selectedInterview)}
                  >
                    Export Feedback
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reschedule Modal */}
        {showRescheduleModal && selectedInterview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Reschedule Interview
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {selectedInterview.candidateName} •{" "}
                      {selectedInterview.position}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowRescheduleModal(false);
                      setSelectedInterview(null);
                      setRescheduleData({
                        date: "",
                        time: "",
                        duration: "",
                        interviewer: "",
                        location: "",
                        mode: "",
                        notes: "",
                      });
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Original Interview Details */}
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="text-sm font-semibold text-red-800 mb-2">
                    Original Interview (Cancelled)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-red-600" />
                      <span className="text-red-700">
                        {new Date(selectedInterview.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-red-600" />
                      <span className="text-red-700">
                        {selectedInterview.time} ({selectedInterview.duration})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-red-600" />
                      <span className="text-red-700">
                        {selectedInterview.interviewer}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {getModeIcon(selectedInterview.mode)}
                      <span className="ml-2 text-red-700">
                        {selectedInterview.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reschedule Form */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        New Date *
                      </Label>
                      <Input
                        type="date"
                        value={rescheduleData.date}
                        onChange={(e) =>
                          setRescheduleData({
                            ...rescheduleData,
                            date: e.target.value,
                          })
                        }
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        New Time *
                      </Label>
                      <Input
                        type="time"
                        value={rescheduleData.time}
                        onChange={(e) =>
                          setRescheduleData({
                            ...rescheduleData,
                            time: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Duration
                      </Label>
                      <Input
                        value={rescheduleData.duration}
                        onChange={(e) =>
                          setRescheduleData({
                            ...rescheduleData,
                            duration: e.target.value,
                          })
                        }
                        placeholder="e.g., 60 minutes"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Interviewer
                      </Label>
                      <Input
                        value={rescheduleData.interviewer}
                        onChange={(e) =>
                          setRescheduleData({
                            ...rescheduleData,
                            interviewer: e.target.value,
                          })
                        }
                        placeholder="Interviewer name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Location
                      </Label>
                      <Input
                        value={rescheduleData.location}
                        onChange={(e) =>
                          setRescheduleData({
                            ...rescheduleData,
                            location: e.target.value,
                          })
                        }
                        placeholder="Interview location"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Mode
                      </Label>
                      <Select
                        value={rescheduleData.mode}
                        onValueChange={(value) =>
                          setRescheduleData({ ...rescheduleData, mode: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="In-Person">In-Person</SelectItem>
                          <SelectItem value="Video Call">Video Call</SelectItem>
                          <SelectItem value="Phone Call">Phone Call</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Notes
                    </Label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      value={rescheduleData.notes}
                      onChange={(e) =>
                        setRescheduleData({
                          ...rescheduleData,
                          notes: e.target.value,
                        })
                      }
                      placeholder="Additional notes for the rescheduled interview..."
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowRescheduleModal(false);
                      setSelectedInterview(null);
                      setRescheduleData({
                        date: "",
                        time: "",
                        duration: "",
                        interviewer: "",
                        location: "",
                        mode: "",
                        notes: "",
                      });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleConfirmReschedule}>
                    Confirm Reschedule
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
