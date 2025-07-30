import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Calendar, Edit, Shield, Lock, Unlock } from "lucide-react";
import { User as UserType } from "@/types/admin";

interface UserGridProps {
  users: UserType[];
  getStatusColor: (status: string) => string;
  getRoleColor: (role: string) => string;
  onEdit: (user: UserType) => void;
  onPermissions: (user: UserType) => void;
  onToggleLock: (userId: number) => void;
}

export function UserGrid({ users, getStatusColor, getRoleColor, onEdit, onPermissions, onToggleLock }: UserGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {users.map((user) => (
        <Card key={user.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <p className="text-sm text-gray-600">{user.position}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
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
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                Joined: {user.joinDate}
              </div>
            </div>

            {/* Security Info */}
            <div className="flex items-center justify-between text-sm">
              <span>2FA: {user.twoFactorEnabled ? "Enabled" : "Disabled"}</span>
              <span>Last Login: {user.lastLogin}</span>
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
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => onToggleLock(user.id)}
                className={user.accountLocked ? "text-red-600" : "text-green-600"}
              >
                {user.accountLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}