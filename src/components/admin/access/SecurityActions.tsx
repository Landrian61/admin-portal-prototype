import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Key, Shield, Settings } from "lucide-react";

interface SecurityActionsProps {
  onLockSessions?: () => void;
  onForcePasswordReset?: () => void;
  onEnable2FA?: () => void;
  onSecuritySettings?: () => void;
}

const SecurityActions: React.FC<SecurityActionsProps> = ({
  onLockSessions,
  onForcePasswordReset,
  onEnable2FA,
  onSecuritySettings,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Actions</CardTitle>
        <CardDescription>Quick access to common security management tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button variant="outline" className="justify-start" onClick={onLockSessions}>
            <Lock className="w-4 h-4 mr-2" />
            Lock All Sessions
          </Button>
          <Button variant="outline" className="justify-start" onClick={onForcePasswordReset}>
            <Key className="w-4 h-4 mr-2" />
            Force Password Reset
          </Button>
          <Button variant="outline" className="justify-start" onClick={onEnable2FA}>
            <Shield className="w-4 h-4 mr-2" />
            Enable 2FA
          </Button>
          <Button variant="outline" className="justify-start" onClick={onSecuritySettings}>
            <Settings className="w-4 h-4 mr-2" />
            Security Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityActions; 