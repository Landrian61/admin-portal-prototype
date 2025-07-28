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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Edit,
  Trash2,
  Copy,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

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

const weeklySchedule = [
  {
    day: "Monday",
    date: "2024-01-22",
    employees: [
      { name: "Alice Johnson", time: "09:00-17:00", status: "present" },
      { name: "Bob Smith", time: "10:00-18:00", status: "present" },
      { name: "Carol Davis", time: "08:30-16:30", status: "present" },
    ],
  },
  {
    day: "Tuesday",
    date: "2024-01-23",
    employees: [
      { name: "Alice Johnson", time: "09:00-17:00", status: "present" },
      { name: "David Wilson", time: "14:00-22:00", status: "late" },
      { name: "Emma Brown", time: "09:00-17:00", status: "absent" },
    ],
  },
  {
    day: "Wednesday",
    date: "2024-01-24",
    employees: [
      { name: "Bob Smith", time: "10:00-18:00", status: "present" },
      { name: "Carol Davis", time: "08:30-16:30", status: "present" },
      { name: "David Wilson", time: "14:00-22:00", status: "present" },
    ],
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

const getAttendanceStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    present: "text-green-600",
    late: "text-yellow-600",
    absent: "text-red-600",
  };
  return colors[status] || "text-gray-600";
};

