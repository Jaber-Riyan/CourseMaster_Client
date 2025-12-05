import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { mockEnrollments } from "@/lib/mock-data";
import { Search } from "lucide-react";
import { useGetEnrollmentsQuery } from "@/redux/features/Enrollment/enrollment.api";
import Loading from "@/components/Loading";

export default function AdminEnrollmentsPage() {
  const { data, isLoading } = useGetEnrollmentsQuery(undefined);

  if (isLoading) return <Loading />;

  console.log(data.data);
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Enrollments</h1>
        <p className="text-muted-foreground">
          Track and manage student enrollments
        </p>
      </div>

      <Card>
        <CardHeader>
          <div>
            <div>
              <CardTitle>All Enrollments</CardTitle>
              <CardDescription>
                Total: {mockEnrollments.length} students enrolled
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Enrolled Date</TableHead>
                <TableHead className="text-right">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!isLoading &&
                data?.data &&
                data?.data?.map((enrollment) => (
                  <TableRow key={enrollment._id}>
                    <TableCell className="font-medium">
                      {enrollment?.studentId?.name}
                    </TableCell>
                    <TableCell>{enrollment?.studentId?.email}</TableCell>
                    <TableCell>{enrollment.courseId.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{enrollment.batch}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(enrollment.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-secondary rounded-full h-2 max-w-[100px]">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${enrollment.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {enrollment.progress}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
