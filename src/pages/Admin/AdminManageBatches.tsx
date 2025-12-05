import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockBatches, mockCourses } from "@/lib/mock-data";
import { Plus, Edit, Trash2 } from "lucide-react";
import BatchForm from "@/components/modules/AdminDashboard/AddBatchForm";
import { useAvailableCoursesQuery } from "@/redux/features/Course/course.api";
import Loading from "@/components/Loading";

export default function AdminBatchesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { data: fetchAllCourses, isLoading } =
    useAvailableCoursesQuery(undefined);

  if (isLoading) return <Loading />;

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Batches</h1>
          <p className="text-muted-foreground">Organize courses into batches</p>
        </div>
        {/* <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Batch
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Batch</DialogTitle>
              <DialogDescription>Set up a new course batch</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="batchName">Batch Name</Label>
                <Input id="batchName" placeholder="e.g., Web Dev - Batch 2024B" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Select Course</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
              <Button className="w-full" onClick={() => setIsAddDialogOpen(false)}>
                Create Batch
              </Button>
            </div>
          </DialogContent>
        </Dialog> */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Running Courses</CardTitle>
          <CardDescription>Total: {fetchAllCourses?.data?.availableCourses?.length} courses</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-green-500">
              <TableRow>
                <TableHead className="font-semibold">Course</TableHead>
                <TableHead className="font-semibold">Start Date</TableHead>
                <TableHead className="text-right font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fetchAllCourses?.data?.availableCourses?.map((batch,index) => (
                <TableRow key={batch._id}>
                  <TableCell>{batch.title}</TableCell>
                  <TableCell>
                    {batch?._id ===
                    fetchAllCourses?.data?.anotherAvailableCourseWithQuery[
                      index
                    ]._id &&
                  fetchAllCourses?.data?.anotherAvailableCourseWithQuery[index]
                    .upcomingBatches?.[0]?.startDate
                    ? new Date(
                        fetchAllCourses?.data?.anotherAvailableCourseWithQuery[
                          index
                        ].upcomingBatches?.[0]?.startDate
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-green-500 font-semibold shadow-[0px_0px_20px_#fff]">
                      {"Active".charAt(0).toUpperCase() +
                        "Active".slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <BatchForm />
    </div>
  );
}
