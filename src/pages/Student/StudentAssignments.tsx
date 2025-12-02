import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { mockAssignments } from "@/lib/mock-data"
import { Calendar, FileText, CheckCircle2, Clock, LinkIcon } from "lucide-react"

export default function StudentAssignmentsPage() {
  const [submissionLink, setSubmissionLink] = useState("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "submitted":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "submitted":
        return <Badge className="bg-yellow-500">Submitted</Badge>
      default:
        return <Badge variant="destructive">Pending</Badge>
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Assignments</h1>
        <p className="text-muted-foreground">Manage and submit your course assignments</p>
      </div>

      <div className="space-y-4">
        {mockAssignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(assignment.status)}
                    <CardTitle>{assignment.title}</CardTitle>
                  </div>
                  <CardDescription>{assignment.courseName}</CardDescription>
                </div>
                {getStatusBadge(assignment.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{assignment.description}</p>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </div>
                {assignment.submissionLink && (
                  <div className="flex items-center gap-1 text-primary">
                    <LinkIcon className="h-4 w-4" />
                    <a href={assignment.submissionLink} target="_blank" rel="noopener noreferrer">
                      View Submission
                    </a>
                  </div>
                )}
              </div>

              {assignment.status === "pending" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Submit Assignment</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Submit Assignment</DialogTitle>
                      <DialogDescription>
                        {assignment.title} - {assignment.courseName}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="link">Google Drive Link</Label>
                        <Input
                          id="link"
                          placeholder="https://drive.google.com/file/..."
                          value={submissionLink}
                          onChange={(e) => setSubmissionLink(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          placeholder="Any additional information about your submission..."
                          rows={4}
                        />
                      </div>
                      <Button className="w-full">Submit</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
