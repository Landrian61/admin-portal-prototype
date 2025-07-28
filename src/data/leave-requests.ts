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
];