"use client";

import { useRouter, useParams } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  MapPin,
  Video,
  Phone,
  Save,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

// Mock interview data - in a real app, this would come from an API
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

const interviewTypes = [
  "Technical Interview",
  "Behavioral Interview",
  "Portfolio Review",
  "Technical Assessment",
  "Final Interview",
  "Phone Screening",
];

const interviewModes = ["In-Person", "Video Call", "Phone Call"];

const interviewDurations = [
  "30 minutes",
  "45 minutes",
  "60 minutes",
  "90 minutes",
  "120 minutes",
];

export default function EditInterviewPage() {
  const router = useRouter();
  const params = useParams();
  const interviewId = parseInt(params.id as string);

  const [formData, setFormData] = useState({
    candidateName: "",
    position: "",
    type: "",
    date: "",
    time: "",
    duration: "",
    interviewer: "",
    location: "",
    mode: "",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interview = interviews.find((i) => i.id === interviewId);
    if (interview) {
      setFormData({
        candidateName: interview.candidateName,
        position: interview.position,
        type: interview.type,
        date: interview.date,
        time: interview.time,
        duration: interview.duration,
        interviewer: interview.interviewer,
        location: interview.location,
        mode: interview.mode,
        notes: interview.notes,
      });
    }
  }, [interviewId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, you would make an API call here
    console.log("Updated interview data:", formData);

    setIsLoading(false);
    router.push("/hr/interviews");
  };

  const interview = interviews.find((i) => i.id === interviewId);

  if (!interview) {
    return (
      <MainLayout userRole="hr" title="Interview Not Found">
        <div className="text-center py-8">
          <p className="text-gray-500">Interview not found</p>
          <Button onClick={() => router.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      userRole="hr"
      title={`Edit Interview - ${interview.candidateName}`}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Interviews
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {/* Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Interview Details</CardTitle>
            <CardDescription>
              Update the interview information for {interview.candidateName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Candidate Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="candidateName">Candidate Name</Label>
                  <Input
                    id="candidateName"
                    value={formData.candidateName}
                    onChange={(e) =>
                      handleInputChange("candidateName", e.target.value)
                    }
                    placeholder="Enter candidate name"
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) =>
                      handleInputChange("position", e.target.value)
                    }
                    placeholder="Enter position"
                  />
                </div>
              </div>

              {/* Interview Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="type">Interview Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select interview type" />
                    </SelectTrigger>
                    <SelectContent>
                      {interviewTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                  />
                </div>
              </div>

              {/* Duration and Mode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) =>
                      handleInputChange("duration", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {interviewDurations.map((duration) => (
                        <SelectItem key={duration} value={duration}>
                          {duration}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="mode">Mode</Label>
                  <Select
                    value={formData.mode}
                    onValueChange={(value) => handleInputChange("mode", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      {interviewModes.map((mode) => (
                        <SelectItem key={mode} value={mode}>
                          {mode}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Interviewer and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="interviewer">Interviewer</Label>
                  <Input
                    id="interviewer"
                    value={formData.interviewer}
                    onChange={(e) =>
                      handleInputChange("interviewer", e.target.value)
                    }
                    placeholder="Enter interviewer name"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    placeholder="Enter location"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Enter interview notes"
                  rows={4}
                />
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Current Interview Info */}
        <Card>
          <CardHeader>
            <CardTitle>Current Interview Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{interview.candidateName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">
                  {new Date(interview.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{interview.time}</span>
              </div>
              <div className="flex items-center gap-2">
                {interview.mode === "Video Call" ? (
                  <Video className="w-4 h-4 text-gray-500" />
                ) : interview.mode === "Phone Call" ? (
                  <Phone className="w-4 h-4 text-gray-500" />
                ) : (
                  <MapPin className="w-4 h-4 text-gray-500" />
                )}
                <span className="text-sm">{interview.location}</span>
              </div>
            </div>
            <div className="mt-4">
              <Badge className="bg-blue-100 text-blue-800" variant="secondary">
                {interview.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
