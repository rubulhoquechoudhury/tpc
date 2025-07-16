"use client"

import * as React from "react"
import Image from "next/image"
import { GraduationCap, Lightbulb, Mail, Phone, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import PageHeader from "@/components/page-header"

type Student = {
  name: string
  major: string
  gpa: number
  skills: string[]
  email: string
  phone: string
  imageUrl: string
}

const students: Student[] = [
  {
    name: "Aisha Khan",
    major: "Computer Science",
    gpa: 3.8,
    skills: ["React", "Node.js", "Python", "SQL"],
    email: "aisha.khan@example.com",
    phone: "123-456-7890",
    imageUrl: "https://placehold.co/100x100.png",
  },
  {
    name: "Ben Carter",
    major: "Mechanical Engineering",
    gpa: 3.5,
    skills: ["AutoCAD", "SolidWorks", "MATLAB"],
    email: "ben.carter@example.com",
    phone: "123-456-7891",
    imageUrl: "https://placehold.co/100x100.png",
  },
  {
    name: "Chloe Davis",
    major: "Business Administration",
    gpa: 3.9,
    skills: ["Marketing", "Finance", "Excel"],
    email: "chloe.davis@example.com",
    phone: "123-456-7892",
    imageUrl: "https://placehold.co/100x100.png",
  },
  {
    name: "David Rodriguez",
    major: "Computer Science",
    gpa: 3.6,
    skills: ["Java", "Spring Boot", "AWS", "Docker"],
    email: "david.r@example.com",
    phone: "123-456-7893",
    imageUrl: "https://placehold.co/100x100.png",
  },
  {
    name: "Emily White",
    major: "Electrical Engineering",
    gpa: 3.7,
    skills: ["VHDL", "C++", "Circuit Design"],
    email: "emily.w@example.com",
    phone: "123-456-7894",
    imageUrl: "https://placehold.co/100x100.png",
  },
]

export default function StudentsPage() {
  const [filters, setFilters] = React.useState({
    skill: "",
    major: "all",
    gpa: 3.0,
  })

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filteredStudents = students.filter((student) => {
    return (
      (filters.major === "all" || student.major === filters.major) &&
      student.gpa >= filters.gpa &&
      (filters.skill === "" ||
        student.skills.some((s) =>
          s.toLowerCase().includes(filters.skill.toLowerCase())
        ))
    )
  })

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <PageHeader
        title="Student Resume Database"
        description="Find the right talent for your company."
      />
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="major">Major</Label>
              <Select
                value={filters.major}
                onValueChange={(value) => handleFilterChange("major", value)}
              >
                <SelectTrigger id="major">
                  <SelectValue placeholder="Filter by major" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Majors</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                  <SelectItem value="Business Administration">Business Administration</SelectItem>
                  <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="skill">Skill</Label>
              <Input
                id="skill"
                placeholder="e.g., React, Python..."
                value={filters.skill}
                onChange={(e) => handleFilterChange("skill", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gpa">Minimum GPA: {filters.gpa.toFixed(1)}</Label>
              <Slider
                id="gpa"
                min={2.0}
                max={4.0}
                step={0.1}
                value={[filters.gpa]}
                onValueChange={([value]) => handleFilterChange("gpa", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <StudentCard key={student.email} student={student} />
        ))}
      </div>
    </div>
  )
}

function StudentCard({ student }: { student: Student }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start gap-4 bg-muted/20 p-4">
        <Image
          src={student.imageUrl}
          alt={student.name}
          width={80}
          height={80}
          className="rounded-full border-2 border-primary"
          data-ai-hint="person"
        />
        <div className="flex-1">
          <CardTitle className="font-headline text-xl">{student.name}</CardTitle>
          <CardDescription className="flex items-center gap-2 text-sm">
            <GraduationCap className="h-4 w-4" />
            {student.major}
          </CardDescription>
          <div className="flex items-center gap-2 text-sm text-amber-600">
            <Star className="h-4 w-4 fill-current" />
            GPA: {student.gpa.toFixed(1)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <h4 className="flex items-center text-sm font-semibold mb-2">
            <Lightbulb className="mr-2 h-4 w-4" />
            Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {student.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Contact</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
             <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{student.email}</span>
            </div>
            <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{student.phone}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          variant="outline"
          className="w-full"
        >
          View Full Resume
        </Button>
      </CardFooter>
    </Card>
  );
}
