import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AccessLog {
  id: number;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
  status: string;
  riskLevel: string;
}

interface AuditLogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accessLogs: AccessLog[];
}

const AuditLogDialog: React.FC<AuditLogDialogProps> = ({
  open,
  onOpenChange,
  accessLogs,
}) => {
  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      Success: "bg-green-100 text-green-800",
      Failed: "bg-red-100 text-red-800",
      Warning: "bg-yellow-100 text-yellow-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getRiskLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      Low: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      High: "bg-orange-100 text-orange-800",
      Critical: "bg-red-100 text-red-800",
    };
    return colors[level] || "bg-gray-100 text-gray-800";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Audit Log</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border">User</th>
                <th className="px-3 py-2 border">Action</th>
                <th className="px-3 py-2 border">Resource</th>
                <th className="px-3 py-2 border">Timestamp</th>
                <th className="px-3 py-2 border">IP Address</th>
                <th className="px-3 py-2 border">Status</th>
                <th className="px-3 py-2 border">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {accessLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-3 py-2 border">{log.user}</td>
                  <td className="px-3 py-2 border">{log.action}</td>
                  <td className="px-3 py-2 border">{log.resource}</td>
                  <td className="px-3 py-2 border whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="px-3 py-2 border">{log.ipAddress}</td>
                  <td className="px-3 py-2 border">
                    <span
                      className={`px-2 py-1 rounded ${getStatusColor(
                        log.status
                      )}`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 border">
                    <span
                      className={`px-2 py-1 rounded ${getRiskLevelColor(
                        log.riskLevel
                      )}`}
                    >
                      {log.riskLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuditLogDialog;
