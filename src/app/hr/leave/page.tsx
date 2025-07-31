"use client";

import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  addDays,
  subDays,
} from "date-fns";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  List,
  Grid,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { initialLeaveRequests, LeaveRequest } from "@/data/leave-requests";

const leaveBalances = [
  { employee: "Alice Johnson", vacation: 15, sick: 10, personal: 5 },
  { employee: "Bob Smith", vacation: 12, sick: 8, personal: 3 },
  { employee: "Carol Davis", vacation: 18, sick: 12, personal: 7 },
  { employee: "David Wilson", vacation: 20, sick: 15, personal: 8 },
  { employee: "Emma Brown", vacation: 22, sick: 10, personal: 6 },
];

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    Pending: "bg-yellow-100 text-yellow-800",
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const getLeaveTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    Vacation: "bg-blue-100 text-blue-800",
    "Sick Leave": "bg-orange-100 text-orange-800",
    Personal: "bg-purple-100 text-purple-800",
    Maternity: "bg-pink-100 text-pink-800",
    Paternity: "bg-indigo-100 text-indigo-800",
  };
  return colors[type] || "bg-gray-100 text-gray-800";
};

const formatDateString = (dateString: string) => {
  try {
    return format(parseISO(dateString), "MMM dd, yyyy");
  } catch {
    return dateString;
  }
};

const getLeaveRequestsForDate = (date: Date, requests: LeaveRequest[]) => {
  return requests.filter((request) => {
    try {
      const startDate = parseISO(request.startDate);
      const endDate = parseISO(request.endDate);
      return isWithinInterval(date, { start: startDate, end: endDate });
    } catch {
      return false;
    }
  });
};

interface CalendarViewProps {
  requests: LeaveRequest[];
  currentDate: Date;
  onDateClick: (date: Date) => void;
}

