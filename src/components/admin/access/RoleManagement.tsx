import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Edit, Trash2, UserPlus } from "lucide-react";
import { Role } from "@/types/admin";

interface RoleManagementProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onAssign: (role: Role) => void;
  onDelete: (role: Role) => void;
  editDialog?: React.ReactNode;
  assignDialog?: React.ReactNode;
  deleteDialog?: React.ReactNode;
  createDialog?: React.ReactNode;
}

const RoleManagement: React.FC<RoleManagementProps> = ({ 
  roles, 
  onEdit, 
  onAssign, 
  onDelete,
  editDialog,
  assignDialog,
  deleteDialog,
  createDialog
}) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Role Management</CardTitle>
          <CardDescription>Manage user roles and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roles.map((role) => (
              <div key={role.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <User className="w-5 h-5 text-gray-600" />
                      <h4 className="font-medium">{role.name}</h4>
                      <Badge className={role.color} variant="secondary">
                        {role.level}
                      </Badge>
                      <Badge variant="outline">
                        {role.userCount} users
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Permissions:</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => onEdit(role)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onAssign(role)}>
                      <UserPlus className="w-4 h-4 mr-1" />
                      Assign
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onDelete(role)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {editDialog}
      {assignDialog}
      {deleteDialog}
      {createDialog}
    </>
  );
};

export default RoleManagement;