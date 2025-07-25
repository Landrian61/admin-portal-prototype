"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, Users, Video, MapPin, FileText } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function ScheduleInterviewPage() {
  return (
    <MainLayout userRole="hr" title="Schedule Interview">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Interview</CardTitle>
            <CardDescription>Schedule an interview with a candidate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Candidate Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Candidate</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select candidate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alice">Alice Johnson - Software Engineer</SelectItem>
                  <SelectItem value="bob">Bob Smith - Product Manager</SelectItem>
                  <SelectItem value="carol">Carol Davis - UX Designer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Interview Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Interview Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select interview type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Interview</SelectItem>
                  <SelectItem value="behavioral">Behavioral Interview</SelectItem>
                  <SelectItem value="cultural">Cultural Fit</SelectItem>
                  <SelectItem value="final">Final Interview</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Interviewer Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Interviewer</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select interviewer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Smith - Senior Engineer</SelectItem>
                  <SelectItem value="sarah">Sarah Wilson - Engineering Manager</SelectItem>
                  <SelectItem value="mike">Mike Johnson - Tech Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input type="date" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input type="time" className="pl-10" />
                </div>
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location/Mode */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Interview Mode</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inperson">In-Person</SelectItem>
                  <SelectItem value="video">Video Call</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Interview Notes</label>
              <Textarea 
                placeholder="Add any specific instructions or topics to cover..."
                className="min-h-[100px]"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={() => window.history.back()}>
                Cancel
              </Button>
              <Button>
                Schedule Interview
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Interview Preview</CardTitle>
            <CardDescription>Preview of the scheduled interview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Users className="w-4 h-4" />
                <span>Technical Interview - Software Engineer Position</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Date and time will appear here</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Video className="w-4 h-4" />
                <span>Interview mode will appear here</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Location details will appear here</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <FileText className="w-4 h-4" />
                <span>Notes and instructions will appear here</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
