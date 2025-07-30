import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Calendar, Edit, Shield, Lock, Unlock } from "lucide-react";
import { User as UserType } from "@/types/admin";

interface UserCardProps {
  user: UserType;
  getStatusColor: (status: string) => string;
  getRoleColor: (role: string) => string;
  onEdit: (user: UserType) => void;
  onPermissions: (user: UserType) => void;
  onToggleLock: (userId: number) => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  getStatusColor,
  getRoleColor,
  onEdit,
  onPermissions,
  onToggleLock,
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">{user.name}</CardTitle>
              <CardDescription>{user.position}</CardDescription>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Badge className={getStatusColor(user.status)} variant="secondary">
              {user.status}
            </Badge>
            <Badge className={getRoleColor(user.role)} variant="secondary">
              {user.role}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-2" />
            {user.email}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            {user.phone}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {user.location}
          </div>
        </div>
        {/* Security Info */}
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium text-gray-700">Department:</span>
            <span className="ml-2 text-gray-600">{user.department}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            Joined: {new Date(user.joinDate).toLocaleDateString()}
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Last Login:</span>
            <span className="ml-2 text-gray-600">{user.lastLogin}</span>
          </div>
        </div>
        {/* Security Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">2FA Enabled:</span>
            <Badge variant={user.twoFactorEnabled ? "default" : "outline"}>
              {user.twoFactorEnabled ? "Yes" : "No"}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">Account Locked:</span>
            <Badge variant={user.accountLocked ? "destructive" : "outline"}>
              {user.accountLocked ? "Yes" : "No"}
            </Badge>
          </div>
          {user.loginAttempts > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700">Failed Attempts:</span>
              <Badge variant="destructive">{user.loginAttempts}</Badge>
            </div>
          )}
        </div>
        {/* Permissions */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Permissions:</p>
          <div className="flex flex-wrap gap-1">
            {user.permissions.slice(0, 2).map((permission: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {permission}
              </Badge>
            ))}
            {user.permissions.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{user.permissions.length - 2} more
              </Badge>
            )}
          </div>
        </div>
        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button size="sm" variant="outline" className="flex-1" onClick={() => onEdit(user)}>
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="outline" className="flex-1" onClick={() => onPermissions(user)}>
            <Shield className="w-4 h-4 mr-1" />
            Permissions
          </Button>
          <Button size="sm" variant="outline" onClick={() => onToggleLock(user.id)}>
            {user.accountLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 