import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, AlertTriangle, Download } from "lucide-react";

const SecurityActions: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Actions</CardTitle>
        <CardDescription>Quick access to security-related functions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button variant="outline" className="justify-start">
            <Shield className="w-4 h-4 mr-2" />
            Security Scan
          </Button>
          <Button variant="outline" className="justify-start">
            <Lock className="w-4 h-4 mr-2" />
            Lock All Sessions
          </Button>
          <Button variant="outline" className="justify-start">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Security Report
          </Button>
          <Button variant="outline" className="justify-start">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityActions;