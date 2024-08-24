import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, GraduationCap, Settings, User } from 'lucide-react'

export default function StudentDashboard() {
  // Mock data - in a real application, this would come from an API or database
  const student = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    enrollmentDate: "2023-09-01",
    courses: [
      { id: 1, name: "Mathematics", progress: 75 },
      { id: 2, name: "Physics", progress: 60 },
      { id: 3, name: "Computer Science", progress: 90 },
    ],
    upcomingAssignments: [
      { id: 1, title: "Math Homework", dueDate: "2023-06-15" },
      { id: 2, title: "Physics Lab Report", dueDate: "2023-06-18" },
      { id: 3, title: "CS Project", dueDate: "2023-06-20" },
    ],
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Student Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{student.name}</h2>
              <p className="text-muted-foreground">{student.email}</p>
              <p className="text-sm text-muted-foreground">Enrolled: {student.enrollmentDate}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enrolled Courses</CardTitle>
            <CardDescription>Your current course progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {student.courses.map(course => (
              <div key={course.id} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{course.name}</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Academic Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <span>Courses: {student.courses.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>Assignments: {student.upcomingAssignments.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5 text-muted-foreground" />
                  <span>GPA: 3.8</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span>Advisor: Dr. Smith</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="assignments">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {student.upcomingAssignments.map(assignment => (
                  <li key={assignment.id} className="flex justify-between items-center">
                    <span>{assignment.title}</span>
                    <Badge variant="outline">{assignment.dueDate}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="grades">
          <Card>
            <CardHeader>
              <CardTitle>Current Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {student.courses.map(course => (
                  <li key={course.id} className="flex justify-between items-center">
                    <span>{course.name}</span>
                    <Badge>{['A', 'B+', 'A-'][Math.floor(Math.random() * 3)]}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button>View Schedule</Button>
          <Button variant="outline">Contact Advisor</Button>
          <Button variant="outline">Access Library</Button>
          <Button variant="outline">Campus Map</Button>
        </CardContent>
      </Card>
    </div>
  )
}