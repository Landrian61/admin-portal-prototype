export interface Task {
  name: string;
  status: "completed" | "in-progress" | "pending";
  dueDate: string;
}

export interface Employee {
  id: number;
  employeeName: string;
  position: string;
  email: string;
  phone: string;
  startDate: string;
  status: string;
  progress: number;
  tasks: Task[];
}

export const onboardingTasks: Employee[] = [
  {
    id: 1,
    employeeName: "Alice Johnson",
    position: "Software Engineer",
    email: "alice.johnson@aibos.com",
    phone: "+1 (555) 123-4567",
    startDate: "2024-01-15",
    status: "In Progress",
    progress: 75,
    tasks: [
      { name: "Complete React training", status: "completed", dueDate: "2024-02-28" },
      { name: "Lead first project", status: "in-progress", dueDate: "2024-04-01" },
      { name: "Mentor junior developer", status: "pending", dueDate: "2024-04-10" }
    ]
  },
  {
    id: 2,
    employeeName: "Bob Smith",
    position: "Product Manager",
    email: "bob.smith@aibos.com",
    phone: "+1 (555) 234-5678",
    startDate: "2024-02-01",
    status: "In Progress",
    progress: 60,
    tasks: [
      { name: "Complete product management certification", status: "in-progress", dueDate: "2024-03-30" },
      { name: "Launch first feature", status: "pending", dueDate: "2024-04-15" },
      { name: "Establish stakeholder relationships", status: "in-progress", dueDate: "2024-04-30" }
    ]
  }
];