import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UserPermissionsDialogProps {
  open: boolean;
  allPermissions: string[];
  selected: string[];
  onToggle: (permission: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function UserPermissionsDialog({ 
  open, 
  allPermissions, 
  selected, 
  onToggle, 
  onSubmit, 
  onCancel 
}: UserPermissionsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Manage Permissions</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
            {allPermissions.map((permission) => (
              <label key={permission} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selected.includes(permission)}
                  onChange={() => onToggle(permission)}
                  className="rounded"
                />
                <span className="text-sm">{permission}</span>
              </label>
            ))}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit">Save Permissions</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}