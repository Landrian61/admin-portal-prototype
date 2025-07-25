"use client"

import { format, parseISO } from "date-fns"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Calendar, Clock, User, CheckCircle, XCircle, AlertTriangle, Download } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export type LeaveRequest = {
  id: number;
  employeeName: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: string;
  appliedDate: string;
  approver: string;
  remainingBalance: number;
  rejectionReason?: string;
};

export const initialLeaveRequests: LeaveRequest[] = [
	{
		id: 1,
		employeeName: "Alice Johnson",
		department: "Engineering",
		leaveType: "Vacation",
		startDate: "2024-02-15",
		endDate: "2024-02-19",
		days: 5,
		reason: "Family vacation to Hawaii",
		status: "Pending",
		appliedDate: "2024-01-20",
		approver: "John Smith",
		remainingBalance: 15
	},
	{
		id: 2,
		employeeName: "Bob Smith",
		department: "Product",
		leaveType: "Sick Leave",
		startDate: "2024-01-25",
		endDate: "2024-01-26",
		days: 2,
		reason: "Medical appointment and recovery",
		status: "Approved",
		appliedDate: "2024-01-24",
		approver: "Sarah Wilson",
		remainingBalance: 8
	},
	{
		id: 3,
		employeeName: "Carol Davis",
		department: "Design",
		leaveType: "Personal",
		startDate: "2024-02-10",
		endDate: "2024-02-12",
		days: 3,
		reason: "Moving to new apartment",
		status: "Approved",
		appliedDate: "2024-01-28",
		approver: "Mike Johnson",
		remainingBalance: 7
	},
	{
		id: 4,
		employeeName: "David Wilson",
		department: "Analytics",
		leaveType: "Vacation",
		startDate: "2024-03-01",
		endDate: "2024-03-15",
		days: 15,
		reason: "Extended vacation to Europe",
		status: "Rejected",
		appliedDate: "2024-01-15",
		approver: "Lisa Chen",
		remainingBalance: 20,
		rejectionReason: "Conflicts with project deadline"
	},
	{
		id: 5,
		employeeName: "Emma Brown",
		department: "Marketing",
		leaveType: "Maternity",
		startDate: "2024-04-01",
		endDate: "2024-07-01",
		days: 90,
		reason: "Maternity leave",
		status: "Pending",
		appliedDate: "2024-01-30",
		approver: "Tom Anderson",
		remainingBalance: 90
	}
]

const leaveBalances = [
	{ employee: "Alice Johnson", vacation: 15, sick: 10, personal: 5 },
	{ employee: "Bob Smith", vacation: 12, sick: 8, personal: 3 },
	{ employee: "Carol Davis", vacation: 18, sick: 12, personal: 7 },
	{ employee: "David Wilson", vacation: 20, sick: 15, personal: 8 },
	{ employee: "Emma Brown", vacation: 22, sick: 10, personal: 6 }
]

const getStatusColor = (status: string) => {
	const colors: { [key: string]: string } = {
		"Pending": "bg-yellow-100 text-yellow-800",
		"Approved": "bg-green-100 text-green-800",
		"Rejected": "bg-red-100 text-red-800"
	}
	return colors[status] || "bg-gray-100 text-gray-800"
}

const getLeaveTypeColor = (type: string) => {
	const colors: { [key: string]: string } = {
		"Vacation": "bg-blue-100 text-blue-800",
		"Sick Leave": "bg-orange-100 text-orange-800",
		"Personal": "bg-purple-100 text-purple-800",
		"Maternity": "bg-pink-100 text-pink-800",
		"Paternity": "bg-indigo-100 text-indigo-800"
	}
	return colors[type] || "bg-gray-100 text-gray-800"
}

const formatDateString = (dateString: string) => {
	try {
		return format(parseISO(dateString), 'MMM dd, yyyy')
	} catch (error) {
		return dateString
	}
}

