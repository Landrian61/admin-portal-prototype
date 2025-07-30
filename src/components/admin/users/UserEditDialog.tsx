import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/types/admin";

interface UserEditDialogProps {
  open: boolean;
  form: User | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function UserEditDialog({ open, form, onChange, onSubmit, onCancel }: UserEditDialogProps) {
  if (!form) return null;

  return (
    <Dialog open={open} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input name="name" value={form.name} onChange={onChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input name="email" type="email" value={form.email} onChange={onChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input name="phone" value={form.phone} onChange={onChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Position</label>
              <Input name="position" value={form.position} onChange={onChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <Input name="department" value={form.department} onChange={onChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select name="role" value={form.role} onChange={onChange} className="w-full border rounded px-2 py-1">
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select name="status" value={form.status} onChange={onChange} className="w-full border rounded px-2 py-1">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <Input name="location" value={form.location} onChange={onChange} required />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}