export default function ScheduleManagementPage() {
  const [scheduleRecords, setScheduleRecords] =
    useState<ScheduleRecord[]>(schedules);
  const [editingRecord, setEditingRecord] = useState<ScheduleRecord | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [calendarView, setCalendarView] = useState(false);

  // Filtered and searched records
  const filteredRecords = scheduleRecords.filter((record) => {
    const matchesSearch =
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? record.status === filterStatus : true;
    const matchesType = filterType ? record.type === filterType : true;
    return matchesSearch && matchesStatus && matchesType;
  });

  const emptySchedule: ScheduleRecord = {
    id: Date.now(),
    employeeName: "",
    department: "",
    date: "",
    startTime: "",
    endTime: "",
    breakTime: "",
    location: "",
    status: "Confirmed",
    type: "Regular",
    notes: "",
  };

  const handleEditRecord = (record: ScheduleRecord) => {
    console.log("Edit button clicked for:", record.employeeName);
    setEditingRecord({ ...record });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingRecord) {
      setScheduleRecords((prev) =>
        prev.map((record) =>
          record.id === editingRecord.id ? editingRecord : record
        )
      );
      setIsEditModalOpen(false);
      setEditingRecord(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingRecord(null);
  };

  const handleOpenCreate = () => {
    setEditingRecord({ ...emptySchedule, id: Date.now() });
    setIsCreateModalOpen(true);
  };

  const handleSaveCreate = () => {
    if (editingRecord) {
      setScheduleRecords((prev) => [editingRecord, ...prev]);
      setIsCreateModalOpen(false);
      setEditingRecord(null);
    }
  };

  const updateEditingRecord = (field: string, value: string) => {
    setEditingRecord((prev: ScheduleRecord | null) => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  return (
    <MainLayout userRole="ga" title="Schedule Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search schedules..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Select
                value={filterStatus ?? undefined}
                onValueChange={(v) => setFilterStatus(v === "all" ? null : v)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Conflict">Conflict</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filterType ?? undefined}
                onValueChange={(v) => setFilterType(v === "all" ? null : v)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Regular">Regular</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                  <SelectItem value="Early">Early</SelectItem>
                  <SelectItem value="Late">Late</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant={calendarView ? "default" : "outline"}
              onClick={() => setCalendarView((v) => !v)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {calendarView ? "List View" : "Calendar View"}
            </Button>
          </div>
          <Button onClick={handleOpenCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Create Schedule
          </Button>
        </div>

        {/* Today's Schedules */}
        {!calendarView ? (
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Schedules - January 25, 2024</CardTitle>
              <CardDescription>
                Employee schedules and assignments for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRecords.length === 0 && (
                  <div className="text-center text-gray-500">
                    No schedules found.
                  </div>
                )}
                {filteredRecords.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">
                              {schedule.employeeName}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {schedule.department}
                            </p>
                          </div>
                          <Badge
                            className={getStatusColor(schedule.status)}
                            variant="secondary"
                          >
                            {schedule.status}
                          </Badge>
                          <Badge
                            className={getTypeColor(schedule.type)}
                            variant="secondary"
                          >
                            {schedule.type}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-2" />
                            {schedule.startTime} - {schedule.endTime}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-2" />
                            Break: {schedule.breakTime}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            {schedule.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(schedule.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              }
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>Notes:</strong> {schedule.notes}
                        </p>
                        {schedule.conflict && (
                          <div className="flex items-center text-sm text-red-600 mb-2">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            <strong>Conflict:</strong> {schedule.conflict}
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditRecord(schedule)}
                          type="button"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </Button>
                        {schedule.status === "Conflict" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>Schedules grouped by date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Date</th>
                      <th className="border px-2 py-1">Employees</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(
                      filteredRecords.reduce((acc, rec) => {
                        if (!acc.has(rec.date)) acc.set(rec.date, []);
                        acc.get(rec.date).push(rec);
                        return acc;
                      }, new Map())
                    )
                      .sort((a, b) => a[0].localeCompare(b[0]))
                      .map(([date, recs]) => (
                        <tr key={date}>
                          <td className="border px-2 py-1 font-mono">
                            {new Date(date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </td>
                          <td className="border px-2 py-1">
                            {recs.map((r: ScheduleRecord) => (
                              <div key={r.id} className="mb-1">
                                <span className="font-medium">
                                  {r.employeeName}
                                </span>{" "}
                                <span className="text-xs text-gray-500">
                                  ({r.startTime}-{r.endTime})
                                </span>{" "}
                                <Badge
                                  className={getStatusColor(r.status)}
                                  variant="secondary"
                                >
                                  {r.status}
                                </Badge>
                              </div>
                            ))}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {filteredRecords.length === 0 && (
                  <div className="text-center text-gray-500 mt-4">
                    No schedules found.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Weekly Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule Overview</CardTitle>
            <CardDescription>
              Schedule overview for the current week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklySchedule.map((day, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{day.day}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(day.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {day.employees.length} employees
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {day.employees.map((employee, empIndex) => (
                      <div
                        key={empIndex}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <div>
                          <p className="font-medium text-sm">{employee.name}</p>
                          <p className="text-xs text-gray-600">
                            {employee.time}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-medium ${getAttendanceStatusColor(
                            employee.status
                          )}`}
                        >
                          {employee.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Schedule Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule Templates</CardTitle>
            <CardDescription>
              Pre-defined schedule templates for quick assignment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium mb-2">Standard 9-5</h4>
                <p className="text-sm text-gray-600 mb-2">09:00 - 17:00</p>
                <p className="text-xs text-gray-500">Regular office hours</p>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  Use Template
                </Button>
              </div>

              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium mb-2">Flexible Hours</h4>
                <p className="text-sm text-gray-600 mb-2">10:00 - 18:00</p>
                <p className="text-xs text-gray-500">Flexible start time</p>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  Use Template
                </Button>
              </div>

              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium mb-2">Early Shift</h4>
                <p className="text-sm text-gray-600 mb-2">08:30 - 16:30</p>
                <p className="text-xs text-gray-500">Early morning start</p>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  Use Template
                </Button>
              </div>

              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium mb-2">Late Shift</h4>
                <p className="text-sm text-gray-600 mb-2">14:00 - 22:00</p>
                <p className="text-xs text-gray-500">Evening hours</p>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  Use Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Schedule Record</DialogTitle>
              <DialogDescription>
                Update the schedule details for {editingRecord?.employeeName}
              </DialogDescription>
            </DialogHeader>
            {editingRecord && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeName">Employee Name</Label>
                  <Input
                    id="employeeName"
                    value={editingRecord.employeeName}
                    onChange={(e) =>
                      updateEditingRecord("employeeName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={editingRecord.department}
                    onChange={(e) =>
                      updateEditingRecord("department", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={editingRecord.date}
                    onChange={(e) =>
                      updateEditingRecord("date", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={editingRecord.startTime}
                    onChange={(e) =>
                      updateEditingRecord("startTime", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={editingRecord.endTime}
                    onChange={(e) =>
                      updateEditingRecord("endTime", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="breakTime">Break Time</Label>
                  <Input
                    id="breakTime"
                    value={editingRecord.breakTime}
                    onChange={(e) =>
                      updateEditingRecord("breakTime", e.target.value)
                    }
                    placeholder="12:00-13:00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={editingRecord.location}
                    onChange={(e) =>
                      updateEditingRecord("location", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editingRecord.status}
                    onValueChange={(value) =>
                      updateEditingRecord("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Conflict">Conflict</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Schedule Type</Label>
                  <Select
                    value={editingRecord.type}
                    onValueChange={(value) =>
                      updateEditingRecord("type", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Regular">Regular</SelectItem>
                      <SelectItem value="Flexible">Flexible</SelectItem>
                      <SelectItem value="Early">Early</SelectItem>
                      <SelectItem value="Late">Late</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    value={editingRecord.notes}
                    onChange={(e) =>
                      updateEditingRecord("notes", e.target.value)
                    }
                    placeholder="Additional notes..."
                  />
                </div>
                {editingRecord.conflict && (
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <Label htmlFor="conflict">Conflict Details</Label>
                    <Input
                      id="conflict"
                      value={editingRecord.conflict}
                      onChange={(e) =>
                        updateEditingRecord("conflict", e.target.value)
                      }
                      placeholder="Conflict description..."
                    />
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Schedule</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new schedule
              </DialogDescription>
            </DialogHeader>
            {editingRecord && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeName">Employee Name</Label>
                  <Input
                    id="employeeName"
                    value={editingRecord.employeeName}
                    onChange={(e) =>
                      updateEditingRecord("employeeName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={editingRecord.department}
                    onChange={(e) =>
                      updateEditingRecord("department", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={editingRecord.date}
                    onChange={(e) =>
                      updateEditingRecord("date", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={editingRecord.startTime}
                    onChange={(e) =>
                      updateEditingRecord("startTime", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={editingRecord.endTime}
                    onChange={(e) =>
                      updateEditingRecord("endTime", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="breakTime">Break Time</Label>
                  <Input
                    id="breakTime"
                    value={editingRecord.breakTime}
                    onChange={(e) =>
                      updateEditingRecord("breakTime", e.target.value)
                    }
                    placeholder="12:00-13:00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={editingRecord.location}
                    onChange={(e) =>
                      updateEditingRecord("location", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editingRecord.status}
                    onValueChange={(value) =>
                      updateEditingRecord("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Conflict">Conflict</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Schedule Type</Label>
                  <Select
                    value={editingRecord.type}
                    onValueChange={(value) =>
                      updateEditingRecord("type", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Regular">Regular</SelectItem>
                      <SelectItem value="Flexible">Flexible</SelectItem>
                      <SelectItem value="Early">Early</SelectItem>
                      <SelectItem value="Late">Late</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    value={editingRecord.notes}
                    onChange={(e) =>
                      updateEditingRecord("notes", e.target.value)
                    }
                    placeholder="Additional notes..."
                  />
                </div>
                {editingRecord.conflict && (
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <Label htmlFor="conflict">Conflict Details</Label>
                    <Input
                      id="conflict"
                      value={editingRecord.conflict}
                      onChange={(e) =>
                        updateEditingRecord("conflict", e.target.value)
                      }
                      placeholder="Conflict description..."
                    />
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingRecord(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveCreate}>Create Schedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
