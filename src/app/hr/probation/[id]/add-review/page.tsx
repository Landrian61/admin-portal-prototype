"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle } from "lucide-react";

const probationEmployees = [
  {
    id: 1,
    employeeName: "Alice Johnson",
    position: "Software Engineer",
    department: "Engineering",
  },
  {
    id: 2,
    employeeName: "Bob Smith",
    position: "Product Manager",
    department: "Product",
  },
  {
    id: 3,
    employeeName: "Carol Davis",
    position: "UX Designer",
    department: "Design",
  },
  {
    id: 4,
    employeeName: "David Wilson",
    position: "Data Analyst",
    department: "Analytics",
  },
];

export default function AddReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const employee = probationEmployees.find((e) => e.id === Number(id));

  const [date, setDate] = useState("");
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!employee) {
    return (
      <MainLayout userRole="hr" title="Add Review">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Employee not found</h2>
          <Button onClick={() => router.back()} size="lg">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </MainLayout>
    );
  }

  if (submitted) {
    return (
      <MainLayout userRole="hr" title="Review Submitted">
        <div className="flex flex-col items-center justify-center py-16">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Review Submitted!</h2>
          <p className="text-gray-600 mb-6">The review for {employee.employeeName} has been recorded (not persisted).</p>
          <Button onClick={() => router.push(`/hr/probation/${employee.id}`)} size="lg">
            Back to Probation Details
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout userRole="hr" title={`Add Review: ${employee.employeeName}`}>
      <div className="max-w-xl mx-auto space-y-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Add Review for {employee.employeeName}</CardTitle>
            <CardDescription>{employee.position} • {employee.department}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form
              onSubmit={e => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Review Date</label>
                <Input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Feedback</label>
                <Textarea
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Submit Review</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
} 