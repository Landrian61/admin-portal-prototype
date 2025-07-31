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

export interface OnboardingTemplate {
  id: string;
  name: string;
  description: string;
  category: "engineering" | "management" | "general" | "sales" | "marketing" | "operations";
  estimatedDuration: string;
  taskCount: number;
  icon: string;
  tasks: {
    name: string;
    description: string;
    category: "setup" | "training" | "compliance" | "integration" | "review";
    estimatedDays: number;
    required: boolean;
  }[];
}

export const onboardingTemplates: OnboardingTemplate[] = [
  {
    id: "engineering",
    name: "Engineering Template",
    description: "Standard onboarding for software engineers including technical setup and code access.",
    category: "engineering",
    estimatedDuration: "2-3 weeks",
    taskCount: 12,
    icon: "Code",
    tasks: [
      {
        name: "IT Account Setup",
        description: "Create email, Slack, and development accounts",
        category: "setup",
        estimatedDays: 1,
        required: true
      },
      {
        name: "Development Environment",
        description: "Install required software and configure development tools",
        category: "setup",
        estimatedDays: 2,
        required: true
      },
      {
        name: "Code Repository Access",
        description: "Grant access to relevant repositories and set up SSH keys",
        category: "setup",
        estimatedDays: 1,
        required: true
      },
      {
        name: "Code Review Process",
        description: "Learn the code review workflow and best practices",
        category: "training",
        estimatedDays: 3,
        required: true
      },
      {
        name: "Testing Standards",
        description: "Understand testing requirements and frameworks",
        category: "training",
        estimatedDays: 2,
        required: true
      },
      {
        name: "Security Training",
        description: "Complete security awareness and data protection training",
        category: "compliance",
        estimatedDays: 1,
        required: true
      },
      {
        name: "Team Introduction",
        description: "Meet with team members and understand roles",
        category: "integration",
        estimatedDays: 2,
        required: true
      },
      {
        name: "First Code Contribution",
        description: "Make first pull request and code review",
        category: "integration",
        estimatedDays: 5,
        required: true
      },
      {
        name: "Documentation Review",
        description: "Read and understand project documentation",
        category: "training",
        estimatedDays: 2,
        required: false
      },
      {
        name: "Performance Review Setup",
        description: "Set up monitoring and performance tracking",
        category: "setup",
        estimatedDays: 1,
        required: false
      },
      {
        name: "Mentor Assignment",
        description: "Assign and meet with technical mentor",
        category: "integration",
        estimatedDays: 1,
        required: true
      },
      {
        name: "30-Day Review",
        description: "Conduct 30-day performance and integration review",
        category: "review",
        estimatedDays: 1,
        required: true
      }
    ]
  },
  {
    id: "management",
    name: "Management Template",
    description: "Onboarding workflow for managers including leadership training and team introductions.",
    category: "management",
    estimatedDuration: "3-4 weeks",
    taskCount: 15,
    icon: "Users",
    tasks: [
      {
        name: "Leadership Assessment",
        description: "Complete leadership style assessment and 360-degree feedback",
        category: "training",
        estimatedDays: 2,
        required: true
      },
      {
        name: "Team Overview",
        description: "Review team structure, roles, and responsibilities",
        category: "integration",
        estimatedDays: 3,
        required: true
      },
      {
        name: "One-on-One Setup",
        description: "Schedule initial one-on-one meetings with all team members",
        category: "integration",
        estimatedDays: 2,
        required: true
      },
      {
        name: "Performance Management",
        description: "Learn performance review process and tools",
        category: "training",
        estimatedDays: 2,
        required: true
      },
      {
        name: "Budget Access",
        description: "Set up budget access and financial reporting tools",
        category: "setup",
        estimatedDays: 1,
        required: true
      },
      {
        name: "Strategic Planning",
        description: "Review current strategic initiatives and goals",
        category: "training",
        estimatedDays: 3,
        required: true
      },
      {
        name: "Stakeholder Mapping",
        description: "Identify and meet with key stakeholders",
        category: "integration",
        estimatedDays: 4,
        required: true
      },
      {
        name: "Conflict Resolution",
        description: "Complete conflict resolution and mediation training",
        category: "training",
        estimatedDays: 2,
        required: true
      },
      {
        name: "HR Policies",
        description: "Review HR policies and employee handbook",
        category: "compliance",
        estimatedDays: 1,
        required: true
      },
      {
        name: "Team Building",
        description: "Plan and conduct first team building activity",
        category: "integration",
        estimatedDays: 3,
        required: false
      },
      {
        name: "Mentor Assignment",
        description: "Assign and meet with management mentor",
        category: "integration",
        estimatedDays: 1,
        required: true
      },
      {
        name: "Goal Setting",
        description: "Set 30, 60, and 90-day goals with supervisor",
        category: "review",
        estimatedDays: 2,
        required: true
      },
      {
        name: "Communication Tools",
        description: "Set up communication and collaboration tools",
        category: "setup",
        estimatedDays: 1,
        required: true
      },
      {
        name: "Reporting Structure",
        description: "Understand reporting relationships and escalation procedures",
        category: "training",
        estimatedDays: 2,
        required: true
      },
      {
        name: "30-Day Review",
        description: "Conduct 30-day leadership effectiveness review",
        category: "review",
        estimatedDays: 1,
        required: true
      }
    ]
  },
  {
    id: "general",
    name: "General Template",
    description: "Basic onboarding workflow suitable for most roles with standard company procedures.",
    category: "general",
    estimatedDuration: "1-2 weeks",
    taskCount: 8,
    icon: "User",
    tasks: [
      {
        name: "Account Setup",
        description: "Create email, Slack, and necessary system accounts",
        category: "setup",
        estimatedDays: 1,
        required: true
      },
      {
        name: "Company Orientation",
        description: "Complete company overview and culture training",
        category: "training",
        estimatedDays: 2,
        required: true
      },
      {
        name: "Policy Review",
        description: "Review company policies and employee handbook",
        category: "compliance",
        estimatedDays: 1,
        required: true
      },
      {
        name: "Team Introduction",
        description: "Meet with team members and understand roles",
        category: "integration",
        estimatedDays: 2,
        required: true
      },
      {
        name: "Role Training",
        description: "Complete role-specific training and tools setup",
        category: "training",
        estimatedDays: 3,
        required: true
      },
      {
        name: "First Assignment",
        description: "Complete first work assignment under supervision",
        category: "integration",
        estimatedDays: 5,
        required: true
      },
      {
        name: "Mentor Assignment",
        description: "Assign and meet with department mentor",
        category: "integration",
        estimatedDays: 1,
        required: true
      },
      {
        name: "30-Day Review",
        description: "Conduct 30-day performance and integration review",
        category: "review",
        estimatedDays: 1,
        required: true
      }
    ]
  }
];

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