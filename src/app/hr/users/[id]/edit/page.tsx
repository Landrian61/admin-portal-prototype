"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, CheckCircle } from "lucide-react";

const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@aibos.com",
    position: "Engineering Manager",
    department: "Engineering",
    permissions: ["User Management", "Project Management", "Team Lead"]
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.wilson@aibos.com",
    position: "Product Director",
    department: "Product",
    permissions: ["Product Strategy", "User Management", "Budget Management"]
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@aibos.com",
    position: "Design Lead",
    department: "Design",
    permissions: ["Design Review", "Team Lead", "Creative Direction"]
  },
  {
    id: 4,
    name: "Lisa Chen",
    email: "lisa.chen@aibos.com",
    position: "Data Science Manager",
    department: "Analytics",
    permissions: ["Data Access", "Analytics Tools", "Team Lead"]
  },
  {
    id: 5,
    name: "Tom Anderson",
    email: "tom.anderson@aibos.com",
    position: "Marketing Director",
    department: "Marketing",
    permissions: ["Marketing Campaigns", "Budget Management", "External Relations"]
  },
  {
    id: 6,
    name: "Jane Davis",
    email: "jane.davis@aibos.com",
    position: "Sales Manager",
    department: "Sales",
    permissions: ["CRM Access", "Sales Reports", "Client Management"]
  },
  {
    id: 7,
    name: "Alice Johnson",
    email: "alice.johnson@aibos.com",
    position: "Software Engineer",
    department: "Engineering",
    permissions: ["Code Repository", "Development Tools"]
  },
  {
    id: 8,
    name: "Bob Smith",
    email: "bob.smith@aibos.com",
    position: "Product Manager",
    department: "Product",
    permissions: ["Product Tools", "Analytics Access"]
  }
];

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

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const user = users.find((u) => u.id === Number(id));
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(user ? user.permissions : []);
  const [submitted, setSubmitted] = useState(false);

  if (!user) {
    return (
      <MainLayout userRole="hr" title="Edit User">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">User not found</h2>
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
      <MainLayout userRole="hr" title="Permissions Updated">
        <div className="flex flex-col items-center justify-center py-16">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Permissions Updated!</h2>
          <p className="text-gray-600 mb-6">Permissions for {user.name} have been updated (not persisted).</p>
          <Button onClick={() => router.push(`/hr/users`)} size="lg">
            Back to User Management
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout userRole="hr" title={`Edit Permissions: ${user.name}`}>
      <div className="max-w-xl mx-auto space-y-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Edit Permissions for {user.name}</CardTitle>
            <CardDescription>{user.position} • {user.department}</CardDescription>
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
                <label className="block text-sm font-medium mb-2">Permissions</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {allPermissions.map((perm) => (
                    <label key={perm} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedPermissions.includes(perm)}
                        onCheckedChange={checked => {
                          if (checked) {
                            setSelectedPermissions(prev => [...prev, perm]);
                          } else {
                            setSelectedPermissions(prev => prev.filter(p => p !== perm));
                          }
                        }}
                      />
                      <span className="text-sm">{perm}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
} 