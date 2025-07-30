"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddOnboardingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    employeeName: "",
    position: "",
    email: "",
    phone: "",
    startDate: "",
    status: "not-started",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the data to your backend or update state
  };

  return (
    <MainLayout userRole="hr" title="Start Onboarding">
      <div className="max-w-xl mx-auto mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Start New Employee Onboarding</CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center space-y-4">
                <div className="text-green-600 font-semibold text-lg">Onboarding started successfully!</div>
                <Button onClick={() => router.push("/hr/onboarding")}>Back to Onboarding List</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Employee Name</label>
                  <Input name="employeeName" value={form.employeeName} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Position</label>
                  <Input name="position" value={form.position} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <Input name="phone" value={form.phone} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <Input name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select name="status" className="w-full border rounded px-2 py-1" value={form.status} onChange={handleChange}>
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
                <Button type="submit" className="w-full mt-2">Start Onboarding</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
} 