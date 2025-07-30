import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UserFilterModalProps {
  open: boolean;
  filters: {
    status: string;
    role: string;
    department: string;
    twoFactorEnabled: string;
    accountLocked: string;
  };
  roles: string[];
  departments: string[];
  onChange: (key: string, value: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export function UserFilterModal({ 
  open, 
  filters, 
  roles, 
  departments, 
  onChange, 
  onClear, 
  onClose 
}: UserFilterModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Filter Users</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select 
              value={filters.status} 
              onChange={(e) => onChange("status", e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select 
              value={filters.role} 
              onChange={(e) => onChange("role", e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select 
              value={filters.department} 
              onChange={(e) => onChange("department", e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClear}>Clear All</Button>
          <Button onClick={onClose}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}