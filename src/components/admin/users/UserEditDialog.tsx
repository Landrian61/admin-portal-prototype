import React from "react";
import { Button } from "@/components/ui/button";

interface UserEditDialogProps {
  open: boolean;
  form: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const UserEditDialog: React.FC<UserEditDialogProps> = ({
  open,
  form,
  onChange,
  onSubmit,
  onCancel,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded shadow-lg min-w-[500px] max-w-[700px] w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-lg font-bold mb-4">Edit User</h2>
        <div className="grid grid-cols-1 gap-3">
          <input type="hidden" name="id" value={form.id} />
          <label className="flex flex-col text-sm">
            Name
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="border rounded px-2 py-1 mt-1"
              required
            />
          </label>
          <label className="flex flex-col text-sm">
            Email
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              className="border rounded px-2 py-1 mt-1"
              required
            />
          </label>
          <label className="flex flex-col text-sm">
            Phone
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              className="border rounded px-2 py-1 mt-1"
            />
          </label>
          <label className="flex flex-col text-sm">
            Position
            <input
              name="position"
              value={form.position}
              onChange={onChange}
              className="border rounded px-2 py-1 mt-1"
            />
          </label>
          <label className="flex flex-col text-sm">
            Department
            <input
              name="department"
              value={form.department}
              onChange={onChange}
              className="border rounded px-2 py-1 mt-1"
            />
          </label>
          <label className="flex flex-col text-sm">
            Role
            <select
              name="role"
              value={form.role}
              onChange={onChange}
              className="border rounded px-2 py-1 mt-1"
            >
              <option value="Director">Director</option>
              <option value="Manager">Manager</option>
              <option value="Lead">Lead</option>
              <option value="Employee">Employee</option>
            </select>
          </label>
          <label className="flex flex-col text-sm">
            Status
            <select
              name="status"
              value={form.status}
              onChange={onChange}
              className="border rounded px-2 py-1 mt-1"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </label>
          <label className="flex flex-col text-sm">
            Location
            <input
              name="location"
              value={form.location}
              onChange={onChange}
              className="border rounded px-2 py-1 mt-1"
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="twoFactorEnabled"
              checked={form.twoFactorEnabled}
              onChange={onChange}
            />
            2FA Enabled
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="accountLocked"
              checked={form.accountLocked}
              onChange={onChange}
            />
            Account Locked
          </label>
        </div>
        <div className="flex gap-2 mt-4">
          <Button type="submit">Save</Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