const CalendarView = ({
  requests,
  currentDate,
  onDateClick,
}: CalendarViewProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(currentDate));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  // Get the first day of the calendar grid (previous month's days to fill first week)
  const calendarStart = subDays(monthStart, monthStart.getDay());

  // Get all days for the calendar grid
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: monthEnd,
  });

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="outline" size="sm" onClick={prevMonth}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h3 className="text-lg font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <Button variant="outline" size="sm" onClick={nextMonth}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="bg-gray-50 p-2 text-center text-sm font-medium"
          >
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
          const isToday = isSameDay(day, new Date());
          const dayRequests = getLeaveRequestsForDate(day, requests);

          return (
            <div
              key={index}
              className={`min-h-[80px] p-1 bg-white cursor-pointer hover:bg-gray-50 ${
                !isCurrentMonth ? "text-gray-400" : ""
              }`}
              onClick={() => onDateClick(day)}
            >
              <div
                className={`text-sm p-1 ${
                  isToday
                    ? "bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    : ""
                }`}
              >
                {day.getDate()}
              </div>
              <div className="space-y-1">
                {dayRequests.slice(0, 2).map((request) => (
                  <div
                    key={request.id}
                    className={`text-xs p-1 rounded truncate ${
                      request.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : request.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                    title={`${request.employeeName} - ${request.leaveType}`}
                  >
                    {request.employeeName.split(" ")[0]} - {request.leaveType}
                  </div>
                ))}
                {dayRequests.length > 2 && (
                  <div className="text-xs text-gray-500 text-center">
                    +{dayRequests.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface DateDetailModalProps {
  date: Date | null;
  requests: LeaveRequest[];
  isOpen: boolean;
  onClose: () => void;
}

const DateDetailModal = ({
  date,
  requests,
  isOpen,
  onClose,
}: DateDetailModalProps) => {
  if (!date) return null;

  const dayRequests = getLeaveRequestsForDate(date, requests);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Leave Requests for {format(date, "EEEE, MMMM dd, yyyy")}
          </DialogTitle>
          <DialogDescription>
            {dayRequests.length} leave request
            {dayRequests.length !== 1 ? "s" : ""} on this date
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {dayRequests.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No leave requests for this date
            </p>
          ) : (
            dayRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{request.employeeName}</h4>
                        <p className="text-sm text-gray-600">
                          {request.department}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge
                        className={getLeaveTypeColor(request.leaveType)}
                        variant="secondary"
                      >
                        {request.leaveType}
                      </Badge>
                      <Badge
                        className={getStatusColor(request.status)}
                        variant="secondary"
                      >
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{request.reason}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {formatDateString(request.startDate)} -{" "}
                    {formatDateString(request.endDate)} ({request.days} days)
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function LeaveManagementPage() {
  const router = useRouter();
  const [leaveRequestsState, setLeaveRequestsState] =
    useState(initialLeaveRequests);
  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [leaveTypeFilter, setLeaveTypeFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // View states
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  // Prevent background scroll when rejection dialog is open
  useEffect(() => {
    if (rejectingId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [rejectingId]);

  // Filtered requests
  const filteredRequests = leaveRequestsState.filter((request) => {
    const matchesSearch =
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : request.status === statusFilter;
    const matchesLeaveType =
      leaveTypeFilter === "all" ? true : request.leaveType === leaveTypeFilter;
    const matchesDepartment =
      departmentFilter === "all"
        ? true
        : request.department === departmentFilter;

    return (
      matchesSearch && matchesStatus && matchesLeaveType && matchesDepartment
    );
  });

  // Export to CSV
  const handleExport = () => {
    const header = [
      "Employee Name",
      "Department",
      "Leave Type",
      "Start Date",
      "End Date",
      "Days",
      "Status",
      "Reason",
      "Applied Date",
      "Approver",
      "Remaining Balance",
    ];

    const rows = filteredRequests.map((request) => [
      request.employeeName,
      request.department,
      request.leaveType,
      request.startDate,
      request.endDate,
      request.days.toString(),
      request.status,
      request.reason,
      request.appliedDate,
      request.approver,
      request.remainingBalance.toString(),
    ]);

    const csvContent = [header, ...rows]
      .map((r) => r.map((x) => `"${x}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leave_requests_${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsDateModalOpen(true);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setLeaveTypeFilter("all");
    setDepartmentFilter("all");
  };

  return (
    <MainLayout userRole="hr" title="Leave Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search leave requests..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={leaveTypeFilter} onValueChange={setLeaveTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Vacation">Vacation</SelectItem>
                <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Maternity">Maternity</SelectItem>
                <SelectItem value="Paternity">Paternity</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Dept" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Depts</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Analytics">Analytics</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>

            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("calendar")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Calendar
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {
                    leaveRequestsState.filter((r) => r.status === "Pending")
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600">Pending Requests</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {
                    leaveRequestsState.filter((r) => r.status === "Approved")
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {
                    leaveRequestsState.filter((r) => r.status === "Rejected")
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600">Rejected</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {leaveRequestsState.reduce((sum, r) => sum + r.days, 0)}
                </div>
                <div className="text-sm text-gray-600">
                  Total Days Requested
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* View Mode Content */}
        {viewMode === "calendar" ? (
          <CalendarView
            requests={filteredRequests}
            currentDate={new Date()}
            onDateClick={handleDateClick}
          />
        ) : (
          /* List View */
          <Card>
            <CardHeader>
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>
                Manage employee leave requests and approvals (
                {filteredRequests.length} requests)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No leave requests found matching your criteria
                  </div>
                ) : (
                  filteredRequests.map((request) => (
                    <div
                      key={request.id}
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
                                {request.employeeName}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {request.department}
                              </p>
                            </div>
                            <Badge
                              className={getLeaveTypeColor(request.leaveType)}
                              variant="secondary"
                            >
                              {request.leaveType}
                            </Badge>
                            <Badge
                              className={getStatusColor(request.status)}
                              variant="secondary"
                            >
                              {request.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="w-4 h-4 mr-2" />
                              {formatDateString(request.startDate)} -{" "}
                              {formatDateString(request.endDate)}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="w-4 h-4 mr-2" />
                              {request.days} days
                            </div>
                            <div className="text-sm text-gray-600">
                              Remaining: {request.remainingBalance} days
                            </div>
                          </div>

                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Reason:</strong> {request.reason}
                          </p>

                          {request.rejectionReason && (
                            <p className="text-sm text-red-600 mb-2">
                              <strong>Rejection Reason:</strong>{" "}
                              {request.rejectionReason}
                            </p>
                          )}

                          <p className="text-xs text-gray-500">
                            Applied on {formatDateString(request.appliedDate)} •
                            Approver: {request.approver}
                          </p>
                        </div>

                        <div className="flex space-x-2 ml-4">
                          {request.status === "Pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600 hover:text-green-700"
                                onClick={() => {
                                  setLeaveRequestsState((prev) =>
                                    prev.map((r) =>
                                      r.id === request.id
                                        ? {
                                            ...r,
                                            status: "Approved",
                                            rejectionReason: undefined,
                                          }
                                        : r
                                    )
                                  );
                                }}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => {
                                  setRejectingId(request.id);
                                  setRejectionReason("");
                                }}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              router.push(`/hr/leave/${request.id}`)
                            }
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leave Balances */}
        <Card>
          <CardHeader>
            <CardTitle>Employee Leave Balances</CardTitle>
            <CardDescription>
              Current leave balances for all employees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Employee</th>
                    <th className="text-left py-2">Vacation Days</th>
                    <th className="text-left py-2">Sick Days</th>
                    <th className="text-left py-2">Personal Days</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveBalances.map((balance, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium">
                            {balance.employee}
                          </span>
                        </div>
                      </td>
                      <td className="py-3">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700"
                        >
                          {balance.vacation} days
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Badge
                          variant="outline"
                          className="bg-orange-50 text-orange-700"
                        >
                          {balance.sick} days
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Badge
                          variant="outline"
                          className="bg-purple-50 text-purple-700"
                        >
                          {balance.personal} days
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Rejection Reason Dialog */}
        {rejectingId !== null && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-2">
                Reject Leave Request
              </h3>
              <label className="block text-sm mb-1">
                Reason for rejection:
              </label>
              <textarea
                className="w-full border rounded p-2 mb-4"
                rows={3}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setRejectingId(null)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => {
                    setLeaveRequestsState((prev) =>
                      prev.map((r) =>
                        r.id === rejectingId
                          ? {
                              ...r,
                              status: "Rejected",
                              rejectionReason:
                                rejectionReason || "Rejected by admin",
                            }
                          : r
                      )
                    );
                    setRejectingId(null);
                  }}
                  disabled={!rejectionReason.trim()}
                >
                  Confirm Reject
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Date Detail Modal */}
        <DateDetailModal
          date={selectedDate}
          requests={leaveRequestsState}
          isOpen={isDateModalOpen}
          onClose={() => {
            setIsDateModalOpen(false);
            setSelectedDate(null);
          }}
        />
      </div>
    </MainLayout>
  );
}
