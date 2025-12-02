import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, DollarSign, TrendingUp } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of platform metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">50,234</p>
                <p className="text-xs text-green-500">+12% from last month</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-xs text-green-500">+8% from last month</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">$124.5K</p>
                <p className="text-xs text-green-500">+23% from last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Batches</p>
                <p className="text-2xl font-bold">45</p>
                <p className="text-xs text-green-500">+5 new this month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Trends</CardTitle>
            <CardDescription>Monthly student enrollments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around gap-2">
              {[45, 52, 48, 65, 59, 70, 80, 75, 88, 95, 87, 100].map((height, i) => (
                <div key={i} className="flex-1 bg-primary rounded-t" style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-muted-foreground">
              <span>Jan</span>
              <span>Jun</span>
              <span>Dec</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New student enrolled", course: "Web Development", time: "2 min ago" },
                { action: "Assignment submitted", course: "Data Science", time: "15 min ago" },
                { action: "Course completed", course: "UI/UX Design", time: "1 hour ago" },
                { action: "New course published", course: "Digital Marketing", time: "2 hours ago" },
                { action: "Batch created", course: "Python Basics", time: "3 hours ago" },
              ].map((item, i) => (
                <div key={i} className="flex items-start justify-between border-b last:border-0 pb-3">
                  <div>
                    <p className="font-medium text-sm">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.course}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Courses</CardTitle>
          <CardDescription>Courses with highest enrollment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Complete Web Development Bootcamp", students: 12543, revenue: "$124,500" },
              { name: "Digital Marketing Essentials", students: 11234, revenue: "$89,800" },
              { name: "Data Science with Python", students: 9876, revenue: "$128,300" },
              { name: "UI/UX Design Masterclass", students: 8234, revenue: "$74,100" },
            ].map((course, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">{course.name}</p>
                  <p className="text-sm text-muted-foreground">{course.students.toLocaleString()} students</p>
                </div>
                <span className="font-semibold">{course.revenue}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
