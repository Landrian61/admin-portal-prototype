"use client"

import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlobalSearch } from "@/components/ui/search"
import { NotificationCenter } from "@/components/ui/notifications"

interface HeaderProps {
  title: string
  userRole: "hr" | "ga" | "admin"
}

export function Header({ title, userRole }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Enhanced Global Search */}
          <div className="hidden md:block">
            <GlobalSearch className="w-80" />
          </div>

          {/* Enhanced Notifications */}
          <NotificationCenter />

          {/* User menu */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">John Smith</p>
              <p className="text-xs text-gray-500 capitalize">{userRole} User</p>
            </div>
            <Button variant="ghost" size="icon">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="md:hidden mt-3">
        <GlobalSearch />
      </div>
    </header>
  )
}

