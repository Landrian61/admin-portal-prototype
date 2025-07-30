import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AccessLog } from "@/types/admin";

interface AuditLogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accessLogs: AccessLog[];
}

const AuditLogDialog: React.FC<AuditLogDialogProps> = ({ open, onOpenChange, accessLogs }) => {
  const getRiskLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      Low: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      High: "bg-orange-100 text-orange-800",
      Critical: "bg-red-100 text-red-800",
    };
    return colors[level] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      Success: "bg-green-100 text-green-800",
      Failed: "bg-red-100 text-red-800",
      Warning: "bg-yellow-100 text-yellow-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Audit Log</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {accessLogs.map((log) => (
            <div key={log.id} className="border rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{log.action}</span>
                  <Badge className={getStatusColor(log.status)} variant="secondary">
                    {log.status}
                  </Badge>
                  <Badge className={getRiskLevelColor(log.riskLevel)} variant="secondary">
                    {log.riskLevel}
                  </Badge>
                </div>
                <span className="text-sm text-gray-500">{log.timestamp}</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>User: {log.user}</p>
                <p>Resource: {log.resource}</p>
                <p>IP Address: {log.ipAddress}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuditLogDialog;