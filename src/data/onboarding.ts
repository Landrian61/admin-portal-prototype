export type Task = {
  name: string
  status: "completed" | "in-progress" | "pending"
  dueDate: string
}

export type Employee = {
  id: number
  employeeName: string
  position: string
  email: string
  phone: string
  startDate: string
  status: "completed" | "in-progress" | "not-started" | "overdue"
  progress: number
  tasks: Task[]
}

export const onboardingTasks: Employee[] = [
  {
    id: 1,
    employeeName: "Alice Johnson",
    position: "Software Engineer",
    email: "alice.johnson@company.com",
    phone: "+1 (555) 123-4567",
    startDate: "2024-02-01",
    status: "in-progress",
    progress: 45,
    tasks: [
      {
        name: "Complete paperwork",
        status: "completed",
        dueDate: "2024-01-30"
      },
      {
        name: "IT Setup",
        status: "in-progress",
        dueDate: "2024-02-02"
      },
      {
        name: "Team Introduction",
        status: "pending",
        dueDate: "2024-02-03"
      }
    ]
  },
  {
    id: 2,
    employeeName: "Bob Smith",
    position: "Product Manager",
    email: "bob.smith@company.com",
    phone: "+1 (555) 234-5678",
    startDate: "2024-02-05",
    status: "not-started",
    progress: 0,
    tasks: [
      {
        name: "Complete paperwork",
        status: "pending",
        dueDate: "2024-02-03"
      },
      {
        name: "IT Setup",
        status: "pending",
        dueDate: "2024-02-05"
      },
      {
        name: "Team Introduction",
        status: "pending",
        dueDate: "2024-02-07"
      }
    ]
  },
  {
    id: 3,
    employeeName: "Carol Davis",
    position: "UX Designer",
    email: "carol.davis@company.com",
    phone: "+1 (555) 345-6789",
    startDate: "2024-01-15",
    status: "completed",
    progress: 100,
    tasks: [
      {
        name: "Complete paperwork",
        status: "completed",
        dueDate: "2024-01-13"
      },
      {
        name: "IT Setup",
        status: "completed",
        dueDate: "2024-01-15"
      },
      {
        name: "Team Introduction",
        status: "completed",
        dueDate: "2024-01-17"
      }
    ]
  }
];