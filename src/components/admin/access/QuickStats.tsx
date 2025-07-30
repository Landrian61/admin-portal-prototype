import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface QuickStatsProps {
  activeRoles: number;
  totalUsers: number;
  permissions: number;
  securityAlerts: number;
}

const QuickStats: React.FC<QuickStatsProps> = ({ activeRoles, totalUsers, permissions, securityAlerts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{activeRoles}</div>
            <div className="text-sm text-gray-600">Active Roles</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{totalUsers}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{permissions}</div>
            <div className="text-sm text-gray-600">Permissions</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{securityAlerts}</div>
            <div className="text-sm text-gray-600">Security Alerts</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickStats;