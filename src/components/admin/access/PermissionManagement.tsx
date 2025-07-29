import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Key, Edit, Shield } from "lucide-react";

interface Permission {
  id: number;
  name: string;
  description: string;
  category: string;
  riskLevel: string;
  assignedRoles: string[];
}

interface PermissionManagementProps {
  permissions: Permission[];
  // Future: onEdit, onAssign, onDelete, onCreate
}

const PermissionManagement: React.FC<PermissionManagementProps> = ({ permissions }) => {
  // TODO: Add handlers for edit, assign, delete, create as needed
  // For now, just render the list
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Administration: "bg-red-100 text-red-800",
      System: "bg-purple-100 text-purple-800",
      HR: "bg-blue-100 text-blue-800",
      GA: "bg-green-100 text-green-800",
      Finance: "bg-yellow-100 text-yellow-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };
  const getRiskLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      Low: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      High: "bg-orange-100 text-orange-800",
      Critical: "bg-red-100 text-red-800",
    };
    return colors[level] || "bg-gray-100 text-gray-800";
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Permission Management</CardTitle>
        <CardDescription>Manage individual permissions and their assignments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {permissions.map((permission) => (
            <div key={permission.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Key className="w-5 h-5 text-gray-600" />
                    <h4 className="font-medium">{permission.name}</h4>
                    <Badge className={getCategoryColor(permission.category)} variant="secondary">
                      {permission.category}
                    </Badge>
                    <Badge className={getRiskLevelColor(permission.riskLevel)} variant="secondary">
                      {permission.riskLevel} Risk
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{permission.description}</p>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Assigned to roles:</p>
                    <div className="flex flex-wrap gap-1">
                      {permission.assignedRoles.map((role, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Shield className="w-4 h-4 mr-1" />
                    Assign
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PermissionManagement; 