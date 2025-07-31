"use client";

import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface MainLayoutProps {
  children: ReactNode;
  userRole: "hr" | "ga" | "admin";
  title: string;
}

export function MainLayout({ children, userRole, title }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar userRole={userRole} />

      <div className="flex-1 md:ml-64">
        <Header title={title} userRole={userRole} />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
