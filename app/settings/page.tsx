"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import api from "@/lib/axios"; // Agora com auth e from configurados
import { User, Bell, Shield, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface Profile {
  id: string;
  username: string;
  // Add other profile properties as needed
}

export default function Settings() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await api.get('/auth/user');
        
        if (user) {
          const { data } = await api.get(`/profiles/${user.id}`);
          if (data) {
            setProfile(data);
            setUsername(data.username);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    setLoading(true);

    try {
      const { data: { user } } = await api.get('/auth/user');
      
      if (!user) throw new Error("Not authenticated");

      await api.put(`/profiles/${user.id}`, { username });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await api.post('/auth/signout');
    router.push('/auth/login');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="mr-2 h-5 w-5" />
            Profile Settings
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <Button onClick={handleUpdateProfile} disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications about new courses and updates
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Security
          </h2>
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={() => router.push('/auth/reset-password')}
            >
              Change Password
            </Button>
          </div>
        </Card>

        {/* Account Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-destructive">
            <LogOut className="mr-2 h-5 w-5" />
            Account Actions
          </h2>
          <div className="space-y-4">
            <Button
              variant="destructive"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