export default function LeaveManagementPage() {
	const router = useRouter()
	const [leaveRequestsState, setLeaveRequestsState] = useState(initialLeaveRequests)
	const [rejectingId, setRejectingId] = useState<number | null>(null)
	const [rejectionReason, setRejectionReason] = useState("")

	// Prevent background scroll when rejection dialog is open
	useEffect(() => {
		if (rejectingId !== null) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = ""
		}
		return () => {
			document.body.style.overflow = ""
		}
	}, [rejectingId])
	
	return (
		<MainLayout userRole="hr" title="Leave Management">
			<div className="space-y-6">
				{/* Header Actions */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
					<div className="flex items-center space-x-4">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
							<Input placeholder="Search leave requests..." className="pl-10 w-64" />
						</div>
						<Button variant="outline">
							<Filter className="w-4 h-4 mr-2" />
							Filter
						</Button>
						<Button variant="outline">
							<Calendar className="w-4 h-4 mr-2" />
							Calendar View
						</Button>
						<Button variant="outline">
							<Download className="w-4 h-4 mr-2" />
							Export
						</Button>
					</div>
				</div>

				{/* Leave Requests */}
				<Card>
					<CardHeader>
						<CardTitle>Leave Requests</CardTitle>
						<CardDescription>Manage employee leave requests and approvals</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{leaveRequestsState.map((request) => (
								<div key={request.id} className="border rounded-lg p-4 hover:bg-gray-50">
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center space-x-3 mb-2">
												<div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
													<User className="w-5 h-5 text-white" />
												</div>
												<div>
													<h4 className="font-medium">{request.employeeName}</h4>
													<p className="text-sm text-gray-600">{request.department}</p>
												</div>
												<Badge className={getLeaveTypeColor(request.leaveType)} variant="secondary">
													{request.leaveType}
												</Badge>
												<Badge className={getStatusColor(request.status)} variant="secondary">
													{request.status}
												</Badge>
											</div>
											
											<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
												<div className="flex items-center text-sm text-gray-600">
													<Calendar className="w-4 h-4 mr-2" />
													{formatDateString(request.startDate)} - {formatDateString(request.endDate)}
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
													<strong>Rejection Reason:</strong> {request.rejectionReason}
												</p>
											)}
											
											<p className="text-xs text-gray-500">
												Applied on {formatDateString(request.appliedDate)} • Approver: {request.approver}
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
																		? { ...r, status: "Approved", rejectionReason: undefined }
																		: r
																)
															)
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
															setRejectingId(request.id)
															setRejectionReason("")
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
												onClick={() => router.push(`/hr/leave/${request.id}`)}
											>
												View Details
											</Button>
										</div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Leave Balances */}
				<Card>
					<CardHeader>
						<CardTitle>Employee Leave Balances</CardTitle>
						<CardDescription>Current leave balances for all employees</CardDescription>
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
										<th className="text-left py-2">Actions</th>
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
													<span className="font-medium">{balance.employee}</span>
												</div>
											</td>
											<td className="py-3">
												<Badge variant="outline" className="bg-blue-50 text-blue-700">
													{balance.vacation} days
												</Badge>
											</td>
											<td className="py-3">
												<Badge variant="outline" className="bg-orange-50 text-orange-700">
													{balance.sick} days
												</Badge>
											</td>
											<td className="py-3">
												<Badge variant="outline" className="bg-purple-50 text-purple-700">
													{balance.personal} days
												</Badge>
											</td>
											<td className="py-3">
												<Button size="sm" variant="outline">
													Adjust Balance
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</CardContent>
				</Card>

				{/* Quick Stats */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Card>
						<CardContent className="p-4">
							<div className="text-center">
								<div className="text-2xl font-bold text-yellow-600">2</div>
								<div className="text-sm text-gray-600">Pending Requests</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="text-center">
								<div className="text-2xl font-bold text-green-600">2</div>
								<div className="text-sm text-gray-600">Approved</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="text-center">
								<div className="text-2xl font-bold text-red-600">1</div>
								<div className="text-sm text-gray-600">Rejected</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="text-center">
								<div className="text-2xl font-bold text-blue-600">105</div>
								<div className="text-sm text-gray-600">Total Days Requested</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Rejection Reason Dialog */}
				{rejectingId !== null && (
					<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
						<div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
							<h3 className="text-lg font-semibold mb-2">Reject Leave Request</h3>
							<label className="block text-sm mb-1">Reason for rejection:</label>
							<textarea
								className="w-full border rounded p-2 mb-4"
								rows={3}
								value={rejectionReason}
								onChange={e => setRejectionReason(e.target.value)}
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
													? { ...r, status: "Rejected", rejectionReason: rejectionReason || "Rejected by admin" }
													: r
											)
										)
										setRejectingId(null)
									}}
									disabled={!rejectionReason.trim()}
								>
									Confirm Reject
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</MainLayout>
	)
}

