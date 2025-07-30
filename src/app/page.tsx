import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">AIBOS</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">GA-HR Administration Portal</h2>
          <p className="text-gray-600">Select your role to access the appropriate dashboard</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* HR Portal */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle>HR Portal</CardTitle>
              <CardDescription>
                Manage hiring processes, employee onboarding, leave management, and probation tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div>• Hiring Process Management</div>
                <div>• Employee Onboarding</div>
                <div>• Leave Management</div>
                <div>• Probation Management</div>
              </div>
              <Link href="/hr">
                <Button className="w-full">Access HR Portal</Button>
              </Link>
            </CardContent>
          </Card>

          {/* GA Portal */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <CardTitle>GA Portal</CardTitle>
              <CardDescription>
                Handle schedule management, attendance monitoring, and cleaning management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div>• Schedule Management</div>
                <div>• Attendance Monitoring</div>
                <div>• Cleaning Management</div>
                <div>• Reports & Analytics</div>
              </div>
              <Link href="/ga">
                <Button className="w-full">Access GA Portal</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Admin Portal */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Admin Portal</CardTitle>
              <CardDescription>
                Manage users, access control, system settings, and maintenance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div>• User Management</div>
                <div>• Access Control</div>
                <div>• System Settings</div>
                <div>• System Monitoring</div>
              </div>
              <Link href="/admin">
                <Button className="w-full">Access Admin Portal</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}