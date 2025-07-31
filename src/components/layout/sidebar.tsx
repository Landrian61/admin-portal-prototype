"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  Calendar,
  ClipboardList,
  UserCheck,
  Clock,
  Settings,
  BarChart3,
  Shield,
  Menu,
  X,
  Home,
  LayoutDashboard,
  UserPlus,
  Target,
} from "lucide-react";

interface SidebarProps {
  userRole: "hr" | "ga" | "admin";
}

const navigationItems = {
  hr: [
    { name: "Dashboard", href: "/hr", icon: LayoutDashboard },
    { name: "Hiring Process", href: "/hr/hiring", icon: Users },
    { name: "Candidates", href: "/hr/candidates", icon: UserCheck },
    { name: "Interviews", href: "/hr/interviews", icon: Calendar },
    { name: "Onboarding", href: "/hr/onboarding", icon: UserPlus },
    { name: "Leave Management", href: "/hr/leave", icon: Clock },
    { name: "Probation", href: "/hr/probation", icon: Target },
    { name: "User Management", href: "/hr/users", icon: Settings },
  ],
  ga: [
    { name: "Dashboard", href: "/ga", icon: Home },
    { name: "Schedule Management", href: "/ga/schedule", icon: Calendar },
    { name: "Attendance", href: "/ga/attendance", icon: UserCheck },
    { name: "Cleaning Management", href: "/ga/cleaning", icon: ClipboardList },
    { name: "Reports", href: "/ga/reports", icon: BarChart3 },
  ],
  admin: [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Access Control", href: "/admin/access", icon: Shield },
    { name: "System Settings", href: "/admin/settings", icon: Settings },
    { name: "System Monitoring", href: "/admin/monitoring", icon: BarChart3 },
  ],
};

export function Sidebar({ userRole }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const currentItems = navigationItems[userRole] || [];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md md:hidden"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-primary shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 bg-primary text-white">
            <h1 className="text-xl font-bold">AIBOS</h1>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {currentItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-white bg-opacity-20 text-white"
                      : "text-white hover:bg-white hover:bg-opacity-10 hover:text-white"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User profile section at bottom */}
          <div className="p-4 border-t border-white border-opacity-20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {userRole === "admin"
                    ? "N Admin User"
                    : `${
                        userRole.charAt(0).toUpperCase() + userRole.slice(1)
                      } User`}
                </p>
                <p className="text-xs text-white text-opacity-70 truncate">
                  user@aibos.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
