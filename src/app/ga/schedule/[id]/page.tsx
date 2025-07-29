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
  Calendar,
  Clock,
  User,
  MapPin,
  Edit,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

type ScheduleRecord = {
  id: number;
  employeeName: string;
  department: string;
  date: string;
  startTime: string;
  endTime: string;
  breakTime: string;
  location: string;
  status: string;
  type: string;
  notes: string;
  conflict?: string;
};

// Mock data - in a real app, this would come from an API
const schedules: ScheduleRecord[] = [
  {
    id: 1,
    employeeName: "Alice Johnson",
    department: "Engineering",
    date: "2024-01-25",
    startTime: "09:00",
    endTime: "17:00",
    breakTime: "12:00-13:00",
    location: "Office Floor 2",
    status: "Confirmed",
    type: "Regular",
    notes: "Standard work schedule",
  },
  {
    id: 2,
    employeeName: "Bob Smith",
    department: "Product",
    date: "2024-01-25",
    startTime: "10:00",
    endTime: "18:00",
    breakTime: "13:00-14:00",
    location: "Office Floor 3",
    status: "Confirmed",
    type: "Flexible",
    notes: "Flexible hours arrangement",
  },
  {
    id: 3,
    employeeName: "Carol Davis",
    department: "Design",
    date: "2024-01-25",
    startTime: "08:30",
    endTime: "16:30",
    breakTime: "12:30-13:30",
    location: "Design Studio",
    status: "Pending",
    type: "Early",
    notes: "Early shift preference",
  },
  {
    id: 4,
    employeeName: "David Wilson",
    department: "Analytics",
    date: "2024-01-25",
    startTime: "14:00",
    endTime: "22:00",
    breakTime: "18:00-19:00",
    location: "Office Floor 1",
    status: "Conflict",
    type: "Late",
    notes: "Overtime required for project deadline",
    conflict: "Exceeds daily hour limit",
  },
  {
    id: 5,
    employeeName: "Emma Brown",
    department: "Marketing",
    date: "2024-01-25",
    startTime: "09:00",
    endTime: "17:00",
    breakTime: "12:00-13:00",
    location: "Remote",
    status: "Confirmed",
    type: "Remote",
    notes: "Work from home day",
  },
];

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    Confirmed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Conflict: "bg-red-100 text-red-800",
    Cancelled: "bg-gray-100 text-gray-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const getTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    Regular: "bg-blue-100 text-blue-800",
    Flexible: "bg-purple-100 text-purple-800",
    Early: "bg-orange-100 text-orange-800",
    Late: "bg-indigo-100 text-indigo-800",
    Remote: "bg-green-100 text-green-800",
  };
  return colors[type] || "bg-gray-100 text-gray-800";
};

export default function ScheduleDetailPage() {
  const params = useParams();
  const scheduleId = parseInt(params.id as string);
  
  // Find the schedule record by ID
  const schedule = schedules.find((s) => s.id === scheduleId);

  if (!schedule) {
    return (
      <MainLayout userRole="ga" title="Schedule Not Found">
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Schedule Not Found</h2>
          <p className="text-gray-600">The schedule record you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/ga/schedule">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Schedule Management
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout userRole="ga" title={`Schedule Details - ${schedule.employeeName}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/ga/schedule">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Schedule Management
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold">Schedule Details</h1>
              <p className="text-gray-600">
                Schedule information for {schedule.employeeName}
              </p>
            </div>
          </div>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Schedule
          </Button>
        </div>

        {/* Schedule Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-medium">{schedule.employeeName}</h3>
                <p className="text-gray-600">{schedule.department}</p>
              </div>
              <div className="flex space-x-2">
                <Badge className={getStatusColor(schedule.status)} variant="secondary">
                  {schedule.status}
                </Badge>
                <Badge className={getTypeColor(schedule.type)} variant="secondary">
                  {schedule.type}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date
                </div>
                <div className="font-medium">
                  {new Date(schedule.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Work Hours
                </div>
                <div className="font-medium">
                  {schedule.startTime} - {schedule.endTime}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Break Time
                </div>
                <div className="font-medium">{schedule.breakTime}</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  Location
                </div>
                <div className="font-medium">{schedule.location}</div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                <p className="text-gray-700 bg-gray-50 rounded-lg p-3">
                  {schedule.notes}
                </p>
              </div>

              {/* Conflict Alert */}
              {schedule.conflict && (
                <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-900">Schedule Conflict</h4>
                      <p className="text-red-700 mt-1">{schedule.conflict}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Schedule Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule Summary</CardTitle>
            <CardDescription>
              Overview of work hours and break information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {(() => {
                    const start = new Date(`2000-01-01 ${schedule.startTime}`);
                    const end = new Date(`2000-01-01 ${schedule.endTime}`);
                    let diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
                    if (diff < 0) diff += 24; // Handle overnight shifts
                    return diff.toFixed(1);
                  })()}h
                </div>
                <div className="text-sm text-blue-600">Total Hours</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {(() => {
                    const [start, end] = schedule.breakTime.split('-');
                    const startTime = new Date(`2000-01-01 ${start}`);
                    const endTime = new Date(`2000-01-01 ${end}`);
                    const diff = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
                    return `${diff}min`;
                  })()}
                </div>
                <div className="text-sm text-green-600">Break Duration</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {schedule.type}
                </div>
                <div className="text-sm text-purple-600">Schedule Type</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}