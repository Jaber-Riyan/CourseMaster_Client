import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockAdminAssignments } from "@/lib/mock-data"
import { ExternalLink, CheckCircle, XCircle } from "lucide-react"

export default function AdminAssignmentsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Needs Revision</Badge>
      default:
        return <Badge className="bg-yellow-500">Pending Review</Badge>
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Assignment Review</h1>
        <p className="text-muted-foreground">Review and grade student submissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submitted Assignments</CardTitle>
          <CardDescription>Total: {mockAdminAssignments.length} submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAdminAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{assignment.studentName}</div>
                      <div className="text-sm text-muted-foreground">{assignment.studentEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{assignment.assignmentTitle}</TableCell>
                  <TableCell>{assignment.courseName}</TableCell>
                  <TableCell>{new Date(assignment.submittedDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Review Assignment</DialogTitle>
                          <DialogDescription>
                            {assignment.assignmentTitle} - {assignment.studentName}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Student Information</p>
                            <div className="text-sm text-muted-foreground">
                              <p>Name: {assignment.studentName}</p>
                              <p>Email: {assignment.studentEmail}</p>
                              <p>Course: {assignment.courseName}</p>
                              <p>Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Submission Link</p>
                            <a
                              href={assignment.submissionLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Open Submission
                            </a>
                          </div>
                          <div className="flex gap-2">
                            <Button className="flex-1 bg-green-500 hover:bg-green-600">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </Button>
                            <Button variant="destructive" className="flex-1">
                              <XCircle className="mr-2 h-4 w-4" />
                              Needs Revision
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
