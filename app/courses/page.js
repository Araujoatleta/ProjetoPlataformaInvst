"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Clock } from "lucide-react";
import api from "@/lib/axios";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/courses');
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Investment Courses</h1>
        <p className="text-muted-foreground">
          Learn from our comprehensive investment courses
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="group relative overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={course.thumbnail_url}
                alt={course.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
            </div>
            <div className="relative p-6 pt-28">
              <h3 className="text-xl font-semibold text-white">{course.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{course.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <Button variant="secondary">
                  <Play className="mr-2 h-4 w-4" />
                  Start Course
                </Button>
                <span className="text-sm text-gray-300 flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  2h 30m
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}