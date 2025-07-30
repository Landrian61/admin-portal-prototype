"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Building } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"


export default function CreateJobPage() {
  return (
    <MainLayout userRole="hr" title="Create Job Posting">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Job Posting</CardTitle>
            <CardDescription>Create and publish a new job opportunity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Title</label>
                <Input placeholder="e.g., Senior Software Engineer" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input placeholder="e.g., New York, NY" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Employment Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Salary Range */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Salary Range (Min)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input className="pl-10" placeholder="Minimum salary" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Salary Range (Max)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input className="pl-10" placeholder="Maximum salary" />
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Description</label>
              <Textarea 
                placeholder="Enter detailed job description..."
                className="min-h-[200px]"
              />
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Requirements</label>
              <Textarea 
                placeholder="Enter job requirements..."
                className="min-h-[150px]"
              />
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Benefits</label>
              <Textarea 
                placeholder="Enter job benefits..."
                className="min-h-[150px]"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={() => window.history.back()}>
                Cancel
              </Button>
              <Button>
                Publish Job Posting
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Job Posting Preview</CardTitle>
            <CardDescription>Preview how your job posting will appear</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gray-50 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Job Title</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-1" />
                      Department
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Location
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Employment Type
                </Badge>
              </div>
              <div className="border-t pt-4 text-sm text-gray-600">
                Job description and requirements will appear here...
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
