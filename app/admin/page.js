"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Trash2 } from "lucide-react";
import api from "@/lib/axios";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/users');
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/courses', {
        title: courseTitle,
        description: courseDescription,
        video_url: videoUrl,
        thumbnail_url: thumbnailUrl
      });

      // Reset form
      setCourseTitle("");
      setCourseDescription("");
      setVideoUrl("");
      setThumbnailUrl("");
    } catch (error) {
      console.error("Error adding course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage users and content
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Add Course Form */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
          <form onSubmit={handleAddCourse} className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Course Title"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="Course Description"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Thumbnail URL"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              <Upload className="mr-2 h-4 w-4" />
              {loading ? "Adding..." : "Add Course"}
            </Button>
          </form>
        </Card>

        {/* User Management */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-secondary rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                    alt={user.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.is_admin ? "Admin" : "User"}
                    </p>
                  </div>
                </div>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}