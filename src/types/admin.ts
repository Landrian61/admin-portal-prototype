export interface Role {
  id: number;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  level: string;
  color: string;
}

export interface Permission {
  id: number;
  name: string;
  description: string;
  category: string;
  riskLevel: string;
  assignedRoles: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  role: string;
  status: string;
  lastLogin: string;
  joinDate: string;
  location: string;
  permissions: string[];
  loginAttempts: number;
  accountLocked: boolean;
  twoFactorEnabled: boolean;
}

export interface NewRoleData {
  name: string;
  description: string;
  permissions: string[];
  level: string;
  color: string;
}

export interface AccessLog {
  id: number;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
  status: string;
  riskLevel: string;
}