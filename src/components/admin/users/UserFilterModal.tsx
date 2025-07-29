import React from "react";
import { Button } from "@/components/ui/button";

interface UserFilterModalProps {
  open: boolean;
  filters: any;
  roles: string[];
  departments: string[];
  onChange: (key: string, value: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export const UserFilterModal: React.FC<UserFilterModalProps> = ({
  open,
  filters,
  roles,
  departments,
  onChange,
  onClear,
  onClose,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg min-w-[400px] max-w-[500px]">
        <h2 className="text-lg font-bold mb-4">Filter Users</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => onChange("status", e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              value={filters.role}
              onChange={(e) => onChange("role", e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">All Roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <select
              value={filters.department}
              onChange={(e) => onChange("department", e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">2FA Status</label>
            <select
              value={filters.twoFactorEnabled}
              onChange={(e) => onChange("twoFactorEnabled", e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">All</option>
              <option value="true">Enabled</option>
              <option value="false">Disabled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Account Locked
            </label>
            <select
              value={filters.accountLocked}
              onChange={(e) => onChange("accountLocked", e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">All</option>
              <option value="true">Locked</option>
              <option value="false">Unlocked</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          <Button onClick={onClose}>Apply Filters</Button>
          <Button variant="outline" onClick={onClear}>
            Clear All
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
