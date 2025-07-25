"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, CheckCircle } from "lucide-react";

const allPermissions = [
  "User Management",
  "Project Management",
  "Team Lead",
  "Product Strategy",
  "Budget Management",
  "Design Review",
  "Creative Direction",
  "Data Access",
  "Analytics Tools",
  "Marketing Campaigns",
  "External Relations",
  "CRM Access",
  "Sales Reports",
  "Client Management",
  "Code Repository",
  "Development Tools",
  "Product Tools",
  "Analytics Access"
];

export default function AddUserPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <MainLayout userRole="hr" title="User Added">
        <div className="flex flex-col items-center justify-center py-16">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">User Added!</h2>
          <p className="text-gray-600 mb-6">The new user has been added (not persisted).</p>
          <Button onClick={() => router.push(`/hr/users`)} size="lg">
            Back to User Management
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout userRole="hr" title="Add User">
      <div className="max-w-xl mx-auto space-y-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
            <CardDescription>Enter user details and assign permissions.</CardDescription>
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
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Position</label>
                <Input
                  value={position}
                  onChange={e => setPosition(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <Input
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Permissions</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {allPermissions.map((perm) => (
                    <label key={perm} className="flex items-center space-x-2">
                      <Checkbox
                        checked={permissions.includes(perm)}
                        onCheckedChange={checked => {
                          if (checked) {
                            setPermissions(prev => [...prev, perm]);
                          } else {
                            setPermissions(prev => prev.filter(p => p !== perm));
                          }
                        }}
                      />
                      <span className="text-sm">{perm}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Add User</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
} 