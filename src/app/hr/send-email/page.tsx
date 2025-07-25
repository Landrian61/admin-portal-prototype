"use client"

import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Users, Paperclip, Send } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function SendEmailPage() {
  const router = useRouter()
  
  return (
    <MainLayout userRole="hr" title="Send Email">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Compose Email</CardTitle>
            <CardDescription>Send email to candidates or team members</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Template Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Template</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interview">Interview Invitation</SelectItem>
                  <SelectItem value="offer">Job Offer</SelectItem>
                  <SelectItem value="rejection">Application Status</SelectItem>
                  <SelectItem value="custom">Custom Template</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Recipients */}
            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alice">Alice Johnson - Software Engineer</SelectItem>
                  <SelectItem value="bob">Bob Smith - Product Manager</SelectItem>
                  <SelectItem value="carol">Carol Davis - UX Designer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="Enter email subject" />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea 
                placeholder="Type your message here..."
                className="min-h-[200px]"
              />
            </div>

            {/* Attachments */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Attachments</label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <Button variant="outline">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Add Attachment
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={() => window.history.back()}>
                Cancel
              </Button>
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Email Preview</CardTitle>
            <CardDescription>Preview how your email will look</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gray-50 rounded-lg space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">To: [Recipient Name]</p>
                <p className="text-sm text-gray-600">Subject: [Email Subject]</p>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">Message content will appear here...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
