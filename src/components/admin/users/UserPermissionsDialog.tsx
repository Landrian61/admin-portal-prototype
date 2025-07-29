import React from "react";
import { Button } from "@/components/ui/button";

interface UserPermissionsDialogProps {
  open: boolean;
  allPermissions: string[];
  selected: string[];
  onToggle: (perm: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const UserPermissionsDialog: React.FC<UserPermissionsDialogProps> = ({ open, allPermissions, selected, onToggle, onSubmit, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-lg min-w-[350px] max-w-[90vw]">
        <h2 className="text-lg font-bold mb-4">Edit Permissions</h2>
        <div className="grid grid-cols-1 gap-2 mb-4">
          {allPermissions.map((perm) => (
            <label key={perm} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={selected.includes(perm)} onChange={() => onToggle(perm)} />
              {perm}
            </label>
          ))}
        </div>
        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}; 