"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Users,
  Calendar,
  ClipboardList,
  UserCheck,
  Clock,
  Briefcase,
  Settings,
  BarChart3,
  Shield,
  Menu,
  X,
  Home,
  LayoutDashboard,
  UserPlus,
  Target
} from "lucide-react"

interface SidebarProps {
  userRole: "hr" | "ga" | "admin"
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
  ]
}

export function Sidebar({ userRole }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const items = navigationItems[userRole]

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-white md:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-primary text-white transform transition-transform duration-300 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-primary-600">
            <h1 className="text-xl font-bold">AIBOS</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {items.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-600 text-white"
                      : "text-primary-100 hover:bg-primary-600 hover:text-white"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User info */}
          <div className="px-4 py-4 border-t border-primary-600">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white capitalize">{userRole} User</p>
                <p className="text-xs text-primary-100">user@aibos.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

