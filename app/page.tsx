import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const courses = [
  {
    title: "Getting Started",
    description: "Learn the basics and get started with our platform",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Advanced Techniques",
    description: "Master advanced concepts and methodologies",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Community Projects",
    description: "Collaborate with others on real-world projects",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-muted-foreground">
          Continue your journey with these recommended courses
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, i) => (
          <Card key={i} className="group relative overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={course.image}
                alt={course.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
            </div>
            <div className="relative p-6 pt-28">
              <h3 className="text-xl font-semibold text-white">{course.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{course.description}</p>
              <Button className="mt-4" variant="secondary">
                Start Learning
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}