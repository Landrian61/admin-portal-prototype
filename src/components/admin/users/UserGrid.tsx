import React from "react";
import { UserCard } from "./UserCard";

interface UserGridProps {
  users: any[];
  getStatusColor: (status: string) => string;
  getRoleColor: (role: string) => string;
  onEdit: (user: any) => void;
  onPermissions: (user: any) => void;
  onToggleLock: (userId: number) => void;
}

export const UserGrid: React.FC<UserGridProps> = ({ users, getStatusColor, getRoleColor, onEdit, onPermissions, onToggleLock }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          getStatusColor={getStatusColor}
          getRoleColor={getRoleColor}
          onEdit={onEdit}
          onPermissions={onPermissions}
          onToggleLock={onToggleLock}
        />
      ))}
    </div>
  );
}; 