import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, Plus } from "lucide-react";

interface HeaderActionsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roleLevelFilter: string;
  onRoleLevelFilterChange: (value: string) => void;
  permissionCategoryFilter: string;
  onPermissionCategoryFilterChange: (value: string) => void;
  onClearFilters: () => void;
  onAuditLogClick: () => void;
  onCreateRoleClick: () => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  searchTerm,
  onSearchChange,
  roleLevelFilter,
  onRoleLevelFilterChange,
  permissionCategoryFilter,
  onPermissionCategoryFilterChange,
  onClearFilters,
  onAuditLogClick,
  onCreateRoleClick,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search roles or permissions..."
            className="pl-10 w-64"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        {/* Role Level Filter Dropdown */}
        <select
          className="border rounded px-2 py-1"
          value={roleLevelFilter}
          onChange={(e) => onRoleLevelFilterChange(e.target.value)}
        >
          <option value="">All Levels</option>
          <option value="System">System</option>
          <option value="Department">Department</option>
          <option value="User">User</option>
        </select>
        {/* Permission Category Filter Dropdown */}
        <select
          className="border rounded px-2 py-1"
          value={permissionCategoryFilter}
          onChange={(e) => onPermissionCategoryFilterChange(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Administration">Administration</option>
          <option value="System">System</option>
          <option value="HR">HR</option>
          <option value="GA">GA</option>
          <option value="Finance">Finance</option>
        </select>
        {/* Clear Filters Button */}
        <Button variant="outline" onClick={onClearFilters}>
          Clear Filters
        </Button>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline" onClick={onAuditLogClick}>
          <Eye className="w-4 h-4 mr-2" />
          Audit Log
        </Button>
      </div>
      <Button onClick={onCreateRoleClick}>
        <Plus className="w-4 h-4 mr-2" />
        Create Role
      </Button>
    </div>
  );
};

export default HeaderActions; 