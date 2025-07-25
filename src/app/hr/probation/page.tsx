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
  Plus,
  Search,
  Filter,
  User,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Edit,
  Download,
} from "lucide-react";
import { useRouter } from "next/navigation";

const probationEmployees = [
  {
    id: 1,
    employeeName: "Alice Johnson",
    position: "Software Engineer",
    department: "Engineering",
    startDate: "2024-01-15",
    probationEndDate: "2024-04-15",
    daysRemaining: 45,
    status: "Active",
    progress: 75,
    supervisor: "John Smith",
    reviews: [
      {
        date: "2024-02-15",
        rating: 4,
        feedback: "Excellent technical skills, good team collaboration",
      },
      {
        date: "2024-03-15",
        rating: 4,
        feedback: "Consistent performance, meeting all expectations",
      },
    ],
    goals: [
      {
        goal: "Complete React training",
        status: "completed",
        dueDate: "2024-02-28",
      },
      {
        goal: "Lead first project",
        status: "in-progress",
        dueDate: "2024-04-01",
      },
      {
        goal: "Mentor junior developer",
        status: "pending",
        dueDate: "2024-04-10",
      },
    ],
  },
  {
    id: 2,
    employeeName: "Bob Smith",
    position: "Product Manager",
    department: "Product",
    startDate: "2024-02-01",
    probationEndDate: "2024-05-01",
    daysRemaining: 62,
    status: "Active",
    progress: 60,
    supervisor: "Sarah Wilson",
    reviews: [
      {
        date: "2024-03-01",
        rating: 3,
        feedback:
          "Good understanding of product requirements, needs improvement in stakeholder communication",
      },
    ],
    goals: [
      {
        goal: "Complete product management certification",
        status: "in-progress",
        dueDate: "2024-03-30",
      },
      {
        goal: "Launch first feature",
        status: "pending",
        dueDate: "2024-04-15",
      },
      {
        goal: "Establish stakeholder relationships",
        status: "in-progress",
        dueDate: "2024-04-30",
      },
    ],
  },
  {
    id: 3,
    employeeName: "Carol Davis",
    position: "UX Designer",
    department: "Design",
    startDate: "2023-11-01",
    probationEndDate: "2024-02-01",
    daysRemaining: 0,
    status: "Completed",
    progress: 100,
    supervisor: "Mike Johnson",
    reviews: [
      {
        date: "2023-12-01",
        rating: 5,
        feedback: "Outstanding design skills and user research capabilities",
      },
      {
        date: "2024-01-01",
        rating: 5,
        feedback: "Exceeded expectations, ready for permanent position",
      },
    ],
    goals: [
      {
        goal: "Complete design system documentation",
        status: "completed",
        dueDate: "2023-12-15",
      },
      {
        goal: "Lead user research project",
        status: "completed",
        dueDate: "2024-01-15",
      },
      {
        goal: "Mentor design intern",
        status: "completed",
        dueDate: "2024-01-30",
      },
    ],
  },
  {
    id: 4,
    employeeName: "David Wilson",
    position: "Data Analyst",
    department: "Analytics",
    startDate: "2024-01-08",
    probationEndDate: "2024-04-08",
    daysRemaining: 38,
    status: "At Risk",
    progress: 45,
    supervisor: "Lisa Chen",
    reviews: [
      {
        date: "2024-02-08",
        rating: 2,
        feedback:
          "Struggling with advanced analytics tools, needs additional training",
      },
      {
        date: "2024-03-08",
        rating: 3,
        feedback: "Some improvement shown, but still below expectations",
      },
    ],
    goals: [
      {
        goal: "Complete SQL advanced training",
        status: "in-progress",
        dueDate: "2024-03-30",
      },
      {
        goal: "Deliver first analytics report",
        status: "pending",
        dueDate: "2024-04-05",
      },
      {
        goal: "Improve data visualization skills",
        status: "pending",
        dueDate: "2024-04-08",
      },
    ],
  },
];

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    Active: "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    "At Risk": "bg-red-100 text-red-800",
    Extended: "bg-yellow-100 text-yellow-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const getGoalStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case "in-progress":
      return <Clock className="w-4 h-4 text-blue-600" />;
    case "pending":
      return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    default:
      return <Clock className="w-4 h-4 text-gray-400" />;
  }
};

const getRatingColor = (rating: number) => {
  if (rating >= 4) return "text-green-600";
  if (rating >= 3) return "text-yellow-600";
  return "text-red-600";
};

export default function ProbationPage() {
  const router = useRouter();
  return (
    <MainLayout userRole="hr" title="Probation Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search employees..." className="pl-10 w-64" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Review
          </Button>
        </div>

        {/* Probation Employee Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {probationEmployees.map((employee) => (
            <Card
              key={employee.id}
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
                        {employee.employeeName}
                      </CardTitle>
                      <CardDescription>
                        {employee.position} • {employee.department}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge
                    className={getStatusColor(employee.status)}
                    variant="secondary"
                  >
                    {employee.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Probation Timeline */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Start: {new Date(employee.startDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    End:{" "}
                    {new Date(employee.probationEndDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Days Remaining */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Days Remaining
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      employee.daysRemaining <= 30
                        ? "text-red-600"
                        : "text-gray-900"
                    }`}
                  >
                    {employee.daysRemaining > 0
                      ? `${employee.daysRemaining} days`
                      : "Completed"}
                  </span>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Overall Progress
                    </span>
                    <span className="text-sm text-gray-600">
                      {employee.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        employee.progress >= 80
                          ? "bg-green-500"
                          : employee.progress >= 60
                          ? "bg-blue-500"
                          : employee.progress >= 40
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${employee.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Supervisor */}
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  Supervisor: {employee.supervisor}
                </div>

                {/* Latest Review */}
                {employee.reviews.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Latest Review:
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">
                          {new Date(
                            employee.reviews[employee.reviews.length - 1].date
                          ).toLocaleDateString()}
                        </span>
                        <span
                          className={`text-sm font-bold ${getRatingColor(
                            employee.reviews[employee.reviews.length - 1].rating
                          )}`}
                        >
                          {employee.reviews[employee.reviews.length - 1].rating}
                          /5
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">
                        {employee.reviews[employee.reviews.length - 1].feedback}
                      </p>
                    </div>
                  </div>
                )}

                {/* Goals Progress */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Goals Progress:
                  </p>
                  <div className="space-y-2">
                    {employee.goals.slice(0, 3).map((goal, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center space-x-2">
                          {getGoalStatusIcon(goal.status)}
                          <span
                            className={
                              goal.status === "completed"
                                ? "line-through text-gray-500"
                                : ""
                            }
                          >
                            {goal.goal}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(goal.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.push(`/hr/probation/${employee.id}`)}
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Add Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2</div>
                <div className="text-sm text-gray-600">Active Probation</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">1</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">1</div>
                <div className="text-sm text-gray-600">At Risk</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">0</div>
                <div className="text-sm text-gray-600">Extended</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Reviews</CardTitle>
            <CardDescription>
              Scheduled probation reviews for the next 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Alice Johnson</p>
                    <p className="text-sm text-gray-600">
                      3-month review • Due: March 15, 2024
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Schedule Review
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">David Wilson</p>
                    <p className="text-sm text-gray-600">
                      Final review • Due: April 8, 2024
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Schedule Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
