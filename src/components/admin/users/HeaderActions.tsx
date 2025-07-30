import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Plus, X } from "lucide-react";

interface HeaderActionsProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  onShowFilter: () => void;
  onExport: () => void;
  onAddUser: () => void;
  onClear: () => void;
  filtersActive: boolean;
}

export function HeaderActions({ 
  searchTerm, 
  onSearch, 
  onShowFilter, 
  onExport, 
  onAddUser, 
  onClear, 
  filtersActive 
}: HeaderActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search users..."
            className="pl-10 w-64"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={onShowFilter}>
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline" onClick={onExport}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        {filtersActive && (
          <Button variant="outline" onClick={onClear}>
            <X className="w-4 h-4 mr-2" />
            Clear
          </Button>
        )}
      </div>
      <Button onClick={onAddUser}>
        <Plus className="w-4 h-4 mr-2" />
        Add User
      </Button>
    </div>
  );
}